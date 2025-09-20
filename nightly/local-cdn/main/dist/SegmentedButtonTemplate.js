import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
export default function SegmentedButtonTemplate() {
    return (_jsx("ul", { role: "listbox", class: "ui5-segmented-button-root", onClick: this._onclick, onMouseDown: this._onmousedown, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onFocusIn: this._onfocusin, "aria-multiselectable": this.selectionMode === "Multiple" ? "true" : "false", "aria-orientation": "horizontal", "aria-description": this.ariaDescriptionText, "aria-label": this.ariaLabelText, "aria-roledescription": this.ariaRoleDescription, children: _jsx("slot", {}) }));
}
//# sourceMappingURL=SegmentedButtonTemplate.js.map