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
declare class ShellBarSearch implements IShellBarSearchController {
    static CSS_VARIABLE: string;
    static FALLBACK_WIDTH: number;
    private onSearchBound;
    private onSearchOpenBound;
    private onSearchCloseBound;
    private getOverflowed;
    private getSearchField;
    private getSearchState;
    private setSearchState;
    private getCSSVariable;
    private initialRender;
    constructor({ getOverflowed, setSearchState, getSearchField, getSearchState, getCSSVariable, }: ShellBarSearchConstructorParams);
    subscribe(searchField?: HTMLElement | null): void;
    unsubscribe(searchField?: HTMLElement | null): void;
    /**
     * Auto-collapse/restore search field based on available space.
     * Delegates decision logic to SearchController.
     */
    autoManageSearchState(hiddenItems: number, availableSpace: number): void;
    /**
     * Applies the show-search-field state to the search field.
     */
    syncShowSearchFieldState(): void;
    /**
     * Determines if full-screen search should be shown.
     * Full-screen search activates when overflow happens AND search is visible.
     */
    shouldShowFullScreen(): boolean;
    private onSearchOpen;
    private onSearchClose;
    private onSearch;
    /**
     * Gets the minimum width needed for search field from CSS variable.
     */
    private getSearchFieldWidth;
    get hasSearchField(): boolean;
    /**
     * Gets the size of the search button.
     * If the search field is visible, the size is 0.
     * Otherwise, it is the width of the search field (just a button in collapsed state).
     */
    private getSearchButtonSize;
}
export default ShellBarSearch;
export type { ShellBarSearchConstructorParams, };
