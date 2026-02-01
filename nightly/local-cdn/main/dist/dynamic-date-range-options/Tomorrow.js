import { tomorrowToDates } from "./toDates.js";
import { DYNAMIC_DATE_RANGE_TOMORROW_TEXT, } from "../generated/i18n/i18n-defaults.js";
import DynamicDateRange from "../DynamicDateRange.js";
/**
 * @class
 * @constructor
 * @public
 * @since 2.11.0
 */
class Tomorrow {
    parse() {
        const returnValue = { operator: "" };
        returnValue.operator = this.operator;
        return returnValue;
    }
    format() {
        return "Tomorrow";
    }
    toDates() {
        return tomorrowToDates();
    }
    isValidString(value) {
        return value === this.text;
    }
    get text() {
        return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_TOMORROW_TEXT);
    }
    get operator() {
        return "TOMORROW";
    }
    get icon() {
        return "";
    }
}
DynamicDateRange.register("TOMORROW", Tomorrow);
export default Tomorrow;
//# sourceMappingURL=Tomorrow.js.map