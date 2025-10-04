import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_DELETE } from "../generated/i18n/i18n-defaults.js";

const name = "delete";
const pathData = "M454 109q11 0 18.5 7t7.5 18-7.5 18.5T454 160h-19v294q0 24-17 41t-41 17H135q-24 0-41-17t-17-41V160H58q-11 0-18.5-7.5T32 134t7.5-18 18.5-7h70V58q0-24 17-41t41-17h140q24 0 41 17t17 41v51h70zm-275 0h154V58q0-7-7-7H186q-7 0-7 7v51zm205 51H128v294q0 7 7 7h242q7 0 7-7V160zm-186 64q11 0 18.5 7.5T224 250v140q0 11-7.5 18.5T198 416t-18-7.5-7-18.5V250q0-11 7-18.5t18-7.5zm116 0q11 0 18 7.5t7 18.5v140q0 11-7 18.5t-18 7.5-18.5-7.5T288 390V250q0-11 7.5-18.5T314 224z";
const ltr = false;
const accData = ICON_DELETE;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/delete";
export { pathData, ltr, accData };