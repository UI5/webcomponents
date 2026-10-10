import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
export default function CalendarLegendItemTemplate() {
    return (_jsxs("div", { class: "ui5-calendar-legend-item-root", 
        // TOFIX: update after changing ITabbable
        tabindex: parseInt(this.forcedTabIndex), role: "listitem", children: [_jsx("div", { class: "ui5-calendar-legend-item-box" }), _jsx("div", { class: "ui5-calendar-legend-item-text", children: this.effectiveText })] }));
}
//# sourceMappingURL=CalendarLegendItemTemplate.js.map