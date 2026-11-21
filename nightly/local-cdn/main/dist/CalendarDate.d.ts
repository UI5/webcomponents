import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ICalendarSelectedDates } from "./Calendar.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-date` component defines a calendar date to be used inside `ui5-calendar`
 * @constructor
 * @extends UI5Element
 * @implements {ICalendarSelectedDates}
 * @abstract
 * @public
 */
declare class CalendarDate extends UI5Element implements ICalendarSelectedDates {
    /**
     * The date formatted according to the `formatPattern` property
     * of the `ui5-calendar` that hosts the component.
     * @default ""
     * @public
     */
    value: string;
}
export default CalendarDate;
