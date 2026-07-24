/**
 * Search controller for legacy search fields (ui5-input, custom div).
 * Handles search fields that don't have collapsed/open properties.
 * Supports disableSearchCollapse for preventing auto-collapse.
 */
class ShellBarSearchLegacy {
    constructor({ getOverflowed, setSearchState, getSearchField, getSearchState, getCSSVariable, getDisableSearchCollapse, }) {
        this.initialRender = true;
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
    subscribe() {
        // No events to subscribe to for legacy search fields
    }
    /**
     * No-op for legacy search - no event listeners to clean up.
     */
    unsubscribe() {
        // No events to unsubscribe from
    }
    /**
     * Auto-collapse/restore search field based on available space.
     * Respects disableSearchCollapse flag, focus state, and field value.
     */
    autoManageSearchState(hiddenItems, availableSpace) {
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
     * No-op for legacy search - legacy fields don't have collapsed/open properties.
     */
    syncShowSearchFieldState() {
        // Legacy search fields don't have collapsed/open properties to sync
    }
    /**
     * Determines if full-screen search should be shown.
     * Full-screen search activates when overflow happens AND search is visible.
     */
    shouldShowFullScreen() {
        return this.getOverflowed() && this.getSearchState();
    }
    /**
     * Get value from various field types.
     * Supports ui5-input (value property) and custom div (nested input element).
     */
    hasValue(searchField) {
        if (!searchField) {
            return false;
        }
        // ui5-input or similar components with value property
        if ("value" in searchField) {
            return !!searchField.value;
        }
        // Custom div - find input inside
        const input = searchField.querySelector("input");
        return input ? !!input.value : false;
    }
    /**
     * Get minimum width needed for search field from CSS variable.
     */
    getSearchFieldWidth() {
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
    get hasSearchField() {
        return !!this.getSearchField();
    }
    /**
     * Get search button size for overflow calculation.
     * Returns 0 if search is expanded, otherwise returns button width.
     */
    getSearchButtonSize() {
        return this.getSearchState() ? 0 : this.getSearchField()?.getBoundingClientRect().width || 0;
    }
}
ShellBarSearchLegacy.CSS_VARIABLE = "--_ui5_shellbar_search_field_width";
ShellBarSearchLegacy.FALLBACK_WIDTH = 400;
export default ShellBarSearchLegacy;
//# sourceMappingURL=ShellBarSearchLegacy.js.map