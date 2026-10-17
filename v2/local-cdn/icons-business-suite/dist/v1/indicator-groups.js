import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "indicator-groups";
const pathData = "M7.5 96l96-96h288v118h-32V32h-224v96h-96v352h352v32H7.5V96zm195 308c-20 0-21-34-21-55 0-107 74-172 162-172 25 0 87 13 101 34l-30 23c-22-12-46-20-71-20-76 0-125 51-125 131 0 12 3 27 3 42 0 9-8 17-19 17zm143-17c-20 0-38-18-38-37 0-8 4-16 11-23l145-99-94 149c-7 7-15 10-24 10zm122-42c0-27-3-46-10-59l23-32c18 18 24 64 24 89v4c0 16-1 57-22 57-9 0-18-6-18-17 0-15 3-30 3-42zm-141 6c0 7 6 17 17 17s17-10 17-17c0-11-6-17-17-17s-17 6-17 17z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/indicator-groups";
export { pathData, ltr, accData };