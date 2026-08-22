import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "thumb-up";
const pathData = "M1.75 16C.778 16 0 15.2 0 14.238V7.762C0 6.799.778 6 1.75 6h2.884L6.737.482A.75.75 0 0 1 7.438 0c1.39 0 2.513 1.12 2.513 2.51v2.46h3.281c1.786.001 3.096 1.671 2.696 3.396l-1.355 5.735A2.77 2.77 0 0 1 11.943 16H1.75Zm10.192-1.5a1.27 1.27 0 0 0 1.207-.866l1.318-5.609a1.272 1.272 0 0 0-1.235-1.554h-4.03a.75.75 0 0 1-.75-.75V2.51c0-.39-.219-.726-.54-.895l-2.06 5.402a.75.75 0 0 1-.702.482H4.5v7h7.442ZM3 7.5H1.75a.26.26 0 0 0-.25.262v6.476c0 .15.123.262.25.262H3v-7Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/thumb-up";
export { pathData, ltr, viewBox, accData };