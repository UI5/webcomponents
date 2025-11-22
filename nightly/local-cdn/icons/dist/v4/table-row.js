import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "table-row";
const pathData = "M32 448V64q0-14 9.5-23T64 32h384q14 0 23 9t9 23v384q0 14-9 23t-23 9H64q-13 0-22.5-9T32 448zM200 64v107h112V64H200zm0 280v104h112V344H200zm248-173V64H344v107h104zm-384 0h104V64H64v107zm280 277h104V344H344v104zm-176 0V344H64v104h104z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/table-row";
export { pathData, ltr, accData };