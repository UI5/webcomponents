import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import type { IShellBarSearchField } from "../ShellBar.js";
import type { IShellBarSearchController } from "./IShellBarSearchController.js";

interface ShellBarSearchConstructorParams {
	getOverflowed: () => boolean;
	getSearchState: () => boolean;
	setSearchState: (expanded: boolean) => void;
	getSearchField: () => IShellBarSearchField | null;
	getCSSVariable: (variable: string) => string;
}

/**
 * Search controller for self-collapsible search (ui5-shellbar-search).
 * Handles search fields with collapsed/open properties and ui5-open/close/search events.
 */
class ShellBarSearch implements IShellBarSearchController {
	static CSS_VARIABLE = "--_ui5_shellbar_search_field_width";
	static FALLBACK_WIDTH = 400;

	private onSearchBound = this.onSearch.bind(this);
	private onSearchOpenBound = this.onSearchOpen.bind(this);
	private onSearchCloseBound = this.onSearchClose.bind(this);

	private getOverflowed: () => boolean;
	private getSearchField: () => IShellBarSearchField | null;
	private getSearchState: () => boolean;
	private setSearchState: (expanded: boolean) => void;
	private getCSSVariable: (variable: string) => string;
	private initialRender = true;

	constructor({
		getOverflowed,
		setSearchState,
		getSearchField,
		getSearchState,
		getCSSVariable,
	}: ShellBarSearchConstructorParams) {
		this.getOverflowed = getOverflowed;
		this.getCSSVariable = getCSSVariable;
		this.getSearchField = getSearchField;
		this.getSearchState = getSearchState;
		this.setSearchState = setSearchState;
	}

	subscribe(searchField: HTMLElement | null = this.getSearchField()) {
		if (!searchField) {
			return;
		}
		searchField.addEventListener("ui5-open", this.onSearchOpenBound);
		searchField.addEventListener("ui5-close", this.onSearchCloseBound);
		searchField.addEventListener("ui5-search", this.onSearchBound);
	}

	unsubscribe(searchField: HTMLElement | null = this.getSearchField()) {
		if (!searchField) {
			return;
		}
		searchField.removeEventListener("ui5-open", this.onSearchOpenBound);
		searchField.removeEventListener("ui5-close", this.onSearchCloseBound);
		searchField.removeEventListener("ui5-search", this.onSearchBound);
	}

	/**
	 * Auto-collapse/restore search field based on available space.
	 * Delegates decision logic to SearchController.
	 */
	autoManageSearchState(hiddenItems: number, availableSpace: number) {
		if (!this.hasSearchField) {
			return;
		}

		// Get search field min width from CSS variable
		const searchFieldWidth = this.getSearchFieldWidth();

		const searchHasFocus = document.activeElement === this.getSearchField();
		const searchHasValue = !!this.getSearchField()?.value;

		// On initial load, allow search to collapse even if it would trigger full-screen mode.
		// This prevents search from showing in full-screen when page loads on small screens.
		// After initial render, prevent collapse in full-screen mode during resize.
		const inFullScreen = !this.initialRender && this.shouldShowFullScreen();
		const preventCollapse = searchHasFocus || searchHasValue || inFullScreen;

		if (hiddenItems > 0 && !preventCollapse) {
			this.setSearchState(false);
		} else if (availableSpace + this.getSearchButtonSize() > searchFieldWidth) {
			this.setSearchState(true);
		}

		this.initialRender = false;
	}

	/**
	 * Applies the show-search-field state to the search field.
	 */
	syncShowSearchFieldState() {
		const search = this.getSearchField();
		if (!search) {
			return;
		}
		if (isPhone()) {
			search.open = this.getSearchState();
		} else {
			search.collapsed = !this.getSearchState();
		}
	}

	/**
	 * Determines if full-screen search should be shown.
	 * Full-screen search activates when overflow happens AND search is visible.
	 */
	shouldShowFullScreen(): boolean {
		return this.getOverflowed() && this.getSearchState();
	}

	private onSearchOpen(e: Event) {
		if (e.target !== this.getSearchField()) {
			this.unsubscribe(e.target as HTMLElement);
			return;
		}
		if (isPhone()) {
			this.setSearchState(true);
		}
	}

	private onSearchClose(e: Event) {
		if (e.target !== this.getSearchField()) {
			this.unsubscribe(e.target as HTMLElement);
			return;
		}
		if (isPhone()) {
			this.setSearchState(false);
		}
	}

	private onSearch(e: Event) {
		if (e.target !== this.getSearchField()) {
			this.unsubscribe(e.target as HTMLElement);
			return;
		}

		// On mobile or if has value, don't toggle
		if (isPhone() || (this.getSearchField()?.value && this.getSearchState())) {
			return;
		}

		this.setSearchState(!this.getSearchState());
	}

	/**
	 * Gets the minimum width needed for search field from CSS variable.
	 */
	private getSearchFieldWidth(): number {
		const width = this.getCSSVariable(ShellBarSearch.CSS_VARIABLE);
		if (!width) {
			return ShellBarSearch.FALLBACK_WIDTH;
		}
		// Convert rem to px
		if (width.endsWith("rem")) {
			const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
			return parseFloat(width) * fontSize;
		}
		return parseFloat(width);
	}

	get hasSearchField() {
		return !!this.getSearchField();
	}

	/**
	 * Gets the size of the search button.
	 * If the search field is visible, the size is 0.
	 * Otherwise, it is the width of the search field (just a button in collapsed state).
	 */
	private getSearchButtonSize(): number {
		return this.getSearchState() ? 0 : this.getSearchField()?.getBoundingClientRect().width || 0;
	}
}

export default ShellBarSearch;
export type {
	ShellBarSearchConstructorParams,
};
