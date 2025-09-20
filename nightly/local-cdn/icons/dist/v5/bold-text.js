import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bold-text";
const pathData = "M364 244q30 16 49 45.5t19 65.5q0 26-10 48.5T395 443t-39.5 27-48.5 10H106q-11 0-18.5-7.5T80 454V58q0-11 7.5-18.5T106 32h169q26 0 48.5 10T363 69t27 39.5 10 48.5-9.5 48-26.5 39zm-233-14h144q31 0 52.5-21.5T349 157q0-31-21.5-52.5T275 83H131v147zm176 199q31 0 52.5-21.5T381 355q0-30-21.5-51.5T307 282H131v147h176z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/bold-text";
export { pathData, ltr, accData };