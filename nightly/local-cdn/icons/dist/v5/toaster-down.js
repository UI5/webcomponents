import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "toaster-down";
const pathData = "M8 8a.75.75 0 0 1 .75.75v4.545l.942-1.047a.75.75 0 0 1 1.116 1.004l-2.25 2.5a.758.758 0 0 1-1.116 0l-2.25-2.5a.75.75 0 0 1 1.116-1.004l.942 1.047V8.75A.75.75 0 0 1 8 8Zm7.25-8a.75.75 0 0 1 .75.75l-.004.577A.75.75 0 0 1 15.25 2H15v7.266A2.734 2.734 0 0 1 12.266 12h-.016a.75.75 0 0 1 0-1.5h.016c.681 0 1.234-.553 1.234-1.234V2h-11v7.434c0 .589.477 1.066 1.066 1.066.415 0 .934.182.934.75 0 .54-.52.75-.934.75A2.566 2.566 0 0 1 1 9.434V2H.75A.75.75 0 0 1 0 1.25v-.5A.75.75 0 0 1 .75 0h14.5Zm-4 4a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h6.5Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/toaster-down";
export { pathData, ltr, viewBox, accData };