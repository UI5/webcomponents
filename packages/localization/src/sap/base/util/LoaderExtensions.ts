import { getLocaleData, getEffectiveLocaleId, _loadCldrOnce } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";

const loadResource = (moduleName: string) => {
	const moduleFormat = moduleName.match(/sap\/ui\/core\/cldr\/(\w+)\.json/);
	if (!moduleFormat) {
		throw new Error(`Unknown module "${moduleName}"`);
	}

	// OpenUI5's loadData builds locale IDs as "<language>_<region>" which can produce
	// trailing underscores (e.g. "bg_" for Bulgarian with no region). Strip the trailing
	// underscore so the ID matches what fetchCldr stores in localeDataMap (e.g. "bg").
	const localeId = moduleFormat[1].replace(/_$/, "");

	// If the data is already in localeDataMap (fetchCldr resolved), return it synchronously
	// so SyncPromise resolves immediately and mData is set in the LocaleData constructor.
	// If fetchCldr is still in-flight, return its in-progress Promise so SyncPromise can
	// resolve asynchronously — instead of throwing and leaving mData permanently unset.
	try {
		return getLocaleData(localeId);
	} catch {
		return _loadCldrOnce(getEffectiveLocaleId(localeId));
	}
};

const LoaderExtensions = {
	loadResource,
};

export default LoaderExtensions;
