import { getFormatSettings } from "../InitialConfiguration.js";
import { registerFeature } from "../FeaturesRegistry.js";
let formatSettings;
class LegacyDateFormats {
    /**
     * Returns the currently set customizing data for Islamic calendar support
     *
     * @return {object[]} Returns an array that contains the customizing data.
     * @public
     */
    static getLegacyDateCalendarCustomizing() {
        if (formatSettings === undefined) {
            formatSettings = getFormatSettings();
        }
        return formatSettings.legacyDateCalendarCustomizing || [];
    }
}
registerFeature("LegacyDateFormats", LegacyDateFormats);
export default LegacyDateFormats;
//# sourceMappingURL=LegacyDateFormats.js.map