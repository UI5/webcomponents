/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
// Provides type sap.ui.core.date.CalendarWeekNumbering.
import DataType from "../../base/DataType.js";
import CalendarWeekNumbering from "../../../base/i18n/date/CalendarWeekNumbering.js";
/**
 * The <code>CalendarWeekNumbering</code> enum defines how to calculate calendar weeks. Each
 * value defines:
 * <ul>
 * <li>The first day of the week,</li>
 * <li>the first week of the year.</li>
 * </ul>
 *
 * @enum {string}
 * @public
 * @since 1.108.0
 * @deprecated As of Version 1.120. Please use {@link module:sap/base/18n/date/CalendarWeekNumbering} instead.
 * @name sap.ui.core.date.CalendarWeekNumbering
 * @borrows module:sap/base/i18n/date/CalendarWeekNumbering.Default as Default
 * @borrows module:sap/base/i18n/date/CalendarWeekNumbering.ISO_8601 as ISO_8601
 * @borrows module:sap/base/i18n/date/CalendarWeekNumbering.MiddleEastern as MiddleEastern
 * @borrows module:sap/base/i18n/date/CalendarWeekNumbering.WesternTraditional as WesternTraditional
 * @borrows module:sap/base/i18n/date/CalendarWeekNumbering.getWeekConfigurationValues as getWeekConfigurationValues
 */

DataType.registerEnum("sap.ui.core.date.CalendarWeekNumbering", CalendarWeekNumbering);
export default CalendarWeekNumbering;