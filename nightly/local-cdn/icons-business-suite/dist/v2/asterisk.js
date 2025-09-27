import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "asterisk";
const pathData = "M63.74 382c-8-11-6-25 5-33l149-108-149-107c-11-8-13-23-5-34 5-7 12-10 19-10 5 0 10 2 14 5l137 99V26c0-15 9-25 24-25 13 0 24 10 24 25v168l136-99c5-3 10-5 16-5 7 0 13 3 18 9 8 11 5 25-6 33l-147 109 147 107c11 8 14 22 6 33-5 6-12 9-19 9s-12-1-15-4l-136-98v168c0 13-11 24-24 24-15 0-24-11-24-24V288l-137 98c-5 4-10 6-13 6-9 0-16-3-20-10z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/asterisk";
export { pathData, ltr, accData };