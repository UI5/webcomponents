import { Fragment as _Fragment, jsxs as _jsxs, jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import PopoverPlacement from "./types/PopoverPlacement.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Button from "./Button.js";
import List from "./List.js";
import BusyIndicator from "./BusyIndicator.js";
import navBackIcon from "@ui5/webcomponents-icons/dist/nav-back.js";
import checkIcon from "@ui5/webcomponents-icons/dist/accept.js";
import slimArrowRight from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import Icon from "./Icon.js";
import ListItemTemplate from "./ListItemTemplate.js";
const predefinedHooks = {
    listItemContent,
    iconBegin,
};
export default function MenuItemTemplate(hooks) {
    const currentHooks = { ...predefinedHooks, ...hooks };
    return _jsxs(_Fragment, { children: [ListItemTemplate.call(this, currentHooks), listItemPostContent.call(this)] });
}
function listItemContent() {
    return (_jsxs(_Fragment, { children: [this.text && _jsx("div", { class: "ui5-menu-item-text", children: this.text }), rightContent.call(this), checkmarkContent.call(this)] }));
}
function checkmarkContent() {
    return !this._markChecked ? "" : (_jsx("div", { class: "ui5-menu-item-checked", children: _jsx(Icon, { name: checkIcon, class: "ui5-menu-item-icon-checked" }) }));
}
function rightContent() {
    switch (true) {
        case this.hasSubmenu:
            return (_jsx("div", { class: "ui5-menu-item-submenu-icon", children: _jsx(Icon, { part: "subicon", name: slimArrowRight, class: "ui5-menu-item-icon-end" }) }));
        case this.hasEndContent:
            return _jsx("slot", { name: "endContent", onKeyDown: this._endContentKeyDown });
        case !!this.additionalText:
            return (_jsx("span", { part: "additional-text", class: "ui5-li-additional-text", "aria-hidden": this._accInfo.ariaHidden, children: this.additionalText }));
    }
}
function iconBegin() {
    if (this.hasIcon) {
        return _jsx(Icon, { class: "ui5-li-icon", name: this.icon });
    }
    if (this._siblingsWithIcon) {
        return _jsx("div", { class: "ui5-menu-item-dummy-icon" });
    }
}
function listItemPostContent() {
    return this.hasSubmenu && _jsxs(ResponsivePopover, { id: `${this._id}-menu-rp`, class: "ui5-menu-rp ui5-menu-rp-sub-menu", preventInitialFocus: true, preventFocusRestore: true, hideArrow: true, allowTargetOverlap: true, placement: PopoverPlacement.End, verticalAlign: "Top", accessibleName: this.accessibleNameText, onBeforeOpen: this._beforePopoverOpen, onOpen: this._afterPopoverOpen, onBeforeClose: this._beforePopoverClose, onClose: this._afterPopoverClose, children: [this.isPhone && (_jsx(_Fragment, { children: _jsxs("div", { slot: "header", class: "ui5-menu-dialog-header", children: [_jsx(Button, { icon: navBackIcon, class: "ui5-menu-back-button", design: "Transparent", "aria-label": this.labelBack, onClick: this._close }), _jsx("div", { class: "ui5-menu-dialog-title", children: _jsx("div", { children: this.text }) })] }) })), _jsx("div", { id: `${this._id}-menu-main`, class: this.loading ? "menu-busy-indicator-main" : "", children: this.items.length ? (_jsx(List, { id: `${this._id}-menu-list`, selectionMode: "None", separators: "None", accessibleRole: "Menu", loading: this.loading, loadingDelay: this.loadingDelay, onMouseOver: this._itemMouseOver, onKeyDown: this._itemKeyDown, onKeyUp: this._itemKeyUp, "onui5-close-menu": this._close, "onui5-exit-end-content": this._navigateOutOfEndContent, children: _jsx("slot", {}) })) : this.loading && _jsx(BusyIndicator, { id: `${this._id}-menu-busy-indicator`, delay: this.loadingDelay, class: "ui5-menu-busy-indicator", active: true }) }), this.isPhone && (_jsx("div", { slot: "footer", class: "ui5-menu-dialog-footer", children: _jsx(Button, { design: "Transparent", onClick: this._closeAll, children: this.labelCancel }) }))] });
}
//# sourceMappingURL=MenuItemTemplate.js.map