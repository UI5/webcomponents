import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "chart-table-view";
const pathData = "M154 51q-11 0-18.5-7T128 26t7.5-18.5T154 0h332q11 0 18.5 7.5T512 26t-7.5 18-18.5 7H154zM26 160q-11 0-18.5-7.5T0 134V26Q0 15 7.5 7.5T26 0t18 7.5T51 26v108q0 11-7 18.5T26 160zm128 0q-11 0-18.5-7.5T128 134t7.5-18 18.5-7h204q11 0 18.5 7t7.5 18-7.5 18.5T358 160H154zm300 96q24 0 41 17t17 41v140q0 24-17 41t-41 17H58q-24 0-41-17T0 454V314q0-24 17-41t41-17h396zm7 58q0-7-7-7h-95v57h102v-50zm-153 50v-57H204v57h104zM58 307q-7 0-7 7v50h102v-57H58zm146 108v46h104v-46H204zM51 454q0 7 7 7h95v-46H51v39zm403 7q7 0 7-7v-39H359v46h95z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/chart-table-view";
export { pathData, ltr, accData };