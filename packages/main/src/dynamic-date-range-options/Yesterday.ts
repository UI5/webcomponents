import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";
import { yesterdayToDates } from "./toDates.js";
import {
	DYNAMIC_DATE_RANGE_YESTERDAY_TEXT,
} from "../generated/i18n/i18n-defaults.js";
import DynamicDateRange from "../DynamicDateRange.js";

/**
 * @class
 * @constructor
 * @public
 * @since 2.11.0
 */

class Yesterday implements IDynamicDateRangeOption {
	parse(): DynamicDateRangeValue {
		const returnValue = { operator: "" };
		returnValue.operator = this.operator;

		return returnValue;
	}

	format(): string {
		return "Yesterday";
	}

	toDates() : Array<Date> {
		return yesterdayToDates();
	}

	isValidString(value: string): boolean {
		return value === this.text;
	}

	get text(): string {
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
