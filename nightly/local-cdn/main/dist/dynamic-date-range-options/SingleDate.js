import SingleDateTemplate from "./SingleDateTemplate.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import { DYNAMIC_DATE_RANGE_DATE_TEXT, } from "../generated/i18n/i18n-defaults.js";
import { dateOptionToDates } from "./toDates.js";
import DynamicDateRange from "../DynamicDateRange.js";
/**
 * @class
 * @constructor
 * @public
 * @since 2.11.0
 */
class SingleDate {
    constructor() {
        this.template = SingleDateTemplate;
    }
    parse(value) {
        const date = this.getFormat().parse(value);
        const returnValue = { operator: "", values: [] };
        returnValue.operator = this.operator;
        returnValue.values = [date];
        return returnValue;
    }
    format(value) {
        const valuesArray = value?.values;
        if (!valuesArray) {
            return "";
        }
        const date = valuesArray[0];
        return this.getFormat().format(date);
    }
    toDates(value) {
        return dateOptionToDates(value);
    }
    isValidString(value) {
        const date = this.getFormat().parse(value);
        if (!date || Number.isNaN(date.getTime())) {
            return false;
        }
        return true;
    }
    get text() {
        return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_DATE_TEXT);
    }
    get operator() {
        return "DATE";
    }
    get icon() {
        return "appointment-2";
    }
    handleSelectionChange(e) {
        const currentValue = { operator: "", values: [] };
        currentValue.values = [];
        currentValue.operator = this.operator;
        if (e.detail.selectedDates[0]) {
            currentValue.values[0] = new Date(e.detail.selectedDates[0] * 1000);
        }
        return currentValue;
    }
    getFormat() {
        return DateFormat.getDateInstance({
            strictParsing: true,
        });
    }
}
DynamicDateRange.register("DATE", SingleDate);
export default SingleDate;
//# sourceMappingURL=SingleDate.js.map