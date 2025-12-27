import { yesterdayToDates } from "./toDates.js";
import { DYNAMIC_DATE_RANGE_YESTERDAY_TEXT, } from "../generated/i18n/i18n-defaults.js";
import DynamicDateRange from "../DynamicDateRange.js";
/**
 * @class
 * @constructor
 * @public
 * @since 2.11.0
 */
class Yesterday {
    parse() {
        const returnValue = { operator: "" };
        returnValue.operator = this.operator;
        return returnValue;
    }
    format() {
        return "Yesterday";
    }
    toDates() {
        return yesterdayToDates();
    }
    isValidString(value) {
        return value === this.text;
    }
    get text() {
        return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_YESTERDAY_TEXT);
    }
    get operator() {
        return "YESTERDAY";
    }
    get icon() {
        return "";
    }
}
DynamicDateRange.register("YESTERDAY", Yesterday);
export default Yesterday;
//# sourceMappingURL=Yesterday.js.map