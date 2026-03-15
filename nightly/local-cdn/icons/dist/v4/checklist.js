import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "checklist";
const pathData = "M37 220h219q18 0 27.5 12.5T293 262v85q0 17-16 30L159 505q-5 5-14 5-8 0-12-5L15 377Q0 366 0 347v-85q0-17 9.5-29.5T37 220zm0 127q0 1 16 19.5T90 407l55 60 55-60q21-23 38.5-41t17.5-19v-85q0-6-7-6H42q-5 0-5 6v85zm219-237h219q19 0 28 12.5t9 29.5v85q0 17-16 31L378 396q-4 4-13 4-9 1-13-4l-23-24v-56l36 40 54-60q21-23 38.5-40.5T475 237v-85q0-5-6-5H262q-6 0-6 5v31h-37v-31q0-17 10-29.5t27-12.5zM37 0h219q18 0 27.5 12.5T293 43v30h-37V43q0-6-7-6H42q-5 0-5 6v84q0 1 6.5 9t16 18 18 18.5L88 183H39l-24-25Q0 147 0 127V43q0-18 9.5-30.5T37 0z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/checklist";
export { pathData, ltr, accData };