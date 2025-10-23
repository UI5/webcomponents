import DateTimeRangeTemplate from "./DateTimeRangeTemplate.js";
import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import {
	DYNAMIC_DATE_TIME_RANGE_TEXT,
} from "../generated/i18n/i18n-defaults.js";
import { dateTimeRangeOptionToDates } from "./toDates.js";
import DynamicDateRange from "../DynamicDateRange.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";

const DEFAULT_DELIMITER = "-";

/**
 * @class
 * @constructor
 * @public
 * @since 2.16.0
 */

class DateTimeRange implements IDynamicDateRangeOption {
	template: JsxTemplate;

	constructor() {
		this.template = DateTimeRangeTemplate;
	}

	parse(value: string): DynamicDateRangeValue {
		const returnValue = { operator: this.operator, values: [] } as DynamicDateRangeValue;

		if (!value) {
			return returnValue;
		}
		const splitValue = value.split(DEFAULT_DELIMITER);
		const startDate = this._parseDate(splitValue[0].trim()) as Date;
		const endDate = this._parseDate(splitValue[1].trim()) as Date;

		returnValue.values = [startDate, endDate];

		if (returnValue.values[0].getTime() > returnValue.values[1].getTime()) {
			returnValue.values.reverse();
		}

		return returnValue;
	}

	_parseDate(value: string): Date | undefined {
		return this.getFormat().parse(value) as Date;
	}

	format(value: DynamicDateRangeValue) {
		const valuesArray = value?.values as Array<Date>;

		if (!valuesArray || valuesArray.length !== 2 || !valuesArray[0] || !valuesArray[1]) {
			return "";
		}

		const startDate = this._formatDate(valuesArray[0]);
		const endDate = this._formatDate(valuesArray[1]);

		return `${startDate} ${DEFAULT_DELIMITER} ${endDate}`;
	}

	_formatDate(date: Date) {
		return this.getFormat().format(date);
	}

	toDates(value: DynamicDateRangeValue): Array<Date> {
		return dateTimeRangeOptionToDates(value);
	}

	get text(): string {
		return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_TIME_RANGE_TEXT);
	}

	get operator() {
		return "DATETIMERANGE";
	}

	get icon() {
		return "appointment-2";
	}

	isValidString(value: string): boolean {
		const splitValue = value.split(DEFAULT_DELIMITER);
		const startDate = this._parseDate(splitValue[0].trim()) as Date;
		const endDate = this._parseDate(splitValue[1].trim()) as Date;

		if (!startDate || !endDate || Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
			return false;
		}

		return true;
	}

	getFormatPattern() {
		const localeData = getCachedLocaleDataInstance(getLocale());
		return localeData.getCombinedDateTimePattern("medium", "medium");
	}

	getFormat(): DateFormat {
		return DateFormat.getDateInstance({
			strictParsing: true,
			pattern: this.getFormatPattern(),
		});
	}
}

DynamicDateRange.register("DATETIMERANGE", DateTimeRange);

export default DateTimeRange;
