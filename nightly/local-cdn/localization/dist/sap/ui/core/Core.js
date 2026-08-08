import FormatSettings from "./FormatSettings.js";
import Configuration from "./Configuration.js";
const emptyFn = () => { };
/**
 * OpenUI5 Core shim
 */
const Core = {
    getConfiguration: () => Configuration,
    getLibraryResourceBundle: emptyFn(),
    getFormatSettings: () => FormatSettings,
};
export default Core;
//# sourceMappingURL=Core.js.map