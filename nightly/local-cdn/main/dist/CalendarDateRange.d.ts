import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ICalendarSelectedDates } from "./Calendar.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-date-range` component defines a range of dates to be used inside `ui5-calendar`
 * @constructor
 * @extends UI5Element
 * @implements {ICalendarSelectedDates}
 * @abstract
 * @public
 * @since 2.0.0
 */
declare class CalendarDateRange extends UI5Element implements ICalendarSelectedDates {
    /**
     * Start of date range formatted according to the `formatPattern` property
     * of the `ui5-calendar` that hosts the component.
     * @default ""
     * @public
     */
    startValue: string;
    /**
     * End of date range formatted according to the `formatPattern` property
     * of the `ui5-calendar` that hosts the component.
     * @default ""
     * @public
     */
    endValue: string;
}
export default CalendarDateRange;
