import { getNoConflict as getConfiguredNoConflict } from "../InitialConfiguration.js";
import { attachConfigurationReset } from "./ConfigurationReset.js";
// Fire these events even with noConflict: true
const excludeList = [
    "value-changed",
    "click",
];
let noConflict;
attachConfigurationReset(() => {
    noConflict = undefined;
});
const shouldFireOriginalEvent = (eventName) => {
    return excludeList.includes(eventName);
};
const shouldNotFireOriginalEvent = (eventName) => {
    const nc = getNoConflict();
    // return !(nc.events && nc.events.includes && nc.events.includes(eventName));
    return !(typeof nc !== "boolean" && nc.events && nc.events.includes && nc.events.includes(eventName));
};
/**
 * Returns if the "noConflict" configuration is set.
 * @public
 * @returns { NoConflictData }
 */
const getNoConflict = () => {
    if (noConflict === undefined) {
        noConflict = getConfiguredNoConflict();
    }
    return noConflict;
};
/**
 * Sets the "noConflict" mode.
 * - When "false" (default value), all custom events are fired with and without the "ui5-" prefix.
 * - When "true", all custom events are fired with the "ui5-" prefix only.
 * - When an object is supplied, just the specified events will be fired with the "ui5-" prefix.
 * @public
 * @param { NoConflictData } noConflictData
 */
const setNoConflict = (noConflictData) => {
    noConflict = noConflictData;
};
const skipOriginalEvent = (eventName) => {
    const nc = getNoConflict();
    // Always fire these events
    if (shouldFireOriginalEvent(eventName)) {
        return false;
    }
    // Read from the configuration
    if (nc === true) {
        return true;
    }
    return !shouldNotFireOriginalEvent(eventName);
};
export { getNoConflict, setNoConflict, skipOriginalEvent, };
//# sourceMappingURL=NoConflict.js.map