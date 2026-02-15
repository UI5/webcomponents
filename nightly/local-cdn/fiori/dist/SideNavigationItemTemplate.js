import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import navRightArrow from "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import navDownArrow from "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import arrowRight from "@ui5/webcomponents-icons/dist/arrow-right.js";
export default function SideNavigationItemTemplate() {
    if (this.sideNavCollapsed) {
        return ItemTemplate.call(this);
    }
    return (_jsx("li", { id: this._id, class: "ui5-sn-list-li", role: "none", children: ItemTemplate.call(this) }));
}
function ItemTemplate() {
    const EffectiveTag = this._effectiveTag;
    return (_jsxs(_Fragment, { children: [_jsxs(EffectiveTag, { id: this._id, "data-sap-focus-ref": true, class: `ui5-sn-item ui5-sn-item-level1 ${this._classes}`, role: this.ariaRole, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onClick: this._onclick, onFocusIn: this._onfocusin, tabIndex: this.effectiveTabIndex, "aria-current": this._ariaCurrent, "aria-selected": this._ariaSelected, title: this._tooltip, "aria-disabled": this.effectiveDisabled, href: this._href, target: this._target, "aria-haspopup": this._ariaHasPopup, onFocusOut: this._onfocusout, onMouseEnter: this._onmouseenter, onMouseLeave: this._onmouseleave, "aria-checked": this._ariaChecked, "aria-owns": this._groupId, "aria-label": this._ariaLabel, "aria-expanded": this._expanded, "aria-describedby": this._describedBy, children: [this.sideNavCollapsed ?
                        _jsx(Icon, { class: "ui5-sn-item-icon", name: this.icon })
                        :
                            this.icon && _jsx(Icon, { class: "ui5-sn-item-icon", name: this.icon }), _jsx("div", { class: "ui5-sn-item-text", children: this.text }), this.sideNavCollapsed ?
                        !!this.items.length &&
                            _jsx(Icon, { class: "ui5-sn-item-toggle-icon", name: navRightArrow })
                        :
                            !!this.items.length &&
                                _jsx(Icon, { class: "ui5-sn-item-toggle-icon", name: this.expanded ? navDownArrow : navRightArrow, accessibleName: this._arrowTooltip, showTooltip: true, onClick: this._onToggleClick }), this.isExternalLink &&
                        _jsx(Icon, { class: "ui5-sn-item-external-link-icon", name: arrowRight })] }), !this.sideNavCollapsed && !!this.items.length &&
                _jsx("ul", { id: this._groupId, class: "ui5-sn-item-ul", "aria-label": this.text, role: "group", children: _jsx("slot", {}) })] }));
}
//# sourceMappingURL=SideNavigationItemTemplate.js.map