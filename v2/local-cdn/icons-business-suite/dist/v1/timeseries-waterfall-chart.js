import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "timeseries-waterfall-chart";
const pathData = "M418 192c-56 0-98-42-98-95 0-59 42-97 98-97 53 0 94 38 94 97 0 55-41 95-94 95zM32 432V0h64v432H32zM366 45c-15 13-22 30-22 52 0 37 35 71 72 71 39 0 73-34 73-71 0-41-34-73-73-73-19 0-36 7-50 21zM0 512v-32h512v32H0zm160-352V0h64v160h-64zm256 112h64v160h-64V272zm-64 64h-64V192h64v144zm41-220V56h24v36h48v24h-72z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/timeseries-waterfall-chart";
export { pathData, ltr, accData };