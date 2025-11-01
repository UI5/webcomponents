import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
/**
 * @class
 * @constructor
 * @public
 * @since 2.16.0
 */
declare class DateTimeRange implements IDynamicDateRangeOption {
    template: JsxTemplate;
    constructor();
    parse(value: string): DynamicDateRangeValue;
    _parseDate(value: string): Date | undefined;
    format(value: DynamicDateRangeValue): string;
    _formatDate(date: Date): string;
    toDates(value: DynamicDateRangeValue): Array<Date>;
    get text(): string;
    get operator(): string;
    get icon(): string;
    isValidString(value: string): boolean;
    getFormatPattern(): string;
    getFormat(): DateFormat;
}
export default DateTimeRange;
