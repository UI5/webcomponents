var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DynamicDateRange_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import { isF4, isShow } from "@ui5/webcomponents-base/dist/Keys.js";
import DynamicDateRangeTemplate from "./DynamicDateRangeTemplate.js";
import IconMode from "./types/IconMode.js";
import { DYNAMIC_DATE_RANGE_SELECTED_TEXT, DYNAMIC_DATE_RANGE_EMPTY_SELECTED_TEXT, DYNAMIC_DATE_RANGE_NAVIGATION_ICON_TOOLTIP, DYNAMIC_DATE_RANGE_POPOVER_ACCESSIBLE_NAME, } from "./generated/i18n/i18n-defaults.js";
// default calendar for bundling
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";
// Styles
import dynamicDateRangeCss from "./generated/themes/DynamicDateRange.css.js";
import dynamicDateRangePopoverCss from "./generated/themes/DynamicDateRangePopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-dynamic-date-range` component provides a flexible interface to define date ranges using a combination of absolute dates, relative intervals, and preset ranges (e.g., "Today", "Yesterday", etc.).
 * It allows users to select a date range from a predefined set of options or enter custom dates.
 *
 * ### Usage
 *
 * The component is typically used in scenarios where users need to filter data based on date ranges, such as in reports, dashboards, or data analysis tools.
 * It can be used with the predefined options or extended with custom options to suit specific requirements. You can create your own options by extending the `IDynamicDateRangeOption` interface.
 * Every option should be registered using the `DynamicDateRange.register` method.
 *
 * If needed, you can also create a range of dates based on specific option using the `toDates` method.
 *
 * ### Standard Options
 *
 * The component comes with a set of standard options, including:
 * - "TODAY" - Represents the current date. An example value is `{ operator: "TODAY"}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/Today.js";`
 * - "YESTERDAY" - Represents the previous date. An example value is `{ operator: "YESTERDAY"}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/Yesterday.js";`
 * - "TOMORROW" - Represents the next date. An example value is `{ operator: "TOMORROW"}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/Tomorrow.js";`
 * - "DATE" - Represents a single date. An example value is `{ operator: "DATE", values: [new Date()]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/SingleDate.js";`
 * - "DATERANGE" - Represents a range of dates. An example value is `{ operator: "DATERANGE", values: [new Date(), new Date()]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/DateRange.js";`
 * - "DATETIMERANGE" - Represents a range of dates with times. An example value is `{ operator: "DATETIMERANGE", values: [new Date(), new Date()]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/DateTimeRange.js";`
 * - "FROMDATETIME" - Represents a range from date and time. An example value is `{ operator: "FROMDATETIME", values: [new Date()]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/FromDateTime.js";`
 * - "TODATETIME" - Represents a range to date and time. An example value is `{ operator: "TODATETIME", values: [new Date()]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/ToDateTime.js";`
 * - "LASTDAYS" - Represents Last X Days from today. An example value is `{ operator: "LASTDAYS", values: [2]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/LastOptions.js";`
 * - "LASTWEEKS" - Represents Last X Weeks from today. An example value is `{ operator: "LASTWEEKS", values: [3]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/LastOptions.js";`
 * - "LASTMONTHS" - Represents Last X Months from today. An example value is `{ operator: "LASTMONTHS", values: [6]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/LastOptions.js";`
 * - "LASTQUARTERS" - Represents Last X Quarters from today. An example value is `{ operator: "LASTQUARTERS", values: [2]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/LastOptions.js";`
 * - "LASTYEARS" - Represents Last X Years from today. An example value is `{ operator: "LASTYEARS", values: [1]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/LastOptions.js";`
 * - "NEXTDAYS" - Represents Next X Days from today. An example value is `{ operator: "NEXTDAYS", values: [2]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/NextOptions.js";`
 * - "NEXTWEEKS" - Represents Next X Weeks from today. An example value is `{ operator: "NEXTWEEKS", values: [3]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/NextOptions.js";`
 * - "NEXTMONTHS" - Represents Next X Months from today. An example value is `{ operator: "NEXTMONTHS", values: [6]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/NextOptions.js";`
 * - "NEXTQUARTERS" - Represents Next X Quarters from today. An example value is `{ operator: "NEXTQUARTERS", values: [2]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/NextOptions.js";`
 * - "NEXTYEARS" - Represents Next X Years from today. An example value is `{ operator: "NEXTYEARS", values: [1]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/NextOptions.js";`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/DynamicDateRange.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.11.0
 */
let DynamicDateRange = DynamicDateRange_1 = class DynamicDateRange extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines the options listed as a string, separated by commas and using capital case.
         * Example: "TODAY, YESTERDAY, DATERANGE"
         * @public
         * @default ""
         */
        this.options = "";
        /**
         * Defines the open or closed state of the popover.
         * @private
         * @default false
         */
        this.open = false;
        this.optionsObjects = [];
    }
    onBeforeRendering() {
        this.optionsObjects = this._createNormalizedOptions();
        this._focusSelectedItem();
    }
    async onAfterRendering() {
        await renderFinished().then(() => {
            setTimeout(() => {
                this._focusLastSelectedItem();
            }, 0);
        });
    }
    /**
     * Creates and normalizes options from the options string
     */
    _createNormalizedOptions() {
        if (!this.optionsObjects.length) { // initialize options on first use
            const optionKeys = this.splitOptions(this.options).filter(Boolean);
            const createdOptions = [];
            const classToOperators = new Map();
            // Group operators by their class
            optionKeys.forEach(option => {
                const OptionClass = DynamicDateRange_1.getOptionClass(option);
                if (OptionClass) {
                    const operators = classToOperators.get(OptionClass) || [];
                    operators.push(option);
                    classToOperators.set(OptionClass, operators);
                }
            });
            classToOperators.forEach((operators, OptionClass) => {
                createdOptions.push(new OptionClass(operators));
            });
            return createdOptions;
        }
        return this.optionsObjects;
    }
    splitOptions(options) {
        return options.split(",").map(s => s.trim());
    }
    _focusSelectedItem() {
        if (!this.value) {
            return;
        }
        const listItem = this._list?.items.find(item => item.selected === true);
        if (listItem) {
            this._list?.focusItem(listItem);
        }
    }
    _focusLastSelectedItem() {
        if (!this._lastSelectedOption) {
            return;
        }
        // Ensure the list exists and has items
        if (!this._list || !this._list.items.length) {
            return;
        }
        // Find the index of the last selected option in the options array
        const optionIndex = this.optionsObjects.findIndex(option => option.operator === this._lastSelectedOption?.operator);
        if (optionIndex >= 0 && optionIndex < this._list.items.length) {
            const listItem = this._list.items[optionIndex];
            this._list.focusItem(listItem);
        }
    }
    /**
     * Defines whether the value help icon is hidden
     * @private
     */
    get _iconMode() {
        return isDesktop() ? IconMode.Decorative : IconMode.Interactive;
    }
    get tooltipNavigationIcon() {
        return DynamicDateRange_1.i18nBundle.getText(DYNAMIC_DATE_RANGE_NAVIGATION_ICON_TOOLTIP);
    }
    get popoverAccessibleName() {
        return DynamicDateRange_1.i18nBundle.getText(DYNAMIC_DATE_RANGE_POPOVER_ACCESSIBLE_NAME);
    }
    _togglePicker() {
        if (this.open) {
            this._close();
        }
        else {
            this.open = true;
        }
    }
    _selectOption(e) {
        this._currentOption = this.optionsObjects.find(option => option.text === e.detail.item.textContent);
        this._lastSelectedOption = this._currentOption;
        if (!this._currentOption?.template) {
            this.currentValue = this._currentOption?.parse(this._currentOption.text);
            this._submitValue();
        }
        else if (!this.currentValue || this.currentValue.operator !== this._currentOption.operator) {
            this.currentValue = undefined;
        }
        if (this._currentOption?.operator === this.value?.operator) {
            this.currentValue = this.value;
        }
    }
    getOption(operator) {
        if (!operator) {
            return this._currentOption;
        }
        const resultOption = this.optionsObjects.find(option => option.operator === operator);
        if (!resultOption) {
            const OptionClass = DynamicDateRange_1.getOptionClass(operator);
            if (OptionClass) {
                const existingOption = this.optionsObjects.find(option => option.constructor === OptionClass);
                if (existingOption) {
                    existingOption.operator = operator;
                    return existingOption;
                }
                const optionObject = new OptionClass();
                this.optionsObjects.push(optionObject);
                return optionObject;
            }
        }
        return resultOption;
    }
    onInputChange(e) {
        const value = e.target?.value;
        if (!value) {
            this.value = undefined;
            this.fireDecoratorEvent("change");
            return;
        }
        const currentOption = this.optionsObjects.find(option => option.isValidString(value));
        this.value = currentOption ? this.getOption(currentOption.operator)?.parse(value) : undefined;
        if (this.value) {
            this.fireDecoratorEvent("change");
        }
    }
    onButtonBackClick() {
        this._currentOption = undefined;
    }
    /**
     * Converts a `value` into concrete `startDate` and `endDate` JavaScript `Date` objects.
     *
     * @public
     * @param value The option to convert into an array of date ranges
     * @returns An array of two `Date` objects representing the start and end dates.
     */
    toDates(value) {
        return this.getOption(value.operator)?.toDates(value);
    }
    get _hasCurrentOptionTemplate() {
        return !!this._currentOption?.template;
    }
    _submitValue() {
        const valueToSubmit = this.currentValue || { operator: this._currentOption?.operator || "", values: [] };
        const displayString = this._currentOption?.format(valueToSubmit) || "";
        if (this._input) {
            this._input.value = displayString;
        }
        if (!this._currentOption || !valueToSubmit.operator) {
            this.value = undefined;
        }
        else if (this._currentOption.isValidString(displayString)) {
            this.value = valueToSubmit;
            this.fireDecoratorEvent("change");
        }
        else {
            this.value = undefined;
        }
        this._currentOption?.resetState?.();
        this._currentOption = undefined;
        this.open = false;
    }
    _close() {
        this._currentOption?.resetState?.();
        this._currentOption = undefined;
        this.open = false;
    }
    onPopoverBeforeOpen() {
        if (this.currentValue !== this.value) {
            this.currentValue = this.value;
        }
    }
    onPopoverClose() {
        this._close();
    }
    get currentValueText() {
        if (this.currentValue) {
            const correctOption = this.getOption(this.currentValue.operator);
            if (correctOption) {
                const dates = correctOption.toDates(this.currentValue);
                const displayValue = { ...this.currentValue, values: dates };
                const displayText = correctOption.format(displayValue);
                return `${DynamicDateRange_1.i18nBundle.getText(DYNAMIC_DATE_RANGE_SELECTED_TEXT)}: ${displayText}`;
            }
        }
        if (this._currentOption) {
            const emptyValue = { operator: this._currentOption.operator, values: [] };
            const displayText = this._currentOption.format(emptyValue);
            if (displayText && displayText.trim()) {
                return `${DynamicDateRange_1.i18nBundle.getText(DYNAMIC_DATE_RANGE_SELECTED_TEXT)}: ${displayText}`;
            }
        }
        return DynamicDateRange_1.i18nBundle.getText(DYNAMIC_DATE_RANGE_EMPTY_SELECTED_TEXT);
    }
    handleSelectionChange(e) {
        const value = this._currentOption?.handleSelectionChange?.(e, this.currentValue);
        this.currentValue = JSON.parse(JSON.stringify(value)); // deep clone
        if (this.currentValue) {
            this.currentValue.values = value?.values;
        }
        // Update _currentOption if the operator changed
        if (this.currentValue && this.currentValue.operator !== this._currentOption?.operator) {
            this._currentOption = this.getOption(this.currentValue.operator);
        }
    }
    onInputKeyDown(e) {
        if (isShow(e)) {
            e.preventDefault();
            if (this.open) {
                if (!isF4(e)) {
                    this._toggleAndFocusInput();
                }
            }
            else {
                this._toggleAndFocusInput();
            }
        }
    }
    _toggleAndFocusInput() {
        this._togglePicker();
        if (this.open) {
            this._input?.focus();
        }
    }
    onKeyDownPopover(e) {
        if (isShow(e)) {
            e.preventDefault(); // Prevent scroll on Alt/Option + Arrow Up/Down
            this._toggleAndFocusInput();
        }
    }
    /**
     * Registers a new dynamic date range option with a unique key.
     *
     * Example:
     * DynamicDateRange.register("LASTWEEK", LastWeek);
     */
    static register(operator, option) {
        operator = operator.toUpperCase();
        if (!this.optionsClasses.has(operator)) {
            this.optionsClasses.set(operator, option);
        }
    }
    static getOptionClass(operator) {
        return this.optionsClasses.get(operator);
    }
};
DynamicDateRange.optionsClasses = new Map();
__decorate([
    property({ noAttribute: true })
], DynamicDateRange.prototype, "value", void 0);
__decorate([
    property({ type: String })
], DynamicDateRange.prototype, "options", void 0);
__decorate([
    property({ type: Boolean })
], DynamicDateRange.prototype, "open", void 0);
__decorate([
    property({ type: Object })
], DynamicDateRange.prototype, "_currentOption", void 0);
__decorate([
    property({ type: Object })
], DynamicDateRange.prototype, "currentValue", void 0);
__decorate([
    query("[ui5-input]")
], DynamicDateRange.prototype, "_input", void 0);
__decorate([
    query("[ui5-list]")
], DynamicDateRange.prototype, "_list", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], DynamicDateRange, "i18nBundle", void 0);
DynamicDateRange = DynamicDateRange_1 = __decorate([
    customElement({
        tag: "ui5-dynamic-date-range",
        languageAware: true,
        cldr: true,
        template: DynamicDateRangeTemplate,
        renderer: jsxRenderer,
        styles: [
            dynamicDateRangeCss,
            ResponsivePopoverCommonCss,
            dynamicDateRangePopoverCss,
        ],
    })
    /**
     * Fired when the input operation has finished by pressing Enter or on focusout or a value is selected in the popover.
     * @public
     */
    ,
    event("change", {
        bubbles: true,
        cancelable: true,
    })
], DynamicDateRange);
DynamicDateRange.define();
export default DynamicDateRange;
//# sourceMappingURL=DynamicDateRange.js.map