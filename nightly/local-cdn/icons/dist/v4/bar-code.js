import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bar-code";
const pathData = "M224 128h64v256h-64V128zm-160 0h64v256H64V128zm96 0h32v256h-32V128zm224 0h64v256h-64V128zm-32 256h-32V128h32v256zM464 32q20 0 34 14t14 34v112h-32V80q0-16-16-16H352V32h112zm16 288h32v112q0 20-14 34t-34 14H352v-32h112q16 0 16-16V320zM32 192H0V80q0-20 14-34t34-14h112v32H48q-16 0-16 16v112zm0 240q0 16 16 16h112v32H48q-20 0-34-14T0 432V320h32v112z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/bar-code";
export { pathData, ltr, accData };