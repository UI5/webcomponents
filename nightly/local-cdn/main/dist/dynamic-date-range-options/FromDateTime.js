import FromDateTimeTemplate from "./FromDateTimeTemplate.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import UI5Date from "@ui5/webcomponents-localization/dist/dates/UI5Date.js";
import { DATETIME_PICKER_DATE_BUTTON, DATETIME_PICKER_TIME_BUTTON, DYNAMIC_DATE_RANGE_FROM_INPUT_TEXT, DYNAMIC_DATE_RANGE_FROM_TEXT, } from "../generated/i18n/i18n-defaults.js";
import { dateTimeOptionToDates } from "./toDates.js";
import DynamicDateRange from "../DynamicDateRange.js";
/**
 * @class
 * @constructor
 * @public
 * @since 2.11.0
 */
class FromDateTime {
    constructor() {
        this.resetState = () => {
            this._showTimeView = false;
        };
        this.template = FromDateTimeTemplate;
        this._showTimeView = false;
        this._currentDateValue = UI5Date.getInstance();
    }
    parse(value) {
        const dateText = value.replace(this.fromText, "").trim();
        const date = this.getFormat().parse(dateText);
        const returnValue = { operator: "", values: [] };
        returnValue.operator = this.operator;
        returnValue.values = [date];
        return returnValue;
    }
    format(value) {
        const valuesArray = value?.values;
        if (!valuesArray || valuesArray.length === 0) {
            return "";
        }
        const formattedValue = this.getFormat().format(valuesArray[0]);
        return `${this.fromText} ${formattedValue}`;
    }
    toDates(value) {
        return dateTimeOptionToDates(value);
    }
    get text() {
        return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_FROM_TEXT);
    }
    get operator() {
        return "FROMDATETIME";
    }
    get icon() {
        return "appointment-2";
    }
    get showDateView() {
        return !this._showTimeView;
    }
    get showTimeView() {
        return this._showTimeView;
    }
    get btnDateLabel() {
        return DynamicDateRange.i18nBundle.getText(DATETIME_PICKER_DATE_BUTTON);
    }
    get btnTimeLabel() {
        return DynamicDateRange.i18nBundle.getText(DATETIME_PICKER_TIME_BUTTON);
    }
    get fromText() {
        return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_FROM_INPUT_TEXT);
    }
    getDateValue(date) {
        if (date) {
            return this.getDateFormat().format(date);
        }
        return this._currentDateValue ? this.getDateFormat().format(this._currentDateValue) : "";
    }
    getTimeValue(date) {
        if (date) {
            return this.getFormat().format(date);
        }
        return this._currentDateValue ? this.getFormat().format(this._currentDateValue) : "";
    }
    _dateTimeSwitchChange() {
        this._showTimeView = !this._showTimeView;
    }
    isValidString(value) {
        const dateText = value.replace(this.fromText, "").trim();
        const date = this.getFormat().parse(dateText);
        if (!date || Number.isNaN(date.getTime())) {
            return false;
        }
        return true;
    }
    getFormat() {
        return DateFormat.getDateTimeInstance({
            strictParsing: true,
        });
    }
    getDateFormat() {
        return DateFormat.getDateInstance({
            strictParsing: true,
        });
    }
    getTimeFormat() {
        return DateFormat.getTimeInstance({
            strictParsing: true,
        });
    }
    handleSelectionChange(e, value) {
        const currentValue = value || { operator: "", values: [] };
        const target = e.target;
        currentValue.values = this._currentDateValue ? [this._currentDateValue] : [];
        currentValue.operator = this.operator;
        if (target.hasAttribute("ui5-segmented-button")) {
            this._dateTimeSwitchChange();
            return currentValue;
        }
        if (target.hasAttribute("ui5-calendar")) {
            if (e.detail.selectedDates[0]) {
                const tempDate = UI5Date.getInstance(e.detail.selectedDates[0] * 1000);
                this._currentDateValue.setFullYear(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());
                currentValue.values = [this._currentDateValue];
            }
        }
        if (target.hasAttribute("ui5-time-selection-clocks")) {
            const tempValue = e.detail.value;
            const tempDate = this.getFormat().parse(tempValue);
            if (!this._currentDateValue && value?.values?.length) {
                this._currentDateValue = value?.values[0];
            }
            if (tempDate) {
                this._currentDateValue.setHours(tempDate.getHours(), tempDate.getMinutes(), tempDate.getSeconds());
                currentValue.values = [this._currentDateValue];
            }
        }
        this._showTimeView = true;
        return currentValue;
    }
}
DynamicDateRange.register("FROMDATETIME", FromDateTime);
export default FromDateTime;
//# sourceMappingURL=FromDateTime.js.map