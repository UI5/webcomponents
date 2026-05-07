import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "line-chart";
const pathData = "M1.75 1a.75.75 0 0 1 .75.75v11.5c0 .138.112.25.25.25h11.5a.75.75 0 0 1 0 1.5H2.75A1.75 1.75 0 0 1 1 13.25V1.75A.75.75 0 0 1 1.75 1Zm12.114 8.106a.75.75 0 0 1 .772 1.288l-2.5 1.5a.75.75 0 0 1-.58.08l-3.541-.945-3.044.938a.75.75 0 0 1-.442-1.434l3.25-1a.75.75 0 0 1 .414-.008l3.443.918 2.228-1.337Zm.18-3.077a.75.75 0 1 1 .412 1.442l-3.5 1a.75.75 0 0 1-.403.003L8.04 7.788 5.02 8.95a.75.75 0 0 1-.54-1.4l3.365-1.283a.75.75 0 0 1 .352.01l2.55.694 3.297-.942Zm-.324-4.81a.75.75 0 1 1 1.06 1.061l-3 3a.75.75 0 0 1-.75.187L8.052 4.55 5.064 5.93a.75.75 0 0 1-.628-1.362l3.38-1.546a.75.75 0 0 1 .405.01l2.818.867 2.68-2.68Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/line-chart";
export { pathData, ltr, viewBox, accData };