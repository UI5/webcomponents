import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
export default function SegmentedButtonItemTemplate() {
    return (_jsxs("li", { role: "option", class: "ui5-segmented-button-item-root", "aria-posinset": this.posInSet, "aria-setsize": this.sizeOfSet, "aria-selected": this.selected, "aria-disabled": this.disabled, "aria-roledescription": this.ariaDescription, "data-sap-focus-ref": true, onClick: this._onclick, onKeyUp: this._onkeyup, tabindex: this.tabIndexValue ? parseInt(this.tabIndexValue) : undefined, "aria-label": this.ariaLabelText, "aria-description": this.ariaDescriptionText, title: this.tooltip || this.slotTextContent, children: [this.icon &&
                _jsx(Icon, { part: "icon", class: "ui5-segmented-button-item-icon", name: this.icon, showTooltip: this.showIconTooltip }), _jsx("span", { id: `${this._id}-content`, class: "ui5-segmented-button-item-text", children: _jsx("bdi", { children: _jsx("slot", {}) }) })] }));
}
//# sourceMappingURL=SegmentedButtonItemTemplate.js.map