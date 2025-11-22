import DateRangeTemplate from "./DateRangeTemplate.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import UI5Date from "@ui5/webcomponents-localization/dist/dates/UI5Date.js";
import { DYNAMIC_DATE_RANGE_DATERANGE_TEXT, } from "../generated/i18n/i18n-defaults.js";
import { dateRangeOptionToDates } from "./toDates.js";
import DynamicDateRange from "../DynamicDateRange.js";
/**
 * @class
 * @constructor
 * @public
 * @since 2.11.0
 */
class DateRange {
    constructor() {
        this.template = DateRangeTemplate;
    }
    parse(value) {
        const returnValue = { operator: "", values: [] };
        returnValue.operator = this.operator;
        returnValue.values = this.getFormat().parse(value);
        return returnValue;
    }
    format(value) {
        const valuesArray = value?.values;
        if (!valuesArray || valuesArray.length !== 2 || !valuesArray[1]) {
            return "";
        }
        const formattedValue = this.getFormat().format(valuesArray);
        return formattedValue;
    }
    toDates(value) {
        return dateRangeOptionToDates(value);
    }
    get text() {
        return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_DATERANGE_TEXT);
    }
    get operator() {
        return "DATERANGE";
    }
    get icon() {
        return "appointment-2";
    }
    isValidString(value) {
        const dates = this.getFormat().parse(value);
        if (!dates[0] || !dates[1] || Number.isNaN(dates[0].getTime()) || Number.isNaN(dates[1].getTime())) {
            return false;
        }
        return true;
    }
    getFormat() {
        return DateFormat.getDateInstance({
            strictParsing: true,
            interval: true,
            intervalDelimiter: " - ",
        });
    }
    handleSelectionChange(e) {
        const currentValue = { operator: "", values: [] };
        currentValue.values = [];
        currentValue.operator = this.operator;
        if (e.detail.selectedDates[0]) {
            currentValue.values[0] = UI5Date.getInstance(e.detail.selectedDates[0] * 1000);
        }
        if (e.detail.selectedDates[1]) {
            currentValue.values[1] = UI5Date.getInstance(e.detail.selectedDates[1] * 1000);
        }
        // Handle backwards date ranges by automatically flipping them
        if (currentValue.values.length === 2 && currentValue.values[0] && currentValue.values[1]) {
            const startDate = currentValue.values[0];
            const endDate = currentValue.values[1];
            // If start date is after end date, flip them
            if (startDate.getTime() > endDate.getTime()) {
                currentValue.values = [endDate, startDate];
            }
        }
        return currentValue;
    }
}
DynamicDateRange.register("DATERANGE", DateRange);
export default DateRange;
//# sourceMappingURL=DateRange.js.map