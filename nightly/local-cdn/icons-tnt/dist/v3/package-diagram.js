import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "package-diagram";
const pathData = "M461 435h-26v25h26v-25zM256 188q0-3-1-4.5t-1-2.5l-56 1q-19 0-34-12l-19-17H52q1 1 0 2.5t-1 4.5v166q0 6 3 6h200q1-1 1-2 1-1 1-4V188zM435 77h26V51h-26v26zm0 191h26v-25h-26v25zm-117-38h66v-13q0-11 7.5-18t18.5-7h77q11 0 18 7t7 18v77q0 11-7 18.5t-18 7.5h-77q-11 0-18.5-7.5T384 294v-13h-66l102 103h67q11 0 18 7t7 18v77q0 11-7 18t-18 7h-77q-11 0-18.5-7t-7.5-18v-66l-79-79q-5 18-18.5 30.5T255 384H52q-21 0-36.5-17T0 326V160q0-24 15.5-41T52 102h113l33 29h57q17 0 30.5 11.5T304 171l80-80V26q0-11 7.5-18.5T410 0h77q11 0 18 7.5t7 18.5v76q0 11-7 18.5t-18 7.5h-67z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/package-diagram";
export { pathData, ltr, accData };