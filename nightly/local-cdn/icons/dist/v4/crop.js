import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_CROP } from "../generated/i18n/i18n-defaults.js";

const name = "crop";
const pathData = "M3.031 11.992V2.996h8.977V1h.96v1.996H15v.984h-2.031v8.997H3.992V15h-.96v-2.023H1v-.985h2.031Zm.961 0h8.016V3.98H3.992v8.012Zm3.541-5.988 1.318 2.625.686-1.121 1.51 2.488h-1.51l.494 1.012H5.008l2.525-5.004Zm2.745-1.012a.747.747 0 0 1 .77.766c0 .2-.074.373-.22.52a.747.747 0 0 1-.55.218.714.714 0 0 1-.521-.219.708.708 0 0 1-.22-.52.74.74 0 0 1 .22-.546.714.714 0 0 1 .521-.219Z";
const ltr = false;
const accData = ICON_CROP;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v4/crop";
export { pathData, ltr, viewBox, accData };