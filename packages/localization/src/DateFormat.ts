import type DateFormatT from "sap/ui/core/format/DateFormat";
// @ts-ignore
import DateFormatNative from "./sap/ui/core/format/DateFormat.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import LocaleWrapped from "./Locale.js";
import type CalendarWeekNumbering from "sap/base/i18n/date/CalendarWeekNumbering";
import type CalendarType from "sap/base/i18n/date/CalendarType";

type DateFormatOptions = {
	calendarWeekNumbering?: CalendarWeekNumbering | keyof typeof CalendarWeekNumbering;
	firstDayOfWeek?: int;
	minimalDaysInFirstWeek?: int;
	format?: string;
	pattern?: string;
	style?: string;
	strictParsing?: boolean;
	relative?: boolean;
	relativeRange?: int[];
	relativeScale?: string;
	relativeStyle?: string;
	interval?: boolean;
	intervalDelimiter?: string;
	singleIntervalValue?: boolean;
	UTC?: boolean;
	calendarType?: CalendarType | keyof typeof CalendarType;
};

const DateFormatWrapped = DateFormatNative as typeof DateFormatT;

const _dateFormatCache = new Map<string, DateFormat>();

class DateFormat extends DateFormatWrapped {
	static getDateInstance(oFormatOptions?: DateFormatOptions, oLocale?: LocaleWrapped): DateFormat;
	static getDateInstance(oLocale?: LocaleWrapped): DateFormat;
	static getDateInstance(oFormatOptionsOrLocale?: DateFormatOptions | LocaleWrapped, oLocale?: LocaleWrapped): DateFormat {
		const locale = oLocale ?? new LocaleWrapped(getLocale().toString());

		if (oFormatOptionsOrLocale instanceof LocaleWrapped) {
			return DateFormatWrapped.getDateInstance(undefined, oFormatOptionsOrLocale);
		}

		const cacheKey = `${JSON.stringify(oFormatOptionsOrLocale ?? {})}__${locale.toString()}`;
		let instance = _dateFormatCache.get(cacheKey);
		if (!instance) {
			instance = DateFormatWrapped.getDateInstance(oFormatOptionsOrLocale, locale);
			_dateFormatCache.set(cacheKey, instance);
		}
		return instance;
	}
}

export default DateFormat;
