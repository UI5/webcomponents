import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "heading1";
const pathData = "M0 12.5v-10c0-.333.167-.5.5-.5h.25c.333 0 .5.167.5.5V7h5.5V2.5c0-.333.167-.5.5-.5h.25c.333 0 .5.167.5.5v10c0 .333-.167.5-.5.5h-.25c-.333 0-.5-.167-.5-.5V8h-5.5v4.5c0 .333-.167.5-.5.5H.5c-.333 0-.5-.167-.5-.5Zm11-4.156L13 7h1v7h2v1h-5v-1h1.75V8.312L11 9.5V8.344Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/heading1";
export { pathData, ltr, viewBox, accData };