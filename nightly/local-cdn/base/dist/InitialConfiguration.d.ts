import type { FormatSettings } from "./config/FormatSettings.js";
import AnimationMode from "./types/AnimationMode.js";
import type CalendarType from "./types/CalendarType.js";
declare const getAnimationMode: () => AnimationMode;
declare const getTheme: () => string;
declare const getThemeRoot: () => string | undefined;
declare const getLanguage: () => string | undefined;
/**
 * Returns if the default language, that is inlined at build time,
 * should be fetched over the network instead.
 * @returns {Boolean}
 */
declare const getFetchDefaultLanguage: () => boolean;
declare const getNoConflict: () => boolean;
declare const getDefaultFontLoading: () => boolean;
declare const getEnableDefaultTooltips: () => boolean;
/**
 * Get the configured calendar type
 * @returns { String } the name of the configured calendar type
 */
declare const getCalendarType: () => CalendarType | undefined;
declare const getSecondaryCalendarType: () => CalendarType | undefined;
/**
 * Returns the configured IANA timezone ID.
 * @returns { String } the configured IANA timezone ID, e.g. "America/New_York"
 */
declare const getTimezone: () => string | undefined;
declare const getFormatSettings: () => FormatSettings;
/**
 * Internaly exposed method to enable configurations in tests.
 * @private
 */
declare const resetConfiguration: (testEnv?: boolean) => void;
export { getAnimationMode, getTheme, getThemeRoot, getLanguage, getFetchDefaultLanguage, getNoConflict, getCalendarType, getSecondaryCalendarType, getTimezone, getFormatSettings, getDefaultFontLoading, resetConfiguration, getEnableDefaultTooltips, };
