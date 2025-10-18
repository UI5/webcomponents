import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "ingredients";
const pathData = "M15.5 121c0-15 9-24 24-24h48V73c0-40 32-72 72-72h195c40 0 72 32 72 72v24h47c15 0 24 9 24 24s-8 24-23 24v263c0 40-32 72-72 72h-291c-40 0-72-32-72-72V145c-15 0-24-9-24-24zm72 287c0 13 11 24 24 24h291c13 0 24-11 24-24V145h-339v263zm72-359c-13 0-24 11-24 24v24h243V73c0-13-11-24-24-24h-195zm37 315c0-27 21-48 48-48s48 21 48 48-21 48-48 48-48-21-48-48zm165-53c-27 0-48-21-48-48s21-48 48-48 48 21 48 48-21 48-48 48zm-243-101c0-27 21-48 48-48s48 21 48 48-21 48-48 48-48-21-48-48z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/ingredients";
export { pathData, ltr, accData };