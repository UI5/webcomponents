import CalendarType from "../types/CalendarType.js";
import { getCalendarType as getConfiguredCalendarType, getSecondaryCalendarType as getConfiguredSecondaryCalendarType, } from "../InitialConfiguration.js";
import { attachConfigurationReset } from "./ConfigurationReset.js";
let calendarType;
let secondaryCalendarType;
attachConfigurationReset(() => {
    calendarType = undefined;
    secondaryCalendarType = undefined;
});
/**
 * Returns the configured or default calendar type.
 * @public
 * @returns { CalendarType } the effective calendar type
 */
const getCalendarType = () => {
    if (calendarType === undefined) {
        calendarType = getConfiguredCalendarType();
    }
    if (calendarType && calendarType in CalendarType) {
        return calendarType;
    }
    return CalendarType.Gregorian;
};
/**
 * Returns the configured secondary calendar type.
 * @public
 * @returns { CalendarType | undefined } the effective calendar type
 * @since 1.18.0
 */
const getSecondaryCalendarType = () => {
    if (secondaryCalendarType === undefined) {
        secondaryCalendarType = getConfiguredSecondaryCalendarType();
    }
    if (secondaryCalendarType && secondaryCalendarType in CalendarType) {
        return secondaryCalendarType;
    }
    return secondaryCalendarType;
};
export { getCalendarType, getSecondaryCalendarType, };
//# sourceMappingURL=CalendarType.js.map