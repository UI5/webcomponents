import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
/**
 * @class
 * @constructor
 * @public
 * @since 2.14.0
 */
declare class LastOptions implements IDynamicDateRangeOption {
    template: JsxTemplate;
    _operator: string;
    i18nKey: I18nText;
    options?: Array<string>;
    constructor(operators?: Array<string>);
    _getI18nKeyForOperator(operator: string): I18nText;
    parse(value: string): DynamicDateRangeValue | undefined;
    format(value: DynamicDateRangeValue): string;
    toDates(value: DynamicDateRangeValue): Array<Date>;
    isValidString(value: string): boolean;
    handleSelectionChange(e: CustomEvent): DynamicDateRangeValue | undefined;
    get text(): string;
    get icon(): string;
    get availableOptions(): {
        operator: string;
        unitText: string;
        text: string;
    }[];
    get operator(): string;
    set operator(value: string);
}
export default LastOptions;
