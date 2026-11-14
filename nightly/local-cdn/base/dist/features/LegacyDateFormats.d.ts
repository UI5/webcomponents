import type { FormatSettings } from "../config/FormatSettings.js";
type IslamicToGregorianMapping = {
    dateFormat: string;
    islamicMonthStart: string;
    gregDate: string;
};
type LegacyDateCalendarCustomizing = Array<IslamicToGregorianMapping>;
declare class LegacyDateFormats {
    /**
     * Returns the currently set customizing data for Islamic calendar support
     *
     * @return {object[]} Returns an array that contains the customizing data.
     * @public
     */
    static getLegacyDateCalendarCustomizing(this: void): LegacyDateCalendarCustomizing;
}
export default LegacyDateFormats;
export type { FormatSettings, LegacyDateCalendarCustomizing, };
