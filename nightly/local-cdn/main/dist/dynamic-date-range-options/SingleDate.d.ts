import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
/**
 * @class
 * @constructor
 * @public
 * @since 2.11.0
 */
declare class SingleDate implements IDynamicDateRangeOption {
    template: JsxTemplate;
    constructor();
    parse(value: string): DynamicDateRangeValue;
    format(value: DynamicDateRangeValue): string;
    toDates(value: DynamicDateRangeValue): Array<Date>;
    isValidString(value: string): boolean;
    get text(): string;
    get operator(): string;
    get icon(): string;
    handleSelectionChange(e: CustomEvent): DynamicDateRangeValue | undefined;
    getFormat(): DateFormat;
}
export default SingleDate;
