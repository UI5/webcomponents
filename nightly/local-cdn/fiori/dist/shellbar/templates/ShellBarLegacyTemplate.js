import { Fragment as _Fragment, jsxs as _jsxs, jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import List from "@ui5/webcomponents/dist/List.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import slimArrowDown from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
function ShellBarLegacyBrandingArea() {
    const legacy = this.legacyAdaptor;
    if (!legacy) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [legacy.hasMenuItems && ShellBarInteractiveMenuButton.call(this), legacy.hasMenuItems && ShellBarLegacySecondaryTitle.call(this), !legacy.hasMenuItems && ShellBarLegacyTitleArea.call(this), ShellBarMenuPopover.call(this)] }));
}
function ShellBarLegacyTitleArea() {
    const legacy = this.legacyAdaptor;
    if (!legacy) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [!!(legacy.isSBreakPoint && legacy.hasLogo) && ShellBarSingleLogo.call(this), !legacy.isSBreakPoint && (legacy.hasLogo || legacy.primaryTitle) && (_jsxs(_Fragment, { children: [ShellBarCombinedLogo.call(this), legacy.hasSecondaryTitle && legacy.hasPrimaryTitle && ShellBarLegacySecondaryTitle.call(this)] }))] }));
}
/**
 * Renders interactive menu button for non-S breakpoints.
 * Shows primaryTitle with arrow, opens menu popover.
 */
function ShellBarInteractiveMenuButton() {
    const legacy = this.legacyAdaptor;
    if (!legacy) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [!legacy.showLogoInMenuButton && legacy.hasLogo && ShellBarSingleLogo.call(this), legacy.showTitleInMenuButton && _jsx("h1", { class: "ui5-hidden-text", children: legacy.primaryTitle }), legacy.showMenuButton && (_jsxs("button", { class: {
                    "ui5-shellbar-menu-button": true,
                    "ui5-shellbar-menu-button--interactive": legacy.hasMenuItems,
                }, onClick: legacy.handleMenuButtonClickBound, "aria-haspopup": "menu", "aria-expanded": legacy.menuPopoverExpanded, "aria-label": legacy.brandingText, "data-ui5-stable": "menu", tabIndex: 0, children: [legacy.showLogoInMenuButton && (_jsx("span", { class: "ui5-shellbar-logo", "aria-label": legacy.logoAriaLabel, title: legacy.logoAriaLabel, children: _jsx("slot", { name: "logo" }) })), legacy.showTitleInMenuButton && (_jsx("div", { class: "ui5-shellbar-menu-button-title", children: legacy.primaryTitle })), _jsx(Icon, { class: "ui5-shellbar-menu-button-arrow", name: slimArrowDown })] }))] }));
}
/**
 * Renders single logo on S breakpoint when no menu items.
 * Used on S breakpoint when no menu items and no branding slot.
 */
function ShellBarSingleLogo() {
    const legacy = this.legacyAdaptor;
    if (!legacy) {
        return null;
    }
    return (_jsx("span", { role: legacy.logoRole, class: "ui5-shellbar-logo ui5-shellbar-gap-end", "aria-label": legacy.logoAriaLabel, title: legacy.logoAriaLabel, onClick: legacy.handleLogoClickBound, onKeyDown: legacy.handleLogoKeydownBound, onKeyUp: legacy.handleLogoKeyupBound, tabIndex: 0, "data-ui5-stable": "logo", children: _jsx("slot", { name: "logo" }) }));
}
function ShellBarCombinedLogo() {
    const legacy = this.legacyAdaptor;
    if (!legacy) {
        return null;
    }
    return (_jsxs("div", { role: legacy.logoRole, class: "ui5-shellbar-logo-area", onClick: legacy.handleLogoClickBound, tabIndex: 0, onKeyDown: legacy.handleLogoKeydownBound, onKeyUp: legacy.handleLogoKeyupBound, "aria-label": legacy.logoAriaLabel, children: [legacy.hasLogo && (_jsx("span", { class: "ui5-shellbar-logo", title: legacy.logoAriaLabel, "data-ui5-stable": "logo", children: _jsx("slot", { name: "logo" }) })), _jsx("div", { class: "ui5-shellbar-headings", children: legacy.primaryTitle && (_jsx("h1", { class: "ui5-shellbar-title", children: _jsx("bdi", { children: legacy.primaryTitle }) })) })] }));
}
function ShellBarLegacySecondaryTitle() {
    const legacy = this.legacyAdaptor;
    if (!legacy || !legacy.showSecondaryTitle) {
        return null;
    }
    return (_jsx("div", { class: "ui5-shellbar-secondary-title ui5-shellbar-gap-start ui5-shellbar-gap-end", "data-ui5-stable": "secondary-title", children: this.secondaryTitle }));
}
/**
 * Renders the menu popover.
 * Contains the list of menu items.
 */
function ShellBarMenuPopover() {
    const legacy = this.legacyAdaptor;
    if (!legacy || !legacy.hasMenuItems) {
        return null;
    }
    return (_jsx(Popover, { class: "ui5-shellbar-menu-popover", hideArrow: true, placement: "Bottom", preventInitialFocus: true, onBeforeOpen: legacy.handleMenuPopoverBeforeOpenBound, onClose: legacy.handleMenuPopoverAfterCloseBound, children: _jsx(List, { separators: "None", selectionMode: "Single", onItemClick: legacy.handleMenuItemClickBound, children: _jsx("slot", { name: "menuItems" }) }) }));
}
export { ShellBarSingleLogo, ShellBarMenuPopover, ShellBarLegacyTitleArea, ShellBarLegacyBrandingArea, ShellBarLegacySecondaryTitle, ShellBarInteractiveMenuButton, };
//# sourceMappingURL=ShellBarLegacyTemplate.js.map