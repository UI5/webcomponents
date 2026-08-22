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
declare class ShellBarSearchLegacy implements IShellBarSearchController {
    static CSS_VARIABLE: string;
    static FALLBACK_WIDTH: number;
    private getOverflowed;
    private getSearchField;
    private getSearchState;
    private setSearchState;
    private getCSSVariable;
    private getDisableSearchCollapse;
    private initialRender;
    constructor({ getOverflowed, setSearchState, getSearchField, getSearchState, getCSSVariable, getDisableSearchCollapse, }: ShellBarSearchLegacyConstructorParams);
    /**
     * No-op for legacy search - legacy fields don't emit ui5-open/close/search events.
     */
    subscribe(): void;
    /**
     * No-op for legacy search - no event listeners to clean up.
     */
    unsubscribe(): void;
    /**
     * Auto-collapse/restore search field based on available space.
     * Respects disableSearchCollapse flag, focus state, and field value.
     */
    autoManageSearchState(hiddenItems: number, availableSpace: number): void;
    /**
     * No-op for legacy search - legacy fields don't have collapsed/open properties.
     */
    syncShowSearchFieldState(): void;
    /**
     * Determines if full-screen search should be shown.
     * Full-screen search activates when overflow happens AND search is visible.
     */
    shouldShowFullScreen(): boolean;
    /**
     * Get value from various field types.
     * Supports ui5-input (value property) and custom div (nested input element).
     */
    private hasValue;
    /**
     * Get minimum width needed for search field from CSS variable.
     */
    private getSearchFieldWidth;
    private get hasSearchField();
    /**
     * Get search button size for overflow calculation.
     * Returns 0 if search is expanded, otherwise returns button width.
     */
    private getSearchButtonSize;
}
export default ShellBarSearchLegacy;
export type { ShellBarSearchLegacyConstructorParams, };
