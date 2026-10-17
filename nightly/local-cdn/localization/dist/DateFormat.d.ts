import type DateFormatT from "sap/ui/core/format/DateFormat";
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
declare const DateFormatWrapped: typeof DateFormatT;
declare class DateFormat extends DateFormatWrapped {
    static getDateInstance(oFormatOptions?: DateFormatOptions, oLocale?: LocaleWrapped): DateFormat;
    static getDateInstance(oLocale?: LocaleWrapped): DateFormat;
}
export default DateFormat;
