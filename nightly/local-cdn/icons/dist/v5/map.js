import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "map";
const pathData = "M256 512q-9 0-16-6-34-24-68.5-57t-62-72.5T65 293t-17-88q0-42 16-79.5T108 60t66-44 82-16 82 16 66 44 44 66 16 81q0 41-13.5 79T416 356.5t-45.5 60-45.5 47-35.5 30.5-16.5 12q-5 4-9 5t-8 1zm0-461q-33 0-61.5 12.5t-50 33.5-33.5 49.5T99 208q0 42 19 81.5t44.5 72 52 56.5 41.5 36q16-12 42.5-36t52-56.5 44-72T413 208q0-33-12-61.5T367.5 97t-50-33.5T256 51zm0 256q-41 0-68.5-27.5T160 211t27.5-68.5T256 115t68.5 27.5T352 211t-27.5 68.5T256 307zm0-141q-20 0-32.5 12.5T211 211t12.5 32.5T256 256t32.5-12.5T301 211t-12.5-32.5T256 166z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/map";
export { pathData, ltr, accData };