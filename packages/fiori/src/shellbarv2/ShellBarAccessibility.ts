import type { AccessibilityAttributes } from "@ui5/webcomponents-base";

/**
 * Accessibility attributes for profile area
 */
type ShellBarV2ProfileAccessibilityAttributes = Pick<AccessibilityAttributes, "name" | "expanded" | "hasPopup">;

/**
 * Accessibility attributes for action areas (notifications, product, search, overflow)
 */
type ShellBarV2AreaAccessibilityAttributes = Pick<AccessibilityAttributes, "hasPopup" | "expanded">;

/**
 * Top-level accessibility configuration for ShellBarV2
 */
type ShellBarV2AccessibilityAttributes = {
	notifications?: ShellBarV2AreaAccessibilityAttributes;
	profile?: ShellBarV2ProfileAccessibilityAttributes;
	product?: ShellBarV2AreaAccessibilityAttributes;
	search?: ShellBarV2AreaAccessibilityAttributes;
	overflow?: ShellBarV2AreaAccessibilityAttributes;
};

/**
 * Accessibility info for a single area
 */
interface ShellBarV2AreaAccessibilityInfo {
	title: string;
	accessibilityAttributes: {
		hasPopup?: AccessibilityAttributes["hasPopup"];
		expanded?: AccessibilityAttributes["expanded"];
	};
}

/**
 * Complete accessibility info object returned by the support controller
 */
interface ShellBarV2AccessibilityInfo {
	notifications: ShellBarV2AreaAccessibilityInfo;
	profile: ShellBarV2AreaAccessibilityInfo;
	products: ShellBarV2AreaAccessibilityInfo;
	search: ShellBarV2AreaAccessibilityInfo;
	overflow: ShellBarV2AreaAccessibilityInfo;
}

/**
 * Parameters for computing accessibility info
 */
interface ShellBarV2AccessibilityParams {
	accessibilityAttributes: ShellBarV2AccessibilityAttributes;
	overflowPopoverOpen: boolean;
	notificationsText: string;
	profileText: string;
	productsText: string;
	searchText: string;
	overflowText: string;
}

/**
 * Controller for ShellBarV2 accessibility features.
 * Manages accessibility attributes and generates aria properties for template.
 */
class ShellBarV2Accessibility {
	/**
	 * Computes accessibility info for all interactive areas.
	 * Merges user-provided attributes with defaults and dynamic state.
	 */
	getAccessibilityInfo(params: ShellBarV2AccessibilityParams): ShellBarV2AccessibilityInfo {
		const {
			searchText,
			profileText,
			overflowText,
			productsText,
			notificationsText,
			overflowPopoverOpen,
			accessibilityAttributes,
		} = params;

		const overflowExpanded = accessibilityAttributes.overflow?.expanded;

		return {
			notifications: {
				title: notificationsText,
				accessibilityAttributes: {
					expanded: accessibilityAttributes.notifications?.expanded,
					hasPopup: accessibilityAttributes.notifications?.hasPopup,
				},
			},
			profile: {
				title: profileText,
				accessibilityAttributes: {
					hasPopup: accessibilityAttributes.profile?.hasPopup,
					expanded: accessibilityAttributes.profile?.expanded,
					...(accessibilityAttributes.profile?.name ? { name: accessibilityAttributes.profile.name } : {}),
				},
			},
			products: {
				title: productsText,
				accessibilityAttributes: {
					hasPopup: accessibilityAttributes.product?.hasPopup,
					expanded: accessibilityAttributes.product?.expanded,
				},
			},
			search: {
				title: searchText,
				accessibilityAttributes: {
					hasPopup: accessibilityAttributes.search?.hasPopup,
				},
			},
			overflow: {
				title: overflowText,
				accessibilityAttributes: {
					hasPopup: accessibilityAttributes.overflow?.hasPopup || "menu",
					expanded: overflowExpanded === undefined ? overflowPopoverOpen : overflowExpanded,
				},
			},
		};
	}

	/**
	 * Gets role for actions toolbar area.
	 * Returns "toolbar" when multiple visible items exist.
	 */
	getActionsRole(visibleItemsCount: number): "toolbar" | undefined {
		if (visibleItemsCount <= 1) {
			return undefined;
		}
		return "toolbar";
	}
}

export default ShellBarV2Accessibility;

export type {
	ShellBarV2AccessibilityInfo,
	ShellBarV2AccessibilityParams,
	ShellBarV2AreaAccessibilityInfo,
	ShellBarV2AccessibilityAttributes,
	ShellBarV2AreaAccessibilityAttributes,
	ShellBarV2ProfileAccessibilityAttributes,
};
