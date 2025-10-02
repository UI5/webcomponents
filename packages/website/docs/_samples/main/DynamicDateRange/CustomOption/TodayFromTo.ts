import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import UI5Date from "@ui5/webcomponents-localization/dist/dates/UI5Date.js";
import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "@ui5/webcomponents/dist/DynamicDateRange.js";
import DynamicDateRange from "@ui5/webcomponents/dist/DynamicDateRange.js";
import TodayFromToTemplate from "./TodayFromToTemplate.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";

/**
 * @class
 * @constructor
 * @public
 */
class TodayFromToDays implements IDynamicDateRangeOption {
	template: JsxTemplate;

	constructor() {
		this.template = TodayFromToTemplate;
	}

	parse(value: string): DynamicDateRangeValue {
		const match = value.match(/Today -(\d+)\/\+(\d+) days/);

		if (match) {
			const x = parseInt(match[1]);
			const y = parseInt(match[2]);
			return { operator: this.operator, values: [x, y] };
		}

		return { operator: this.operator, values: [0, 0] };
	}

	format(value: DynamicDateRangeValue) {
		if (!value.values || value.values.length !== 2) {
			value.values = [0, 0];
		}

		// Format values in a date range
		if (value.values[0] instanceof Date) {
			const dateValues = value.values as Array<Date>;
			return this.getFormat().format(dateValues);
		}

		// Format values in the pattern "Today -X/+Y days"
		const x = value.values[0];
		const y = value.values[1] as number;

		return `Today -${x}/+${y} days`;
	}

	toDates(value: DynamicDateRangeValue): Array<Date> {
		if (!value.values || value.values.length !== 2) {
			return [];
		}
		const x = value.values[0] as number;
		const y = value.values[1] as number;
		const today = UI5Date.getInstance();

		const startDate = x ? UI5Date.getInstance(today.getFullYear(), today.getMonth(), today.getDate() - x) : UI5Date.getInstance();
		const endDate = y ? UI5Date.getInstance(today.getFullYear(), today.getMonth(), today.getDate() + y) : UI5Date.getInstance();

		startDate?.setHours(0, 0, 0, 0);
		endDate?.setHours(23, 59, 59, 999);

		return [startDate, endDate];
	}

	isValidString(value: string): boolean {
		const pattern = this.text.replace(/[.*+?^${}()|[\]\\/-]/g, "\\$&").replace("X", "\\d+").replace("Y", "\\d+");
		const regex = new RegExp(`^${pattern}$`, "i");
		return regex.test(value);
	}

	get text() {
		return "Today -X/+Y days";
	}

	get operator() {
		return "TODAYFROMTO";
	}

	get icon() {
		return "check-availability";
	}

	getFormat(): DateFormat {
		return DateFormat.getDateInstance({
			strictParsing: true,
			interval: true,
			intervalDelimiter: " - ",
		});
	}
}

DynamicDateRange.register("TODAYFROMTO", TodayFromToDays);

export default TodayFromToDays;
