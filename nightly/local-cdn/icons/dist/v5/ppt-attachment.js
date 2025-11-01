import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "ppt-attachment";
const pathData = "M374 461q11 0 18.5 7t7.5 18-7.5 18.5T374 512H42q-11 0-18.5-7.5T16 486V192q0-10 6-17L165 9q6-9 19-9h190q11 0 18.5 7.5T400 26v76q0 11-7.5 18.5T374 128t-18-7.5-7-18.5V51H196l-20 24v66q0 21-15 36t-36 15H75l-8 9v260h307zm96-269q11 0 18.5 7.5T496 218v172q0 11-7.5 18.5T470 416H234q-11 0-18.5-7.5T208 390V218q0-11 7.5-18.5T234 192h236zm-25 51H259v122h186V243z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/ppt-attachment";
export { pathData, ltr, accData };