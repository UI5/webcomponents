import type { ListItemClickEventDetail } from "@ui5/webcomponents/dist/List.js";
import type ShellBar from "../ShellBar.js";
type ShellBarLegacyDeps = {
    component: ShellBar;
    getShadowRoot: () => ShadowRoot | null;
};
/**
 * Controller for legacy ShellBar features that will be removed in future versions.
 * Handles: logo slot, primaryTitle/secondaryTitle properties, menuItems slot.
 */
declare class ShellBarLegacy {
    private component;
    private getShadowRoot;
    handleLogoClickBound: () => void;
    handleLogoKeyupBound: (e: KeyboardEvent) => void;
    handleLogoKeydownBound: (e: KeyboardEvent) => void;
    handleMenuItemClickBound: (e: CustomEvent<ListItemClickEventDetail>) => void;
    handleMenuButtonClickBound: () => void;
    handleMenuPopoverBeforeOpenBound: () => void;
    handleMenuPopoverAfterCloseBound: () => void;
    constructor(deps: ShellBarLegacyDeps);
    handleMenuButtonClick(): void;
    handleMenuItemClick(e: CustomEvent<ListItemClickEventDetail>): void;
    handleMenuPopoverBeforeOpen(): void;
    handleMenuPopoverAfterClose(): void;
    private getMenuPopover;
    get hasMenuItems(): boolean;
    get menuPopoverExpanded(): boolean;
    handleLogoClick(): void;
    handleLogoKeydown(e: KeyboardEvent): void;
    handleLogoKeyup(e: KeyboardEvent): void;
    get hasLogo(): boolean;
    get logoRole(): "button" | "link";
    get logoAriaLabel(): string;
    get brandingText(): string;
    get hasPrimaryTitle(): boolean;
    get hasSecondaryTitle(): boolean;
    get showSecondaryTitle(): boolean;
    get primaryTitle(): string;
    get secondaryTitle(): string;
    get showMenuButton(): boolean;
    get showLogoInMenuButton(): boolean;
    get showTitleInMenuButton(): boolean;
    get isSBreakPoint(): boolean;
}
export default ShellBarLegacy;
