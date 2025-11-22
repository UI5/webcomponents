import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "cancel";
const pathData = "M256 0q53 0 100 20t81.5 54.5T492 156t20 100-20 100-54.5 81.5T356 492t-100 20-100-20-81.5-54.5T20 356 0 256t20-100 54.5-81.5T156 20 256 0zm162 382q43-55 43-126 0-43-16-80.5t-43.5-65-65-43.5T256 51q-71 0-126 43zM51 256q0 43 16 80t44 65 65 44 80 16q71 0 126-43L94 130q-43 55-43 126z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/cancel";
export { pathData, ltr, accData };