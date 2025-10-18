import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sms";
const pathData = "M200.5 406V273c0-24 20-45 44-45h181c24 0 45 21 45 45v214c0 9-6 19-14 22-2 1-5 1-9 1-5 0-10-2-15-7l-53-51h-135c-24 0-44-21-44-46zm-89 90c-37 0-68-30-68-67V70c0-37 31-68 68-68h179c37 0 68 31 68 68v90c0 12-10 22-23 22s-22-10-22-22V70c0-13-10-22-23-22h-21c-8 0-14 4-19 12l-10 19c-4 8-10 12-18 12h-43c-7 0-14-4-20-12l-8-19c-4-8-10-12-19-12h-21c-13 0-23 9-23 22v359c0 13 10 23 23 23h44c13 0 23 8 23 21s-10 23-23 23h-44zm133-224v134h145c7 0 12 3 16 8l20 19V273z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/sms";
export { pathData, ltr, accData };