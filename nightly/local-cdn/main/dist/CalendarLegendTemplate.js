import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import CalendarLegendItem from "./CalendarLegendItem.js";
export default function CalendarLegendTemplate() {
    return (_jsxs("div", { class: "ui5-calendar-legend-root", onFocusOut: this._onFocusOut, onFocusIn: this._onFocusIn, onKeyDown: this._onItemKeyDown, onMouseDown: this._onMouseDown, role: "list", "aria-roledescription": this._roleDescription, children: [this.defaultItemsMapping.filter(item => !item.hide).map(item => _jsx(CalendarLegendItem, { type: item.type })), this.legendItems.map(item => _jsx("slot", { name: item._individualSlot }))] }));
}
//# sourceMappingURL=CalendarLegendTemplate.js.map