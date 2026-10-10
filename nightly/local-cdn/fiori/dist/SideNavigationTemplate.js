import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import overflow from "@ui5/webcomponents-icons/dist/overflow.js";
import SideNavigationItem from "./SideNavigationItem.js";
import SideNavigationPopoverTemplate from "./SideNavigationPopoverTemplate.js";
export default function SideNavigationTemplate() {
    return (_jsxs(_Fragment, { children: [_jsxs("nav", { class: {
                    "ui5-sn-root": true,
                    "ui5-sn-collapsed": this.collapsed,
                }, role: this._rootRole, "aria-label": this.accessibleName, children: [header.call(this), this.collapsed ?
                        _jsxs("div", { role: "menubar", class: "ui5-sn-list ui5-sn-flexible", "aria-orientation": "vertical", "aria-roledescription": this.ariaRoleDescNavigationList, "aria-label": this.navigationMenuPrimaryHiddenText, children: [_jsx("slot", {}), _jsx(SideNavigationItem, { isOverflow: true, id: `${this._id}-sn-overflow-item`, text: this.overflowAccessibleName, onClick: this._handleOverflowClick, class: "ui5-sn-item-overflow", sideNavCollapsed: true, icon: overflow })] })
                        :
                            _jsx("ul", { role: "tree", class: "ui5-sn-list ui5-sn-flexible", "aria-roledescription": this.ariaRoleDescNavigationList, "aria-label": this.navigationMenuPrimaryHiddenText, children: _jsx("slot", {}) }), this.hasFixedItems && _jsxs(_Fragment, { children: [_jsx("div", { role: "separator", class: "ui5-sn-spacer" }), this.collapsed ?
                                _jsx("div", { role: "menubar", class: "ui5-sn-list ui5-sn-fixed", "aria-orientation": "vertical", "aria-roledescription": this.ariaRoleDescNavigationList, "aria-label": this.navigationMenuFooterHiddenText, children: _jsx("slot", { name: "fixedItems" }) })
                                :
                                    _jsx("ul", { role: "tree", class: "ui5-sn-list ui5-sn-fixed", "aria-roledescription": this.ariaRoleDescNavigationList, "aria-label": this.navigationMenuFooterHiddenText, children: _jsx("slot", { name: "fixedItems" }) })] })] }), SideNavigationPopoverTemplate.call(this)] }));
}
function header() {
    return this.showHeader ? (_jsx("slot", { name: "header" })) : undefined;
}
//# sourceMappingURL=SideNavigationTemplate.js.map