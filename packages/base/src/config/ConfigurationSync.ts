import getSharedResource from "../getSharedResource.js";
import EventProvider from "../EventProvider.js";

type ConfigChangeDetail = { name: string; value: unknown };

const getEventProvider = () => getSharedResource("ConfigChange.eventProvider", new EventProvider<ConfigChangeDetail, void>());
const getSharedValues = () => getSharedResource<Record<string, unknown>>("ConfigChange.values", {});

const CONFIG_CHANGE = "configChange";

// Module-level skip flags — each runtime copy has its own Set,
// so a runtime's own handler correctly skips when it fires.
const skipFlags = new Set<string>();

/**
 * Stores value in shared map and fires a cross-runtime config change event.
 * The firing runtime's own handler is skipped via the skip-guard pattern.
 */
const fireConfigChange = (name: string, value: unknown): void => {
	getSharedValues()[name] = value;

	skipFlags.add(name);
	try {
		getEventProvider().fireEvent(CONFIG_CHANGE, { name, value });
	} finally {
		skipFlags.delete(name);
	}
};

/**
 * Registers a per-setting cross-runtime listener.
 * The handler is only called when another runtime fires the change.
 */
const attachConfigChange = (name: string, handler: (value: any) => void): void => { // eslint-disable-line
	getEventProvider().attachEvent(CONFIG_CHANGE, (detail: ConfigChangeDetail) => {
		if (detail.name === name && !skipFlags.has(name)) {
			handler(detail.value);
		}
	});
};

/**
 * Reads the last-set value from the shared values map.
 * Used by late-booting runtimes to pick up values already set by others.
 */
const getSharedValue = <T>(name: string): T | undefined => {
	return getSharedValues()[name] as T | undefined;
};

export { fireConfigChange, attachConfigChange, getSharedValue };
