import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "taxi";
const pathData = "M512 486q0 11-7.5 18.5T486 512h-28q-11 0-18.5-7.5T432 486v-25H80v25q0 11-7.5 18.5T54 512H26q-11 0-18.5-7.5T0 486V230q0-4 2-8l35-99q10-26 33-42.5T122 64h38V26q0-11 7.5-18.5T186 0h140q11 0 18.5 7.5T352 26v38h34q27 0 49.5 15t33.5 41l41 101q2 6 2 10v255zM122 115q-12 0-22 7t-14 18l-24 65h386l-27-66q-5-11-14-17.5t-21-6.5H122zM51 410h410V256H51v154zm66-122q17 0 30 13t13 30-13 30-30 13-30-13-13-30 13-30 30-13zm278 0q17 0 30 13t13 30-13 30-30 13-30-13-13-30 13-30 30-13z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/taxi";
export { pathData, ltr, accData };