import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "attachment-html";
const pathData = "M400 198q0 11-7.5 18.5T374 224t-18-7.5-7-18.5V51H196l-20 24v66q0 21-15 36t-36 15H75l-8 9v260h83q11 0 18.5 7t7.5 18-7.5 18.5T150 512H42q-11 0-18.5-7.5T16 486V192q0-10 6-17L165 9q6-9 19-9h190q11 0 18.5 7.5T400 26v172zm88 183q8 8 8 19t-8 19l-58 54q-7 7-17 7-11 0-18.5-7.5T387 454q0-10 8-18l38-36-38-36q-8-8-8-18 0-11 7.5-18.5T413 320q10 0 17 7zm-197-61q11 0 18.5 7.5T317 346q0 10-8 18l-38 36 38 36q8 8 8 18 0 11-7.5 18.5T291 480q-10 0-17-7l-58-54q-8-8-8-19t8-19l58-54q7-7 17-7z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/attachment-html";
export { pathData, ltr, accData };