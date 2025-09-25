import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";
import { todayToDates } from "./toDates.js";
import {
	DYNAMIC_DATE_RANGE_TODAY_TEXT,
} from "../generated/i18n/i18n-defaults.js";
import DynamicDateRange from "../DynamicDateRange.js";

/**
 * @class
 * @constructor
 * @public
 * @since 2.11.0
 */
class Today implements IDynamicDateRangeOption {
	parse(): DynamicDateRangeValue {
		const returnValue = { operator: "" };
		returnValue.operator = this.operator;

		return returnValue;
	}

	format(): string {
		return "Today";
	}

	toDates(): Array<Date> {
		return todayToDates();
	}

	isValidString(value: string): boolean {
		return value === this.text;
	}

	get text() {
		return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_TODAY_TEXT);
	}

	get operator() {
		return "TODAY";
	}

	get icon() {
		return "";
	}
}

DynamicDateRange.register("TODAY", Today);

export default Today;
