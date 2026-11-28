import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
export default function ProductSwitchTemplate() {
    return (_jsx(BusyIndicator, { active: this.loading, delay: this.loadingDelay, class: "ui5-product-switch-busy-indicator", children: _jsx("div", { role: "list", class: "ui5-product-switch-root", "aria-label": this._ariaLabelText, onFocusIn: this._onfocusin, onKeyDown: this._onkeydown, onClick: this.handleProductSwitchItemClick, children: _jsx("slot", {}) }) }));
}
//# sourceMappingURL=ProductSwitchTemplate.js.map