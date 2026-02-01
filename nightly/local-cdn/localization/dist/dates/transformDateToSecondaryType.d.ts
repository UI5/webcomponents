import type CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import CalendarDate from "./CalendarDate.js";
declare const transformDateToSecondaryType: (primaryCalendarType: `${CalendarType}` | undefined, secondaryCalendarType: `${CalendarType}` | undefined, timeStamp: number, hasYearPicker?: boolean) => {
    firstDate: CalendarDate;
    lastDate: CalendarDate;
};
export default transformDateToSecondaryType;
