import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "splitter";
const pathData = "M410 281h51v-51h-51v51zm0 179h51v-51h-51v51zm0-358h51V51h-51v51zm-26 51q-11 0-18-7t-7-18v-26h-52v128h52v-25q0-11 7-18.5t18-7.5h103q11 0 18 7.5t7 18.5v102q0 11-7 18t-18 7H384q-11 0-18-7t-7-18v-26h-52v128h52v-25q0-11 7-18.5t18-7.5h103q11 0 18 7.5t7 18.5v102q0 11-7 18t-18 7H384q-11 0-18-7t-7-18v-26h-52q-21 0-36-15t-15-36V281h-77v51q0 21-14.5 36.5T128 384H51q-21 0-36-15.5T0 332V179q0-21 15-36t36-15h77q22 0 36.5 15t14.5 36v51h77V102q0-21 15-36t36-15h52V26q0-11 7-18.5T384 0h103q11 0 18 7.5t7 18.5v102q0 11-7 18t-18 7H384z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/splitter";
export { pathData, ltr, accData };