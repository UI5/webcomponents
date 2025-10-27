import SingleDateTemplate from "./SingleDateTemplate.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import {
	DYNAMIC_DATE_RANGE_DATE_TEXT,
} from "../generated/i18n/i18n-defaults.js";
import { dateOptionToDates } from "./toDates.js";
import DynamicDateRange from "../DynamicDateRange.js";

/**
 * @class
 * @constructor
 * @public
 * @since 2.11.0
 */

class SingleDate implements IDynamicDateRangeOption {
	template: JsxTemplate;

	constructor() {
		this.template = SingleDateTemplate;
	}

	parse(value: string): DynamicDateRangeValue {
		const date = this.getFormat().parse(value) as Date;
		const returnValue = { operator: "", values: [] } as DynamicDateRangeValue;
		returnValue.operator = this.operator;
		returnValue.values = [date];

		return returnValue;
	}

	format(value: DynamicDateRangeValue) {
		const valuesArray = value?.values as Array<Date>;

		if (!valuesArray) {
			return "";
		}

		const date = valuesArray[0];

		return this.getFormat().format(date);
	}

	toDates(value: DynamicDateRangeValue): Array<Date> {
		return dateOptionToDates(value);
	}

	isValidString(value: string): boolean {
		const date = this.getFormat().parse(value) as Date;

		if (!date || Number.isNaN(date.getTime())) {
			return false;
		}

		return true;
	}

	get text() {
		return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_DATE_TEXT);
	}

	get operator() {
		return "DATE";
	}

	get icon() {
		return "appointment-2";
	}

	handleSelectionChange(e: CustomEvent): DynamicDateRangeValue | undefined {
		const currentValue = { operator: "", values: [] } as DynamicDateRangeValue;
		currentValue.values = [];
		currentValue.operator = this.operator;

		if (e.detail.selectedDates[0]) {
			currentValue.values[0] = new Date(e.detail.selectedDates[0] * 1000);
		}

		return currentValue;
	}

	getFormat(): DateFormat {
		return DateFormat.getDateInstance({
			strictParsing: true,
		});
	}
}

DynamicDateRange.register("DATE", SingleDate);

export default SingleDate;
