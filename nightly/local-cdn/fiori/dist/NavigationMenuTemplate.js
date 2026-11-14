import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import List from "@ui5/webcomponents/dist/List.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
export default function NavigationMenuTemplate() {
    return (_jsxs(ResponsivePopover, { id: `${this._id}-navigation-menu-rp`, class: "ui5-menu-rp ui5-navigation-menu", verticalAlign: "Center", opener: this.opener, open: this.open, preventInitialFocus: true, accessibleNameRef: `${this._id}-navigationMenuPopoverText`, onBeforeOpen: this._beforePopoverOpen, onOpen: this._afterPopoverOpen, onBeforeClose: this._beforePopoverClose, onClose: this._afterPopoverClose, hideArrow: true, children: [_jsx("span", { id: `${this._id}-navigationMenuPopoverText`, class: "ui5-hidden-text", children: this.accSideNavigationPopoverHiddenText }), _jsx("div", { id: `${this._id}-menu-main`, class: "ui5-navigation-menu-main", children: this.items.length > 0 ?
                    _jsx(List, { id: `${this._id}-menu-list`, accessibleRole: "Menu", selectionMode: "None", loading: this.loading, loadingDelay: this.loadingDelay, separators: "None", onItemClick: this._itemClick, onKeyDown: this._itemKeyDown, "onui5-close-menu": this._close, children: _jsx("slot", {}) })
                    :
                        this.loading &&
                            _jsx(BusyIndicator, { id: `${this._id}-menu-busy-indicator`, active: true, delay: this.loadingDelay, class: "ui5-menu-busy-indicator" }) })] }));
}
//# sourceMappingURL=NavigationMenuTemplate.js.map