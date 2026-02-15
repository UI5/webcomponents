import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import arrowRight from "@ui5/webcomponents-icons/dist/arrow-right.js";
export default function SideNavigationSubItemTemplate() {
    const EffectiveTag = this._effectiveTag;
    return (_jsx("li", { id: this._id, class: "ui5-sn-list-li", role: "none", children: _jsxs(EffectiveTag, { id: this._id, "data-sap-focus-ref": true, class: `ui5-sn-item ui5-sn-item-level2 ${this._classes}`, role: this.ariaRole, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onClick: this._onclick, onFocusIn: this._onfocusin, tabIndex: this.effectiveTabIndex, "aria-current": this._ariaCurrent, "aria-selected": this._ariaSelected, title: this._tooltip, "aria-disabled": this.effectiveDisabled, href: this._href, target: this._target, "aria-haspopup": this._ariaHasPopup, children: [this.icon &&
                    _jsx(Icon, { class: "ui5-sn-item-icon", name: this.icon }), _jsx("div", { class: "ui5-sn-item-text", children: this.text }), this.isExternalLink &&
                    _jsx(Icon, { class: "ui5-sn-item-external-link-icon", name: arrowRight })] }) }));
}
//# sourceMappingURL=SideNavigationSubItemTemplate.js.map