import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "aggregator";
const pathData = "M102 230H51v51h51v-51zm0 179H51v51h51v-51zm0-358H51v51h51V51zm26 307q11 0 18.5 7.5T154 384v25h51V281h-51v26q0 11-7.5 18t-18.5 7H26q-11 0-18.5-7T0 307V205q0-11 7.5-18.5T26 179h102q11 0 18.5 7.5T154 205v25h51V102h-51v26q0 11-7.5 18t-18.5 7H26q-11 0-18.5-7T0 128V26Q0 15 7.5 7.5T26 0h102q11 0 18.5 7.5T154 26v25h51q21 0 36 15t15 36v128h77v-51q0-21 15-36t36-15h77q21 0 36 15t15 36v153q0 21-15 36.5T461 384h-77q-21 0-36-15.5T333 332v-51h-77v128q0 21-15 36t-36 15h-51v26q0 11-7.5 18t-18.5 7H26q-11 0-18.5-7T0 486V384q0-11 7.5-18.5T26 358h102z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/aggregator";
export { pathData, ltr, accData };