import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
/**
 * Search controller for self-collapsible search (ui5-shellbar-search).
 * Handles search fields with collapsed/open properties and ui5-open/close/search events.
 */
class ShellBarSearch {
    constructor({ getOverflowed, setSearchState, getSearchField, getSearchState, getCSSVariable, }) {
        this.onSearchBound = this.onSearch.bind(this);
        this.onSearchOpenBound = this.onSearchOpen.bind(this);
        this.onSearchCloseBound = this.onSearchClose.bind(this);
        this.initialRender = true;
        this.getOverflowed = getOverflowed;
        this.getCSSVariable = getCSSVariable;
        this.getSearchField = getSearchField;
        this.getSearchState = getSearchState;
        this.setSearchState = setSearchState;
    }
    subscribe(searchField = this.getSearchField()) {
        if (!searchField) {
            return;
        }
        searchField.addEventListener("ui5-open", this.onSearchOpenBound);
        searchField.addEventListener("ui5-close", this.onSearchCloseBound);
        searchField.addEventListener("ui5-search", this.onSearchBound);
    }
    unsubscribe(searchField = this.getSearchField()) {
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
    autoManageSearchState(hiddenItems, availableSpace) {
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
        }
        else if (availableSpace + this.getSearchButtonSize() > searchFieldWidth) {
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
            // On initial render, don't auto-open the search dialog on phones
            // to prevent the full-screen search from showing when page loads
            if (this.initialRender) {
                return;
            }
            search.open = this.getSearchState();
        }
        else {
            search.collapsed = !this.getSearchState();
        }
    }
    /**
     * Determines if full-screen search should be shown.
     * Full-screen search activates when overflow happens AND search is visible.
     */
    shouldShowFullScreen() {
        return this.getOverflowed() && this.getSearchState();
    }
    onSearchOpen(e) {
        if (e.target !== this.getSearchField()) {
            this.unsubscribe(e.target);
            return;
        }
        if (isPhone()) {
            this.setSearchState(true);
        }
    }
    onSearchClose(e) {
        if (e.target !== this.getSearchField()) {
            this.unsubscribe(e.target);
            return;
        }
        if (isPhone()) {
            this.setSearchState(false);
        }
    }
    onSearch(e) {
        if (e.target !== this.getSearchField()) {
            this.unsubscribe(e.target);
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
    getSearchFieldWidth() {
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
    getSearchButtonSize() {
        return this.getSearchState() ? 0 : this.getSearchField()?.getBoundingClientRect().width || 0;
    }
}
ShellBarSearch.CSS_VARIABLE = "--_ui5_shellbar_search_field_width";
ShellBarSearch.FALLBACK_WIDTH = 400;
export default ShellBarSearch;
//# sourceMappingURL=ShellBarSearch.js.map