import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import Calendar from "../Calendar.js";
import CalendarDate from "../CalendarDate.js";
export default function SingleDateTemplate() {
    return (_jsx(Calendar, { onSelectionChange: this.handleSelectionChange, children: _jsx(CalendarDate, { value: this.value && this.getOption(this.value?.operator)?.format(this.value) }) }));
}
//# sourceMappingURL=SingleDateTemplate.js.map