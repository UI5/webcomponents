import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";
/**
 * @class
 * @constructor
 * @public
 * @since 2.11.0
 */
declare class Today implements IDynamicDateRangeOption {
    parse(): DynamicDateRangeValue;
    format(): string;
    toDates(): Array<Date>;
    isValidString(value: string): boolean;
    get text(): string;
    get operator(): string;
    get icon(): string;
}
export default Today;
