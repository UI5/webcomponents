import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "actor";
const pathData = "M462 49q8 8 8 18.5T462 86l-98 97v303q0 11-7.5 18.5T338 512t-19-7.5-8-18.5V353h-26v133q0 11-8 18.5t-19 7.5-18.5-7.5T232 486V183l-98-97q-8-7-7.5-18t7.5-19q8-8 19-8 12 0 19 8l92 91h69l92-91q7-8 18-8 12 0 19 8zm-164 71q-25 0-42-17.5T239 60q0-24 17-42t42-18 42.5 18T358 60q0 25-17.5 42.5T298 120z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/actor";
export { pathData, ltr, accData };