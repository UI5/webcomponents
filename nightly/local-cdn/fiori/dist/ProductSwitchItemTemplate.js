import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "@ui5/webcomponents/dist/Icon.js";
export default function ProductSwitchItemTemplate() {
    return (_jsx(_Fragment, { children: this.targetSrc ?
            _jsx("a", { "data-sap-focus-ref": true, class: "ui5-product-switch-item-root", onFocusOut: this._onfocusout, onFocusIn: this._onfocusin, onMouseDown: this._onmousedown, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, tabindex: this.forcedTabIndex ? parseInt(this.forcedTabIndex) : undefined, href: this.targetSrc, target: this._effectiveTarget, children: item.call(this) })
            :
                _jsx("div", { role: "listitem", class: "ui5-product-switch-item-root", "data-sap-focus-ref": true, onFocusOut: this._onfocusout, onFocusIn: this._onfocusin, onMouseDown: this._onmousedown, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, tabindex: this.forcedTabIndex ? parseInt(this.forcedTabIndex) : undefined, children: item.call(this) }) }));
}
function item() {
    return (_jsxs(_Fragment, { children: [this.image && this.image.length > 0 ? (_jsx("span", { class: "ui5-product-switch-item-image-placeholder", children: _jsx("slot", { name: "image" }) })) : (this.icon &&
                _jsx(Icon, { class: "ui5-product-switch-item-icon", name: this.icon })), _jsxs("span", { class: "ui5-product-switch-item-text-content", children: [this.titleText &&
                        _jsx("span", { class: "ui5-product-switch-item-title", children: this.titleText }), this.subtitleText &&
                        _jsx("span", { class: "ui5-product-switch-item-subtitle", children: this.subtitleText })] })] }));
}
//# sourceMappingURL=ProductSwitchItemTemplate.js.map