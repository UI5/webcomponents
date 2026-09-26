import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "thumb-down";
const pathData = "M14.25 0C15.223 0 16 .8 16 1.762v6.476C16 9.201 15.223 10 14.25 10h-2.883l-2.104 5.518a.75.75 0 0 1-.701.482 2.508 2.508 0 0 1-2.513-2.51v-2.46H2.768A2.774 2.774 0 0 1 .072 7.633l1.355-5.735A2.769 2.769 0 0 1 4.057 0H14.25ZM4.058 1.5a1.27 1.27 0 0 0-1.206.866L1.533 7.975a1.271 1.271 0 0 0 1.235 1.554h4.031a.75.75 0 0 1 .75.75v3.21c0 .39.218.726.54.895l2.06-5.402a.75.75 0 0 1 .7-.482h.651v-7H4.058ZM13 8.5h1.25a.26.26 0 0 0 .25-.262V1.762a.26.26 0 0 0-.25-.262H13v7Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/thumb-down";
export { pathData, ltr, viewBox, accData };