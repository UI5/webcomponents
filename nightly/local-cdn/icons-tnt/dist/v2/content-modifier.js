import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "content-modifier";
const pathData = "M64 95l160 160L384 95H64zm369 198l-17-17-143 141 18 17zm49-49l-17-17-32 31 18 18zM224 415H32q-13 0-22.5-9.5T0 383V95q0-13 9-22.5T32 63h384q14 0 23 9t9 23v64h-32v-48L224 287 32 111v256l109-112 19 18L48 383h176v32zm284-180q4 4 4 9 0 4-4 8L305 455l-7 1q-7 2-18.5 5.5t-26 8.5-29.5 10q4-11 8.5-24t9.5-25l10-28 204-203q4-3 9-3 3 0 8 3z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/content-modifier";
export { pathData, ltr, accData };