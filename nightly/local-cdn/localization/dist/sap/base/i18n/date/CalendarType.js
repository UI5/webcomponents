/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
// Provides type module:sap/base/i18n/date/CalendarType.
import _EnumHelper from "./_EnumHelper.js";
/**
 * The types of <code>Calendar</code>.
 *
 * @enum {string}
 * @alias module:sap/base/i18n/date/CalendarType
 * @public
 * @since 1.120
 */
var CalendarType = {
  /**
   * The Gregorian calendar
   * @public
   */
  Gregorian: "Gregorian",
  /**
   * The Islamic calendar
   * @public
   */
  Islamic: "Islamic",
  /**
   * The Japanese emperor calendar
   * @public
   */
  Japanese: "Japanese",
  /**
   * The Persian Jalali calendar
   * @public
   */
  Persian: "Persian",
  /**
   * The Thai buddhist calendar
   * @public
   */
  Buddhist: "Buddhist"
};
_EnumHelper.register("sap.base.i18n.date.CalendarType", CalendarType);
export default CalendarType;