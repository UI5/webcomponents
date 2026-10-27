import type LocaleDataOpenUI5T from "@ui5/openui5-types/sap/ui/core/LocaleData";
// @ts-ignore
import LocaleDataNative from "./sap/ui/core/LocaleData.js";

const LocaleDataWrapped = LocaleDataNative as typeof LocaleDataOpenUI5T;
class LocaleData extends LocaleDataWrapped {}

export default LocaleData;
