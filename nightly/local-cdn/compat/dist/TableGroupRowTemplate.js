import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
export default function TableGroupRowTemplate() {
    return (_jsx("tr", { part: "group-row", class: "ui5-table-group-row-root", "aria-label": this.ariaLabelText, tabindex: this.forcedTabIndex ? parseInt(this.forcedTabIndex) : undefined, onFocusIn: this._onfocusin, children: _jsx("td", { colspan: this.colSpan, children: _jsx("slot", {}) }) }));
}
//# sourceMappingURL=TableGroupRowTemplate.js.map