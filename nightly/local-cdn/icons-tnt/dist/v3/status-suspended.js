import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "status-suspended";
const pathData = "M218 165q0-16-11-27t-27-11-27.5 11-11.5 27v179q0 17 11.5 28t27.5 11 27-11 11-28V165zm141 0q0-16-11.5-27T320 127t-27 11-11 27v179q0 17 11 28t27 11 27.5-11 11.5-28V165zM461-1q21 0 36 15t15 36v410q0 21-15 36t-36 15H51q-21 0-36-15T0 460V50q0-21 15-36T51-1h410z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/status-suspended";
export { pathData, ltr, accData };