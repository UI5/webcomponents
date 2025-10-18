import type CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import CalendarDate from "./CalendarDate.js";
declare const getMinCalendarDate: (primaryCalendarType: `${CalendarType}`) => CalendarDate;
declare const getMaxCalendarDate: (primaryCalendarType: `${CalendarType}`) => CalendarDate;
export { getMinCalendarDate, getMaxCalendarDate, };
