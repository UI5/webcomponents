interface ShellBarContentSupportParams {
	content: readonly HTMLElement[];
	isSBreakPoint: boolean;
	hiddenItemIds: readonly string[];
}

interface ContentGroup {
	start: HTMLElement[];
	end: HTMLElement[];
}

interface SeparatorConfig {
	showStartSeparator: boolean;
	showEndSeparator: boolean;
}

interface PackedSeparatorInfo {
	shouldPack: boolean;
}

/**
 * Handles content area logic: splitting into start/end groups and separator visibility.
 * Pure logic - no side effects.
 */
class ShellBarContentSupport {
	/**
	 * Splits content into start and end groups based on spacer element.
	 * Items before spacer = start (left-aligned)
	 * Items after spacer = end (right-aligned)
	 * Without spacer, all items are start content.
	 *
	 * Spacer can be detected by:
	 * - Component: <ui5-shellbar-spacer slot="content">
	 * - Attribute: <div slot="content" ui5-shellbar-spacer>
	 */
	splitContent(content: readonly HTMLElement[]): ContentGroup {
		const spacerIndex = content.findIndex(
			child => child.hasAttribute("ui5-shellbar-spacer"),
		);

		if (spacerIndex === -1) {
			return { start: [...content], end: [] };
		}

		return {
			start: content.slice(0, spacerIndex),
			end: content.slice(spacerIndex + 1),
		};
	}

	/**
	 * Calculates whether separators should be shown.
	 * Separators appear between content groups when at least one item is visible.
	 * Hidden on S breakpoint (mobile).
	 */
	getSeparatorConfig(params: ShellBarContentSupportParams): SeparatorConfig {
		if (params.isSBreakPoint) {
			return { showStartSeparator: false, showEndSeparator: false };
		}

		const { start, end } = this.splitContent(params.content);

		return {
			showStartSeparator: start.some(item => !params.hiddenItemIds.includes((item as any)._individualSlot as string)),
			showEndSeparator: end.some(item => !params.hiddenItemIds.includes((item as any)._individualSlot as string)),
		};
	}

	/**
	 * Determines if a separator should be packed with this item.
	 * Separators are packed with the last visible item in a group.
	 * When that item hides, separator hides with it for proper measurement.
	 *
	 * Only applies on S breakpoint or when item is the last visible.
	 */
	shouldPackSeparator(
		item: HTMLElement,
		group: HTMLElement[],
		hiddenIds: readonly string[],
		isSBreakPoint: boolean,
	): PackedSeparatorInfo {
		if (isSBreakPoint) {
			return { shouldPack: false };
		}

		const isHidden = hiddenIds.includes((item as any)._individualSlot as string);
		const isLastItem = group.at(-1) === item;

		return { shouldPack: isHidden && isLastItem };
	}

	/**
	 * Returns accessibility role for content area.
	 * Only group if multiple items exist.
	 */
	getContentRole(content: readonly HTMLElement[]): "group" | undefined {
		const { start, end } = this.splitContent(content);
		const totalItems = start.length + end.length;
		return totalItems > 1 ? "group" : undefined;
	}
}

export default ShellBarContentSupport;
export type {
	ShellBarContentSupportParams,
	ContentGroup,
	SeparatorConfig,
	PackedSeparatorInfo,
};
