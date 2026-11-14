import { isSpace, isEnter, } from "@ui5/webcomponents-base/dist/Keys.js";
import List from "@ui5/webcomponents/dist/List.js";
/**
 * Controller for legacy ShellBar features that will be removed in future versions.
 * Handles: logo slot, primaryTitle/secondaryTitle properties, menuItems slot.
 */
class ShellBarLegacy {
    constructor(deps) {
        // Bound handlers for event listeners
        this.handleLogoClickBound = this.handleLogoClick.bind(this);
        this.handleLogoKeyupBound = this.handleLogoKeyup.bind(this);
        this.handleLogoKeydownBound = this.handleLogoKeydown.bind(this);
        this.handleMenuItemClickBound = this.handleMenuItemClick.bind(this);
        this.handleMenuButtonClickBound = this.handleMenuButtonClick.bind(this);
        this.handleMenuPopoverBeforeOpenBound = this.handleMenuPopoverBeforeOpen.bind(this);
        this.handleMenuPopoverAfterCloseBound = this.handleMenuPopoverAfterClose.bind(this);
        this.component = deps.component;
        this.getShadowRoot = deps.getShadowRoot;
    }
    /* ------------- Menu Management -------------- */
    handleMenuButtonClick() {
        const shadowRoot = this.getShadowRoot();
        if (!shadowRoot) {
            return;
        }
        const menuButton = shadowRoot.querySelector(".ui5-shellbar-menu-button");
        const menuPopover = this.getMenuPopover();
        if (menuPopover && menuButton) {
            menuPopover.opener = menuButton;
            menuPopover.open = true;
        }
    }
    handleMenuItemClick(e) {
        const shouldContinue = this.component.fireDecoratorEvent("menu-item-click", {
            item: e.detail.item,
        });
        if (shouldContinue) {
            const menuPopover = this.getMenuPopover();
            if (menuPopover) {
                menuPopover.open = false;
            }
        }
    }
    handleMenuPopoverBeforeOpen() {
        this.component.menuPopoverOpen = true;
        const menuPopover = this.getMenuPopover();
        if (menuPopover?.content && menuPopover.content.length) {
            const list = menuPopover.content[0];
            if (list instanceof List) {
                list.focusFirstItem();
            }
        }
    }
    handleMenuPopoverAfterClose() {
        this.component.menuPopoverOpen = false;
    }
    getMenuPopover() {
        const shadowRoot = this.getShadowRoot();
        return shadowRoot?.querySelector(".ui5-shellbar-menu-popover");
    }
    get hasMenuItems() {
        return this.component.menuItems.length > 0;
    }
    get menuPopoverExpanded() {
        return this.component.menuPopoverOpen;
    }
    /* ------------- Logo Management -------------- */
    handleLogoClick() {
        const shadowRoot = this.getShadowRoot();
        if (!shadowRoot) {
            return;
        }
        const logoElement = shadowRoot.querySelector(".ui5-shellbar-logo");
        if (logoElement) {
            this.component.fireDecoratorEvent("logo-click", {
                targetRef: logoElement,
            });
        }
    }
    handleLogoKeydown(e) {
        if (isSpace(e)) {
            e.preventDefault();
            return;
        }
        if (isEnter(e)) {
            this.handleLogoClick();
        }
    }
    handleLogoKeyup(e) {
        if (isSpace(e)) {
            this.handleLogoClick();
        }
    }
    get hasLogo() {
        return this.component.logo.length > 0;
    }
    get logoRole() {
        return this.component.accessibilityAttributes.logo?.role || "link";
    }
    get logoAriaLabel() {
        return this.component.accessibilityAttributes.logo?.name || "Logo";
    }
    get brandingText() {
        return this.component.accessibilityAttributes.branding?.name || this.primaryTitle;
    }
    /* ------------- Title Management -------------- */
    get hasPrimaryTitle() {
        return !!this.component.primaryTitle;
    }
    get hasSecondaryTitle() {
        return !!this.component.secondaryTitle;
    }
    get showSecondaryTitle() {
        return this.hasSecondaryTitle && !this.component.isSBreakPoint;
    }
    get primaryTitle() {
        return this.component.primaryTitle || "";
    }
    get secondaryTitle() {
        return this.component.secondaryTitle || "";
    }
    /* ------------- Menu Button -------------- */
    get showMenuButton() {
        return this.hasPrimaryTitle || this.showLogoInMenuButton;
    }
    get showLogoInMenuButton() {
        return this.hasLogo && this.isSBreakPoint;
    }
    get showTitleInMenuButton() {
        return this.hasPrimaryTitle && !this.showLogoInMenuButton;
    }
    /* ------------- Common -------------- */
    get isSBreakPoint() {
        return this.component.isSBreakPoint;
    }
}
export default ShellBarLegacy;
//# sourceMappingURL=ShellBarLegacy.js.map