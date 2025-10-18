import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import navRightArrow from "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import navDownArrow from "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
export default function SideNavigationGroupTemplate() {
    if (this.sideNavCollapsed) {
        return (_jsxs(_Fragment, { children: [_jsx("div", { class: `ui5-sn-item-separator ${this.belowGroupClassName}` }), _jsx("slot", {}), _jsx("div", { class: "ui5-sn-item-separator" })] }));
    }
    return TreeItemTemplate.call(this);
}
function TreeItemTemplate() {
    return (_jsxs("li", { id: this._id, class: `ui5-sn-list-li ${this.belowGroupClassName}`, role: "none", children: [_jsx("div", { class: "ui5-sn-item-separator" }), _jsxs("div", { id: this._id, "data-sap-focus-ref": true, class: `ui5-sn-item ui5-sn-item-group ${this._classes}`, role: "treeitem", onKeyDown: this._onkeydown, onClick: this._onclick, onFocusIn: this._onfocusin, tabIndex: this.effectiveTabIndex, "aria-expanded": this._expanded, title: this._tooltip, "aria-owns": this._groupId, children: [_jsx("div", { class: "ui5-sn-item-text", children: this.text }), !!this.items.length &&
                        _jsx(Icon, { class: "ui5-sn-item-toggle-icon", name: this.expanded ? navDownArrow : navRightArrow, accessibleName: this._arrowTooltip, showTooltip: true })] }), !!this.items.length &&
                _jsx("ul", { id: this._groupId, class: "ui5-sn-item-ul", "aria-label": this.text, role: "group", children: _jsx("slot", {}) }), _jsx("div", { class: "ui5-sn-item-separator" })] }));
}
//# sourceMappingURL=SideNavigationGroupTemplate.js.map