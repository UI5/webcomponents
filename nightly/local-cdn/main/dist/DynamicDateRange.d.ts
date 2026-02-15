import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import IconMode from "./types/IconMode.js";
import type Input from "./Input.js";
import type List from "./List.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";
type DynamicDateRangeValue = {
    /**
     * The key of the option.
     * @default ""
     * @public
     */
    operator: string;
    /**
     * Values of the dynamic date range.
     * @default []
     * @public
     */
    values?: Array<Date> | Array<number>;
};
/**
 * Represents a dynamic date range option used by the `ui5-dynamic-date-range` component.
 *
 * Represents a dynamic date range option used for handling dynamic date ranges.
 * This interface defines the structure and behavior required for implementing
 * dynamic date range options, including formatting, parsing, validation, and
 * conversion of date range values.
 *
 *  * Properties:
 * - `icon`: The icon associated with the dynamic date range option, typically used for UI representation.
 * - `operator`: A unique operator identifying the dynamic date range option.
 * - `text`: The display text for the dynamic date range option.
 * - `template` (optional): A JSX template for rendering the dynamic date range option.
 *
 * Methods:
 * - `format(value: DynamicDateRangeValue): string`: Formats the given dynamic date range value into a string representation.
 * - `parse(value: string): DynamicDateRangeValue | undefined`: Parses a string into a dynamic date range value.
 * - `toDates(value: DynamicDateRangeValue): Array<Date>`: Converts a dynamic date range value into an array of `Date` objects.
 * - `handleSelectionChange?(event: CustomEvent): DynamicDateRangeValue | undefined`: (Optional) Handles selection changes in the UI of the dynamic date range option.
 * - `isValidString(value: string): boolean`: Validates whether a given string is a valid representation of the dynamic date range value.
 *
 * @public
 * @since 2.11.0
 */
interface IDynamicDateRangeOption {
    icon: string;
    operator: string;
    text: string;
    format: (value: DynamicDateRangeValue) => string;
    parse: (value: string) => DynamicDateRangeValue | undefined;
    toDates: (value: DynamicDateRangeValue) => Array<Date>;
    handleSelectionChange?: (event: CustomEvent, value: DynamicDateRangeValue | undefined) => DynamicDateRangeValue | undefined;
    template?: JsxTemplate;
    isValidString: (value: string) => boolean;
    resetState?: () => void;
}
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
declare class DynamicDateRange extends UI5Element {
    eventDetails: {
        change: void;
    };
    static i18nBundle: I18nBundle;
    /**
     * Defines the value object.
     * @default undefined
     * @public
     */
    value?: DynamicDateRangeValue;
    /**
     * Defines the options listed as a string, separated by commas and using capital case.
     * Example: "TODAY, YESTERDAY, DATERANGE"
     * @public
     * @default ""
     */
    options: string;
    /**
     * Defines the open or closed state of the popover.
     * @private
     * @default false
     */
    open: boolean;
    _currentOption?: IDynamicDateRangeOption;
    _lastSelectedOption?: IDynamicDateRangeOption;
    currentValue?: DynamicDateRangeValue;
    optionsObjects: Array<IDynamicDateRangeOption>;
    static optionsClasses: Map<string, new (operators?: Array<string>) => IDynamicDateRangeOption>;
    _input?: Input;
    _list?: List;
    onBeforeRendering(): void;
    onAfterRendering(): Promise<void>;
    /**
     * Creates and normalizes options from the options string
     */
    _createNormalizedOptions(): Array<IDynamicDateRangeOption>;
    splitOptions(options: string): Array<string>;
    _focusSelectedItem(): void;
    _focusLastSelectedItem(): void;
    /**
     * Defines whether the value help icon is hidden
     * @private
     */
    get _iconMode(): IconMode.Decorative | IconMode.Interactive;
    get tooltipNavigationIcon(): string;
    get popoverAccessibleName(): string;
    _togglePicker(): void;
    _selectOption(e: CustomEvent): void;
    getOption(operator?: string): IDynamicDateRangeOption | undefined;
    onInputChange(e: Event): void;
    onButtonBackClick(): void;
    /**
     * Converts a `value` into concrete `startDate` and `endDate` JavaScript `Date` objects.
     *
     * @public
     * @param value The option to convert into an array of date ranges
     * @returns An array of two `Date` objects representing the start and end dates.
     */
    toDates(value: DynamicDateRangeValue): Array<Date>;
    get _hasCurrentOptionTemplate(): boolean;
    _submitValue(): void;
    _close(): void;
    onPopoverBeforeOpen(): void;
    onPopoverClose(): void;
    get currentValueText(): string;
    handleSelectionChange(e: CustomEvent): void;
    onInputKeyDown(e: KeyboardEvent): void;
    _toggleAndFocusInput(): void;
    onKeyDownPopover(e: KeyboardEvent): void;
    /**
     * Registers a new dynamic date range option with a unique key.
     *
     * Example:
     * DynamicDateRange.register("LASTWEEK", LastWeek);
     */
    static register(operator: string, option: new () => IDynamicDateRangeOption): void;
    static getOptionClass(operator: string): (new () => IDynamicDateRangeOption) | undefined;
}
export default DynamicDateRange;
export type { DynamicDateRangeValue, IDynamicDateRangeOption, };
