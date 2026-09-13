/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
// Provides type sap.ui.core.date.CalendarUtils.
import Formatting from "../../../base/i18n/Formatting.js";
import CalendarWeekNumbering from "../../../base/i18n/date/CalendarWeekNumbering.js";
import Locale from "../Locale.js";
import LocaleData from "../LocaleData.js";
/**
 * Provides calendar-related utilities.
 *
 * @namespace
 * @alias module:sap/ui/core/date/CalendarUtils
 * @public
 * @since 1.108.0
 */
var CalendarUtils = {
  /**
   * Resolves calendar week configuration.
   *
   * Returns an object with the following fields:
   * <ul>
   *   <li><code>firstDayOfWeek</code>: specifies the first day of the week starting with
   *   <code>0</code> (which is Sunday)</li>
   *   <li><code>minimalDaysInFirstWeek</code>: minimal days at the beginning of the year
   *   which define the first calendar week</li>
   * </ul>
   *
   * @param {module:sap/base/i18n/date/CalendarWeekNumbering} [sCalendarWeekNumbering]
   *   The calendar week numbering; if omitted, the calendar week numbering of the configuration
   *   is used; see
   *   {@link module:sap/base/i18n/Formatting.getCalendarWeekNumbering Formatting.getCalendarWeekNumbering}.
   *   If this value is <code>Default</code> the returned calendar week configuration is derived from the given
   *   <code>oLocale</code>.
   * @param {sap.ui.core.Locale} [oLocale]
   *   The locale to use; if no locale is given, a locale for the currently configured language is used; see
   *   {@link module:sap/base/i18n/Formatting.getLanguageTag Formatting.getLanguageTag}.
   *   Is only used when <code>sCalendarWeekNumbering</code> is set to <code>Default</code>.
   * @returns {{firstDayOfWeek: int, minimalDaysInFirstWeek: int}|undefined}
   *   The calendar week configuration, or <code>undefined<code> for an invalid value of
   *   <code>module:sap/base/i18n/date/CalendarWeekNumbering</code>.
   * @public
   * @since 1.108.0
   */
  getWeekConfigurationValues: function (sCalendarWeekNumbering, oLocale) {
    var oLocaleData, oWeekConfigurationValues;
    if (!sCalendarWeekNumbering) {
      return CalendarUtils.getWeekConfigurationValues(Formatting.getCalendarWeekNumbering(), oLocale);
    }
    oWeekConfigurationValues = CalendarWeekNumbering.getWeekConfigurationValues(sCalendarWeekNumbering);
    if (oWeekConfigurationValues) {
      return oWeekConfigurationValues;
    }
    if (sCalendarWeekNumbering === CalendarWeekNumbering.Default) {
      oLocale = oLocale || new Locale(Formatting.getLanguageTag());
      oLocaleData = LocaleData.getInstance(oLocale);
      return {
        firstDayOfWeek: oLocaleData.getFirstDayOfWeek(),
        minimalDaysInFirstWeek: oLocaleData.getMinimalDaysInFirstWeek()
      };
    }
    return undefined;
  }
};
export default CalendarUtils;