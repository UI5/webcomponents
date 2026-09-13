import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "underline-text";
const pathData = "M4 1h1v6.5c0 .688.245 1.276.734 1.766.49.49 1.079.734 1.766.734h1c.708 0 1.302-.245 1.781-.734.48-.49.719-1.079.719-1.766V1h1v6.5c0 .48-.094.932-.281 1.36a3.598 3.598 0 0 1-.75 1.109 3.597 3.597 0 0 1-1.11.75c-.427.187-.88.281-1.359.281h-1c-.48 0-.932-.094-1.36-.281a3.597 3.597 0 0 1-1.109-.75 3.594 3.594 0 0 1-.75-1.11A3.344 3.344 0 0 1 4 7.5V1ZM2.5 14h11c.125 0 .24.052.344.156A.478.478 0 0 1 14 14.5c0 .333-.167.5-.5.5h-11c-.333 0-.5-.167-.5-.5 0-.333.167-.5.5-.5Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/underline-text";
export { pathData, ltr, viewBox, accData };