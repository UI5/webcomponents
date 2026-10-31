/**
 * Returns the configured IANA timezone ID.
 *
 * @private
 * @returns {string}
 */
declare const getTimezone: () => string | undefined;
/**
 * Sets the IANA timezone ID.
 * **For example:** "America/New_York", "Europe/London", "Australia/Sydney", "Asia/Bishkek", etc.
 *>
 * @param {string} timezone
 * @private
 * @returns { Promise<void> }
 */
declare const setTimezone: (timezone: string) => void;
export { getTimezone, setTimezone, };
