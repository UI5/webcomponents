import type { IShellBarSearchController } from "./IShellBarSearchController.js";

interface ShellBarSearchLegacyConstructorParams {
	getOverflowed: () => boolean;
	getSearchState: () => boolean;
	setSearchState: (expanded: boolean) => void;
	getSearchField: () => HTMLElement | null;
	getCSSVariable: (variable: string) => string;
	getDisableSearchCollapse: () => boolean;
}

/**
 * Search controller for legacy search fields (ui5-input, custom div).
 * Handles search fields that don't have collapsed/open properties.
 * Supports disableSearchCollapse for preventing auto-collapse.
 */
class ShellBarSearchLegacy implements IShellBarSearchController {
	static CSS_VARIABLE = "--_ui5_shellbar_search_field_width";
	static FALLBACK_WIDTH = 400;

	private getOverflowed: () => boolean;
	private getSearchField: () => HTMLElement | null;
	private getSearchState: () => boolean;
	private setSearchState: (expanded: boolean) => void;
	private getCSSVariable: (variable: string) => string;
	private getDisableSearchCollapse: () => boolean;
	private initialRender = true;

	constructor({
		getOverflowed,
		setSearchState,
		getSearchField,
		getSearchState,
		getCSSVariable,
		getDisableSearchCollapse,
	}: ShellBarSearchLegacyConstructorParams) {
		this.getOverflowed = getOverflowed;
		this.getCSSVariable = getCSSVariable;
		this.getSearchField = getSearchField;
		this.getSearchState = getSearchState;
		this.setSearchState = setSearchState;
		this.getDisableSearchCollapse = getDisableSearchCollapse;
	}

	/**
	 * No-op for legacy search - legacy fields don't emit ui5-open/close/search events.
	 */
	subscribe(): void {
		// No events to subscribe to for legacy search fields
	}

	/**
	 * No-op for legacy search - no event listeners to clean up.
	 */
	unsubscribe(): void {
		// No events to unsubscribe from
	}

	/**
	 * Auto-collapse/restore search field based on available space.
	 * Respects disableSearchCollapse flag, focus state, and field value.
	 */
	autoManageSearchState(hiddenItems: number, availableSpace: number): void {
		if (!this.hasSearchField) {
			return;
		}

		// Check if auto-collapse is disabled
		if (this.getDisableSearchCollapse()) {
			return;
		}

		const searchFieldWidth = this.getSearchFieldWidth();

		// Check focus and value to prevent collapse
		const searchField = this.getSearchField();
		const searchHasFocus = searchField?.contains(document.activeElement) || false;
		const searchHasValue = this.hasValue(searchField);

		// Prevent collapse if search is visible and items are overflowing (full-screen mode).
		// Use hiddenItems count rather than live DOM overflow check, since updateOverflow()
		// has already resolved the overflow by hiding items before this is called.
		// On the very first autoManageSearchState call (initialRender=true), allow collapse
		// so search doesn't show in full-screen when the page first loads on a small screen.
		const inFullScreen = !this.initialRender && hiddenItems > 0 && this.getSearchState();
		const preventCollapse = searchHasFocus || searchHasValue || inFullScreen;

		if (hiddenItems > 0 && !preventCollapse) {
			this.setSearchState(false);
		} else if (availableSpace + this.getSearchButtonSize() > searchFieldWidth) {
			this.setSearchState(true);
		}

		this.initialRender = false;
	}

	/**
	 * No-op for legacy search - legacy fields don't have collapsed/open properties.
	 */
	syncShowSearchFieldState(): void {
		// Legacy search fields don't have collapsed/open properties to sync
	}

	/**
	 * Determines if full-screen search should be shown.
	 * Full-screen search activates when overflow happens AND search is visible.
	 */
	shouldShowFullScreen(): boolean {
		return this.getOverflowed() && this.getSearchState();
	}

	notifyInitialRender(hiddenItems: number) {
		if (hiddenItems === 0) {
			this.initialRender = false;
		}
	}

	/**
	 * Get value from various field types.
	 * Supports ui5-input (value property) and custom div (nested input element).
	 */
	private hasValue(searchField: HTMLElement | null): boolean {
		if (!searchField) {
			return false;
		}

		// ui5-input or similar components with value property
		if ("value" in searchField) {
			return !!(searchField as any).value;
		}

		// Custom div - find input inside
		const input = searchField.querySelector("input");
		return input ? !!input.value : false;
	}

	/**
	 * Get minimum width needed for search field from CSS variable.
	 */
	private getSearchFieldWidth(): number {
		const width = this.getCSSVariable(ShellBarSearchLegacy.CSS_VARIABLE);
		if (!width) {
			return ShellBarSearchLegacy.FALLBACK_WIDTH;
		}

		// Convert rem to px
		if (width.endsWith("rem")) {
			const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
			return parseFloat(width) * fontSize;
		}

		return parseFloat(width);
	}

	private get hasSearchField(): boolean {
		return !!this.getSearchField();
	}

	/**
	 * Get search button size for overflow calculation.
	 * Returns 0 if search is expanded, otherwise returns button width.
	 */
	private getSearchButtonSize(): number {
		return this.getSearchState() ? 0 : this.getSearchField()?.getBoundingClientRect().width || 0;
	}
}

export default ShellBarSearchLegacy;
export type {
	ShellBarSearchLegacyConstructorParams,
};
