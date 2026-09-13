import CalendarType from "../types/CalendarType.js";
/**
 * Returns the configured or default calendar type.
 * @public
 * @returns { CalendarType } the effective calendar type
 */
declare const getCalendarType: () => CalendarType;
/**
 * Returns the configured secondary calendar type.
 * @public
 * @returns { CalendarType | undefined } the effective calendar type
 * @since 1.18.0
 */
declare const getSecondaryCalendarType: () => CalendarType | undefined;
export { getCalendarType, getSecondaryCalendarType, };
