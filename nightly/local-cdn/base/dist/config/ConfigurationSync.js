import getSharedResource from "../getSharedResource.js";
import EventProvider from "../EventProvider.js";
const getEventProvider = () => getSharedResource("ConfigChange.eventProvider", new EventProvider());
const getSharedValues = () => getSharedResource("ConfigChange.values", {});
const CONFIG_CHANGE = "configChange";
// Module-level skip flags — each runtime copy has its own Set,
// so a runtime's own handler correctly skips when it fires.
const skipFlags = new Set();
/**
 * Stores value in shared map and fires a cross-runtime config change event.
 * The firing runtime's own handler is skipped via the skip-guard pattern.
 */
const fireConfigChange = (name, value) => {
    getSharedValues()[name] = value;
    skipFlags.add(name);
    try {
        getEventProvider().fireEvent(CONFIG_CHANGE, { name, value });
    }
    finally {
        skipFlags.delete(name);
    }
};
/**
 * Registers a per-setting cross-runtime listener.
 * The handler is only called when another runtime fires the change.
 */
const attachConfigChange = (name, handler) => {
    getEventProvider().attachEvent(CONFIG_CHANGE, (detail) => {
        if (detail.name === name && !skipFlags.has(name)) {
            handler(detail.value);
        }
    });
};
/**
 * Reads the last-set value from the shared values map.
 * Used by late-booting runtimes to pick up values already set by others.
 */
const getSharedValue = (name) => {
    return getSharedValues()[name];
};
export { fireConfigChange, attachConfigChange, getSharedValue };
//# sourceMappingURL=ConfigurationSync.js.map