import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import BusyIndicator from "./BusyIndicator.js";
import Button from "./Button.js";
export default function MenuTemplate() {
    return (_jsxs(ResponsivePopover, { id: `${this._id}-menu-rp`, class: "ui5-menu-rp", placement: this.placement, verticalAlign: "Bottom", horizontalAlign: this.horizontalAlign, opener: this.opener, open: this.open, preventInitialFocus: true, hideArrow: true, allowTargetOverlap: true, accessibleName: this.accessibleNameText, onBeforeOpen: this._beforePopoverOpen, onOpen: this._afterPopoverOpen, onBeforeClose: this._beforePopoverClose, onClose: this._afterPopoverClose, children: [this.isPhone &&
                _jsx("div", { slot: "header", class: "ui5-menu-dialog-header", children: _jsx("div", { class: "ui5-menu-dialog-title", children: _jsx("h1", { children: this.headerText }) }) }), _jsx("div", { id: `${this._id}-menu-main`, class: this.loading ? "ui5-menu-busy-indicator-main" : "", children: this.items.length ?
                    (_jsx(List, { id: `${this._id}- menu-list`, selectionMode: "None", loading: this.loading, loadingDelay: this.loadingDelay, separators: "None", accessibleRole: "Menu", onItemClick: this._itemClick, onMouseOver: this._itemMouseOver, onKeyDown: this._itemKeyDown, "onui5-close-menu": this._close, "onui5-exit-end-content": this._navigateOutOfEndContent, children: _jsx("slot", {}) }))
                    : this.loading && (_jsx(BusyIndicator, { id: `${this._id}-menu-busy-indicator`, delay: this.loadingDelay, class: "ui5-menu-busy-indicator", active: true })) }), this.isPhone &&
                _jsx("div", { slot: "footer", class: "ui5-menu-dialog-footer", children: _jsx(Button, { design: "Transparent", onClick: this._close, children: this.labelCancel }) })] }));
}
//# sourceMappingURL=MenuTemplate.js.map