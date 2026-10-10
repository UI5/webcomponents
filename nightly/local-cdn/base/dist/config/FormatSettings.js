import LegacyDateFormats from "../features/LegacyDateFormats.js";
import { getFormatSettings } from "../InitialConfiguration.js";
import { getFeature } from "../FeaturesRegistry.js";
import { attachConfigurationReset } from "./ConfigurationReset.js";
let formatSettings;
attachConfigurationReset(() => {
    formatSettings = undefined;
});
/**
 * Returns the first day of the week from the configured format settings or based on the current locale.
 * @public
 * @returns {Number} 0 (Sunday) through 6 (Saturday)
 */
const getFirstDayOfWeek = () => {
    if (formatSettings === undefined) {
        formatSettings = getFormatSettings();
    }
    return formatSettings.firstDayOfWeek;
};
const legacyDateFormats = getFeature("LegacyDateFormats");
const getLegacyDateCalendarCustomizing = legacyDateFormats ? LegacyDateFormats.getLegacyDateCalendarCustomizing : () => { return []; };
export { getFirstDayOfWeek, getLegacyDateCalendarCustomizing, };
//# sourceMappingURL=FormatSettings.js.map