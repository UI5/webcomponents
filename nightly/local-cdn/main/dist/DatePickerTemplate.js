import DatePickerInputTemplate from "./DatePickerInputTemplate.js";
import DatePickerPopoverTemplate from "./DatePickerPopoverTemplate.js";
export default function DatePickerTemplate() {
    return [
        DatePickerInputTemplate.call(this),
        DatePickerPopoverTemplate.call(this, { initialFocus: this.initialFocusId }),
    ];
}
//# sourceMappingURL=DatePickerTemplate.js.map