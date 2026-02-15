import CalendarDate from "./CalendarDate.js";
import UI5Date from "./UI5Date.js";
/**
 * Returns a UTC timestamp representing today
 * @public
 */
const getTodayUTCTimestamp = (primaryCalendarType) => CalendarDate.fromLocalJSDate(UI5Date.getInstance(), primaryCalendarType).valueOf() / 1000;
export default getTodayUTCTimestamp;
//# sourceMappingURL=getTodayUTCTimestamp.js.map