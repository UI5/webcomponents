import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "use-case-extension-point";
const pathData = "M256 448q46 0 87-12.5t71.5-34.5 48-51 17.5-62q0-15-5-32H37q-5 17-5 32 0 33 17.5 62t48 51 71.5 34.5 87 12.5zm0-320q-69 0-124 26.5T51 224h410q-26-43-81-69.5T256 128zm-96 192q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9zm96-224q53 0 99.5 15t81.5 41 55 61 20 75-20 75-55 61-81.5 41-99.5 15-99.5-15T75 424t-55-61-20-75 20-75 55-61 81.5-41T256 96zm0 224q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9zm96 0q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/use-case-extension-point";
export { pathData, ltr, accData };