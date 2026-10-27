import type UIDateT from "@ui5/openui5-types/sap/ui/core/date/UI5Date";
// @ts-ignore
import UI5DateNative from "../sap/ui/core/date/UI5Date.js";

const UI5DateWrapped = UI5DateNative as typeof UIDateT;
class UI5Date extends UI5DateWrapped {}

export default UI5Date;
