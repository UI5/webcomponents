import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
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
@customElement("ui5-date-range")
class CalendarDateRange extends UI5Element implements ICalendarSelectedDates {
	/**
	 * Start of date range formatted according to the `formatPattern` property
	 * of the `ui5-calendar` that hosts the component.
	 * @default ""
	 * @public
	 */
	@property()
	startValue = "";

	/**
	 * End of date range formatted according to the `formatPattern` property
	 * of the `ui5-calendar` that hosts the component.
	 * @default ""
	 * @public
	 */
	@property()
	endValue = "";
}

CalendarDateRange.define();

export default CalendarDateRange;
