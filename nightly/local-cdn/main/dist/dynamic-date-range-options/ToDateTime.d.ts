import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
/**
 * @class
 * @constructor
 * @public
 * @since 2.11.0
 */
declare class ToDateTime implements IDynamicDateRangeOption {
    template: JsxTemplate;
    private _showTimeView;
    private _currentDateValue;
    constructor();
    parse(value: string): DynamicDateRangeValue;
    format(value: DynamicDateRangeValue): string;
    toDates(value: DynamicDateRangeValue): Array<Date>;
    resetState?: (() => void) | undefined;
    get text(): string;
    get operator(): string;
    get icon(): string;
    get showDateView(): boolean;
    get showTimeView(): boolean;
    get btnDateLabel(): string;
    get btnTimeLabel(): string;
    get toText(): string;
    getDateValue(date: Date | undefined): string;
    getTimeValue(date: Date | undefined): string;
    _dateTimeSwitchChange(): void;
    isValidString(value: string): boolean;
    getFormat(): DateFormat;
    getDateFormat(): DateFormat;
    getTimeFormat(): DateFormat;
    handleSelectionChange(e: CustomEvent, value: DynamicDateRangeValue | undefined): DynamicDateRangeValue | undefined;
}
export default ToDateTime;
