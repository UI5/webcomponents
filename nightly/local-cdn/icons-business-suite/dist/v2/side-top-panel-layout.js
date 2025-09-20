import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "side-top-panel-layout";
const pathData = "M88 480c-40 0-72-32-72-72V72C16 32 48 0 88 0h336c40 0 72 32 72 72v336c0 40-32 72-72 72H88zm96-312v264h240c13 0 24-11 24-24V168H184zM64 72v336c0 13 11 24 24 24h48V48H88c-13 0-24 11-24 24zm120 48h264V72c0-13-11-24-24-24H184v72z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/side-top-panel-layout";
export { pathData, ltr, accData };