import { getTimezone as getConfiguredTimezone } from "../InitialConfiguration.js";
import { attachConfigurationReset } from "./ConfigurationReset.js";
let currTimezone;
attachConfigurationReset(() => {
    currTimezone = undefined;
});
/**
 * Returns the configured IANA timezone ID.
 *
 * @private
 * @returns {string}
 */
const getTimezone = () => {
    if (currTimezone === undefined) {
        currTimezone = getConfiguredTimezone();
    }
    return currTimezone;
};
/**
 * Sets the IANA timezone ID.
 * **For example:** "America/New_York", "Europe/London", "Australia/Sydney", "Asia/Bishkek", etc.
 *>
 * @param {string} timezone
 * @private
 * @returns { Promise<void> }
 */
const setTimezone = (timezone) => {
    if (currTimezone === timezone) {
        return;
    }
    currTimezone = timezone;
};
export { getTimezone, setTimezone, };
//# sourceMappingURL=Timezone.js.map