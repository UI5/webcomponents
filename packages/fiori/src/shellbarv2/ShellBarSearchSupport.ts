import { isPhone } from "@ui5/webcomponents-base";
import type { IShellBarSearchField } from "../ShellBarV2.js";

interface ShellBarV2SearchSupportConstructorParams {
	getOverflowed: () => boolean;
	getSearchState: () => boolean;
	setSearchState: (expanded: boolean) => void;
	getSearchField: () => IShellBarSearchField | null;
	getCSSVariable: (variable: string) => string;
}

class ShellBarV2SearchSupport {
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

	constructor({
		getOverflowed,
		setSearchState,
		getSearchField,
		getSearchState,
		getCSSVariable,
	}: ShellBarV2SearchSupportConstructorParams) {
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
		const preventCollapse = searchHasFocus || searchHasValue;

		if (hiddenItems > 0 && !preventCollapse) {
			this.setSearchState(false);
		} else if (availableSpace + this.getSearchButtonSize() > searchFieldWidth) {
			this.setSearchState(true);
		}
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
		const width = this.getCSSVariable(ShellBarV2SearchSupport.CSS_VARIABLE);
		if (!width) {
			return ShellBarV2SearchSupport.FALLBACK_WIDTH;
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
	getSearchButtonSize(): number {
		return this.getSearchState() ? 0 : this.getSearchField()?.getBoundingClientRect().width || 0;
	}

	/**
	 * Determines if full-screen search should be shown.
	 * Full-screen search activates when overflow happens AND search is visible.
	 */
	shouldShowFullScreen(): boolean {
		return this.getOverflowed() && this.getSearchState();
	}
}

export default ShellBarV2SearchSupport;
export type {
	ShellBarV2SearchSupportConstructorParams,
};
