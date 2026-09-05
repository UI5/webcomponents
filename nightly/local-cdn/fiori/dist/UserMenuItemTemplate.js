import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import MenuItemTemplate from "@ui5/webcomponents/dist/MenuItemTemplate.js";
import ListItemTemplate from "@ui5/webcomponents/dist/ListItemTemplate.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import List from "@ui5/webcomponents/dist/List.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import PopoverPlacement from "@ui5/webcomponents/dist/types/PopoverPlacement.js";
import navBackIcon from "@ui5/webcomponents-icons/dist/nav-back.js";
import declineIcon from "@ui5/webcomponents-icons/dist/decline.js";
import checkIcon from "@ui5/webcomponents-icons/dist/accept.js";
import slimArrowRight from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
export default function UserMenuItemTemplate() {
    if (this.isPhone) {
        return phoneTemplate.call(this);
    }
    const hooks = {};
    if (this.showSelection) {
        hooks.menuItemTextContent = userMenuItemTextContent;
    }
    return [MenuItemTemplate.call(this, hooks)];
}
function phoneTemplate() {
    const hooks = {
        iconBegin() {
            if (this.hasIcon) {
                return _jsx(Icon, { class: "ui5-li-icon", name: this.icon });
            }
            if (this._siblingsWithIcon) {
                return _jsx("div", { class: "ui5-menu-item-dummy-icon" });
            }
        },
        listItemContent() {
            return (_jsxs(_Fragment, { children: [this.showSelection ? (_jsxs("div", { class: "ui5-user-menu-item-text-wrapper", children: [this.text && _jsx("div", { class: "ui5-menu-item-text", children: this.text }), this._selectedSubItemText &&
                                _jsx("div", { class: "ui5-user-menu-item-selection-text", children: this._selectedSubItemText })] })) : (_jsx(_Fragment, { children: this.text && _jsx("div", { class: "ui5-menu-item-text", children: this.text }) })), rightContent.call(this), checkmarkContent.call(this)] }));
        },
    };
    return [
        ListItemTemplate.call(this, hooks),
        phoneSubmenuPopover.call(this),
    ];
}
function checkmarkContent() {
    return !this._markChecked ? "" : (_jsx("div", { class: "ui5-menu-item-checked", children: _jsx(Icon, { name: checkIcon, class: "ui5-menu-item-icon-checked" }) }));
}
function rightContent() {
    switch (true) {
        case this.hasSubmenu:
            return (_jsx("div", { class: "ui5-menu-item-submenu-icon", children: _jsx(Icon, { part: "subicon", name: slimArrowRight, class: "ui5-menu-item-icon-end" }) }));
        case this.hasEndContent:
            return (_jsx("div", { class: "ui5-menu-item-end-content", role: "group", "aria-label": this.endContentAccessibleName, children: _jsx("slot", { name: "endContent", onKeyDown: this._endContentKeyDown }) }));
        case !!this.additionalText:
            return (_jsx("span", { part: "additional-text", class: "ui5-li-additional-text", "aria-hidden": this._accInfo.ariaHidden, children: this.additionalText }));
    }
}
function phoneSubmenuPopover() {
    return this.hasSubmenu && _jsxs(ResponsivePopover, { id: `${this._id}-menu-rp`, class: "ui5-menu-rp ui5-menu-rp-sub-menu", preventInitialFocus: true, preventFocusRestore: true, hideArrow: true, allowTargetOverlap: true, placement: PopoverPlacement.End, verticalAlign: "Top", accessibleName: this.accessibleNameText, onBeforeOpen: this._beforePopoverOpen, onOpen: this._afterPopoverOpen, onBeforeClose: this._beforePopoverClose, onClose: this._afterPopoverClose, children: [_jsxs("div", { slot: "header", class: "ui5-menu-dialog-header", children: [_jsx(Button, { icon: navBackIcon, class: "ui5-menu-back-button", design: "Transparent", "aria-label": this.labelBack, onClick: this._close }), _jsx("div", { class: "ui5-menu-dialog-title", children: _jsx("div", { children: this.text }) }), _jsx(Button, { icon: declineIcon, class: "ui5-menu-close-button", design: "Transparent", "aria-label": this.labelCancel, onClick: this._closeAll })] }), _jsx("div", { id: `${this._id}-menu-main`, class: this.loading ? "menu-busy-indicator-main" : "", "aria-busy": this.loading, children: this.items.length ? (_jsx(List, { id: `${this._id}-menu-list`, selectionMode: "None", separators: "None", accessibleRole: "Menu", loading: this.loading, loadingDelay: this.loadingDelay, onMouseOver: this._itemMouseOver, onKeyDown: this._itemKeyDown, onKeyUp: this._itemKeyUp, "onui5-close-menu": this._close, "onui5-exit-end-content": this._navigateOutOfEndContent, children: _jsx("slot", {}) })) : this.loading && _jsx(BusyIndicator, { id: `${this._id}-menu-busy-indicator`, delay: this.loadingDelay, class: "ui5-menu-busy-indicator", active: true }) })] });
}
function userMenuItemTextContent() {
    return (_jsxs("div", { class: "ui5-user-menu-item-text-wrapper", children: [this.text && _jsx("div", { class: "ui5-menu-item-text", children: this.text }), this._selectedSubItemText &&
                _jsx("div", { class: "ui5-user-menu-item-selection-text", children: this._selectedSubItemText })] }));
}
//# sourceMappingURL=UserMenuItemTemplate.js.map