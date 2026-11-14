import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_LAPTOP } from "../generated/i18n/i18n-defaults.js";

const name = "laptop";
const pathData = "M3 10a.947.947 0 0 1-.719-.297A.988.988 0 0 1 2 9V2c0-.292.094-.531.281-.719A.973.973 0 0 1 3 1h10c.27 0 .505.094.703.281A.947.947 0 0 1 14 2v7c0 .27-.099.505-.297.703A.961.961 0 0 1 13 10H3Zm0-1h10V2H3v7Zm13 4.844c0 .312-.115.583-.344.812-.229.23-.5.344-.812.344H1.156c-.312 0-.583-.115-.812-.344-.23-.229-.344-.5-.344-.812L2.281 11H13.72L16 13.844ZM10 14l-1-1H7l-1 1h4Z";
const ltr = false;
const accData = ICON_LAPTOP;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v4/laptop";
export { pathData, ltr, viewBox, accData };