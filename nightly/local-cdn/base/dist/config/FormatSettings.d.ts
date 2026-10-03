import LegacyDateFormats from "../features/LegacyDateFormats.js";
import type { LegacyDateCalendarCustomizing } from "../features/LegacyDateFormats.js";
type FormatSettings = {
    firstDayOfWeek?: number;
    legacyDateCalendarCustomizing?: LegacyDateCalendarCustomizing;
};
/**
 * Returns the first day of the week from the configured format settings or based on the current locale.
 * @public
 * @returns {Number} 0 (Sunday) through 6 (Saturday)
 */
declare const getFirstDayOfWeek: () => number | undefined;
declare const getLegacyDateCalendarCustomizing: typeof LegacyDateFormats.getLegacyDateCalendarCustomizing;
export { getFirstDayOfWeek, getLegacyDateCalendarCustomizing, };
export type { FormatSettings };
