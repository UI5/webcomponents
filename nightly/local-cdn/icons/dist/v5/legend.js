import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "legend";
const pathData = "M422 0q24 0 41 17t17 41v396q0 24-17 41t-41 17H90q-24 0-41-17t-17-41V58q0-24 17-41T90 0h332zm7 58q0-7-7-7H90q-7 0-7 7v396q0 7 7 7h332q7 0 7-7V58zM168 97q16 0 28 11.5t12 28.5q0 16-12 28t-28 12-28-12-12-28q0-17 12-28.5T168 97zm190 12q11 0 18.5 7t7.5 18-7.5 18.5T358 160h-76q-11 0-18.5-7.5T256 134t7.5-18 18.5-7h76zM168 216q16 0 28 12t12 28q0 17-12 28.5T168 296t-28-11.5-12-28.5q0-16 12-28t28-12zm190 8q11 0 18.5 7.5T384 250t-7.5 18-18.5 7h-76q-11 0-18.5-7t-7.5-18 7.5-18.5T282 224h76zM168 336q16 0 28 12t12 28-12 28-28 12-28-12-12-28 12-28 28-12zm190 16q11 0 18.5 7.5T384 378t-7.5 18-18.5 7h-76q-11 0-18.5-7t-7.5-18 7.5-18.5T282 352h76z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/legend";
export { pathData, ltr, accData };