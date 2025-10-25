import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_SORT } from "../generated/i18n/i18n-defaults.js";

const name = "sort";
const pathData = "M405.022 498.566q-9.951 9.951-22.888 9.951t-21.893-9.951l-101.504-100.51q-11.942-11.941 0-22.888 4.975-4.976 10.946-4.976t10.947 4.976l84.587 84.587v-317.45q0-15.922 15.922-15.922t15.922 15.922v319.44l86.577-86.577q10.947-10.946 22.889 0 10.946 10.947 0 22.888zM253.761 110.46q10.946 11.941 0 22.888-4.976 4.976-11.444 4.976t-11.444-4.976l-86.578-86.577v319.44q0 15.922-15.922 15.922t-15.922-15.922V48.762l-84.587 84.587q-4.976 4.976-10.947 4.976t-10.946-4.976q-11.942-10.947 0-22.888L107.475 9.95Q116.431 0 129.368 0t22.889 9.951z";
const ltr = false;
const accData = ICON_SORT;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/sort";
export { pathData, ltr, accData };