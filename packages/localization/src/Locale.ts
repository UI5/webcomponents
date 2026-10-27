import type LocaleOpenUI5T from "@ui5/openui5-types/sap/ui/core/Locale";
// @ts-ignore
import LocaleNative from "./sap/ui/core/Locale.js";

const LocaleWrapped = LocaleNative as typeof LocaleOpenUI5T;
class Locale extends LocaleWrapped { }

export default Locale;
