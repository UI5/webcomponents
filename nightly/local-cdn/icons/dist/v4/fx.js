import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "fx";
const pathData = "M32 480l125-288h-30l10-32h33l27-62q13-29 32-47.5T281 32h39l-10 32h-27q-15 0-25 10-11 7-19 27l-26 59h102l44 92 76-92h45L379 278l54 106h-40l-41-84-70 83h-45l95-110-41-81h-92L72 480H32z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/fx";
export { pathData, ltr, accData };