import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_GROUP_2 } from "../generated/i18n/i18n-defaults.js";

const name = "group-2";
const pathData = "M13 2h2c.292 0 .531.094.719.281A.973.973 0 0 1 16 3v10c0 .27-.094.505-.281.703A.947.947 0 0 1 15 14h-2v-1h2V3h-2V2ZM0 13V3c0-.292.099-.531.297-.719A.988.988 0 0 1 1 2h2v1H1v10h2v1H1a.961.961 0 0 1-.703-.297A.961.961 0 0 1 0 13Zm4.5-3h7c.333 0 .5.167.5.5 0 .125-.047.24-.14.344a.462.462 0 0 1-.36.156h-7a.478.478 0 0 1-.344-.156A.478.478 0 0 1 4 10.5c0-.146.052-.266.156-.36A.503.503 0 0 1 4.5 10Zm0-3h7c.333 0 .5.167.5.5 0 .125-.047.24-.14.344A.462.462 0 0 1 11.5 8h-7a.478.478 0 0 1-.344-.156A.478.478 0 0 1 4 7.5c0-.146.052-.266.156-.36A.503.503 0 0 1 4.5 7ZM4 4.5c0-.146.052-.266.156-.36A.503.503 0 0 1 4.5 4h7c.333 0 .5.167.5.5 0 .125-.047.24-.14.344A.462.462 0 0 1 11.5 5h-7a.478.478 0 0 1-.344-.156A.478.478 0 0 1 4 4.5Z";
const ltr = false;
const accData = ICON_GROUP_2;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v4/group-2";
export { pathData, ltr, viewBox, accData };