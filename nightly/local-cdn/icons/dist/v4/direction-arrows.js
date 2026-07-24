import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "direction-arrows";
const pathData = "M14.863 8.172c.091.091.137.2.137.328 0 .11-.046.21-.137.3l-3.09 3.063a.448.448 0 0 1-.328.137.418.418 0 0 1-.3-.137.418.418 0 0 1-.137-.3V5.436c0-.218.091-.355.273-.41A.38.38 0 0 1 11.445 5c.146 0 .255.036.328.11l3.09 3.062ZM4.691 5.027c.183.055.274.192.274.41v6.125a.44.44 0 0 1-.123.301.404.404 0 0 1-.315.137.418.418 0 0 1-.3-.137l-3.09-3.062A.418.418 0 0 1 1 8.5c0-.128.046-.237.137-.328l3.09-3.063a.406.406 0 0 1 .3-.109.38.38 0 0 1 .164.027Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/direction-arrows";
export { pathData, ltr, viewBox, accData };