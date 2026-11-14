import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "clear-all";
const pathData = "M14 14.002v-5.02h1v5.02c0 .27-.088.504-.266.702a.9.9 0 0 1-.703.296H2a.962.962 0 0 1-.703-.296.958.958 0 0 1-.297-.702V1.998c0-.27.094-.5.281-.686A.974.974 0 0 1 2 1.032h6.031v.997H2v11.973h12Zm2-12.004-2.063 1.964L16 6.02l-1 .998-1.969-2.058L11 7.018 9.969 6.02l2.062-2.058L9.97 1.998 11 1l2.031 1.996L15 1l1 .998Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/clear-all";
export { pathData, ltr, viewBox, accData };