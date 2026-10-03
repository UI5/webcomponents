import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "eraser";
const pathData = "M4.143 13.929H15V15H2.84a.496.496 0 0 1-.368-.134l-2.305-2.31a.53.53 0 0 1 0-.77L11.057.904c.09-.09.18-.134.268-.134L15 0l-.735 3.683a.373.373 0 0 1-.033.167.523.523 0 0 1-.1.134l-9.99 9.945Zm.1-4.688 1.537 1.507 7.45-7.433h.033l-1.537-1.54L4.243 9.24Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/eraser";
export { pathData, ltr, viewBox, accData };