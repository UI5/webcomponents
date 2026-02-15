import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "build-apps";
const pathData = "M173 128q13-23 35-37t49-14q26 0 48 14t36 37l110 192q10 18 10 37 0 10-5.5 30.5T423 425q-18 10-38 10-10 0-30.5-5.5T318 396l-26-45q-7-12-7-30 0-6 1-12l11-58v-2q0-5-3.5-6.5T288 241q-4 0-7 5l-86 150q-16 28-36.5 33.5T128 435q-20 0-38-10-27-17-32.5-37T52 357q0-19 10-37z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/build-apps";
export { pathData, ltr, accData };