import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import Calendar from "../Calendar.js";
import CalendarDateRange from "../CalendarDateRange.js";
export default function DateRangeTemplate() {
    return (_jsx(Calendar, { onSelectionChange: this.handleSelectionChange, selectionMode: "Range", children: _jsx(CalendarDateRange, { startValue: this.value?.operator === "DATERANGE"
                ? this.getOption(this.value.operator)?.format(this.value)?.split("-")[0] || undefined
                : undefined, endValue: this.value?.operator === "DATERANGE"
                ? this.getOption(this.value.operator)?.format(this.value)?.split("-")[1] || undefined
                : undefined }) }));
}
//# sourceMappingURL=DateRangeTemplate.js.map