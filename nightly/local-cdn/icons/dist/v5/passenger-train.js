import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "passenger-train";
const pathData = "M480 294q0 37-19 66.5T410 404l63 65q7 7 7 17 0 11-7.5 18.5T454 512q-10 0-18-8l-85-88H161l-85 88q-8 8-18 8-11 0-18.5-7.5T32 486q0-10 7-17l62-65q-31-14-50-43.5T32 294V122q0-26 9.5-48t26-38.5 39-26T154 0h204q25 0 47.5 9.5t39 26 26 38.5 9.5 48v172zM154 51q-29 0-50 21t-21 50v6h346v-6q0-29-21-50t-50-21H154zm204 314q29 0 50-21t21-50V179H83v115q0 29 21 50t50 21h204zM256 224q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/passenger-train";
export { pathData, ltr, accData };