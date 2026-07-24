interface ShellBarItemNavigationConstructorParams {
    getDomRef: () => HTMLElement | null;
}
declare class ShellBarItemNavigation {
    private params;
    constructor(params: ShellBarItemNavigationConstructorParams);
    handleKeyDown(e: KeyboardEvent): void;
    private shouldHandle;
    private shouldChildHandleNavigation;
    private shouldInputHandleNavigation;
    private getTabbableItems;
    private isVisible;
    private navigateToItem;
    private focusPrevious;
    private focusNext;
}
export default ShellBarItemNavigation;
export type { ShellBarItemNavigationConstructorParams, };
