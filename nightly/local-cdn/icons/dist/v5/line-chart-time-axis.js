import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "line-chart-time-axis";
const pathData = "M352 320q-33 0-62.5-12.5t-51-34-34-51T192 160t12.5-62.5 34-51 51-34T352 0t62.5 12.5 51 34 34 51T512 160t-12.5 62.5-34 51-51 34T352 320zm0-269q-23 0-43 8.5t-34.5 23-23 34.5-8.5 43 8.5 43 23 34.5 34.5 23 43 8.5 43-8.5 34.5-23 23-34.5 8.5-43-8.5-43-23-34.5-34.5-23-43-8.5zm-10 129q-9-8-9-20v-51q0-11 7-18.5t18-7.5 18.5 7.5T384 109v39l22 18q10 7 10 20 0 10-7.5 17.5T390 211q-8 0-16-5zm144 140q11 0 18.5 7.5T512 346q0 6-3 12l-77 141q-6 13-22 13-10 0-16-6l-85-67-101 39q-6 2-10 2-11 0-19-9l-82-93-58 34q-7 4-13 4-11 0-18.5-7.5T0 390q0-14 13-22l77-45q6-3 12-3 13 0 20 9l84 95 98-38q6-2 10-2 9 0 16 6l72 57 62-114q8-13 22-13z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/line-chart-time-axis";
export { pathData, ltr, accData };