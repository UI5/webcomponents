import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "favorite";
const pathData = "M11.827 9.307c-.125.084-.156.177-.094.281l2.25 6.06c.041.104.015.197-.078.28-.094.084-.193.094-.297.032L8.14 12.087c-.105-.062-.198-.062-.282 0L2.392 15.96c-.104.062-.203.052-.297-.031-.093-.084-.12-.177-.078-.281l2.25-6.06c.041-.125.01-.218-.094-.28L.112 6.433c-.105-.063-.136-.151-.094-.266.042-.114.114-.171.219-.171h5.186c.104 0 .187-.052.25-.157L7.766.156C7.807.052 7.886 0 8 0c.115 0 .193.052.234.156l2.094 5.684c.041.105.124.157.25.157h5.154c.125 0 .209.057.25.171.042.115.01.203-.094.266l-4.06 2.873Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/favorite";
export { pathData, ltr, viewBox, accData };