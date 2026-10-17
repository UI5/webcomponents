import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "ingredients";
const pathData = "M512 128H2c0-64 22-96 94-96h96c7 0 2-32 32-32h64c30 0 25 32 33 32h95c72 0 96 32 96 96zM2 416V176h510v240c0 53-32 96-96 96H96c-64 0-94-43-94-96zm46-144c0 37 27 64 64 64 35 0 64-27 64-64 0-35-29-64-64-64-37 0-64 29-64 64zm328 64c31 0 56-24 56-56 0-31-25-56-56-56-32 0-56 25-56 56 0 32 24 56 56 56zM256 464c35 0 64-27 64-64 0-35-29-64-64-64-37 0-64 29-64 64 0 37 27 64 64 64z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/ingredients";
export { pathData, ltr, accData };