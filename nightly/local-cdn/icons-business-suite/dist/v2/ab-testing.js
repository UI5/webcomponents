import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "ab-testing";
const pathData = "M1 327V148c0-43 34-76 77-76h280c43 0 77 33 77 76v179c0 43-34 76-77 76H78c-43 0-77-33-77-76zm66-201l147 113c4 3 8 3 12 0l144-113c-4-2-8-3-12-3H78c-4 0-8 1-11 3zm444 48v229c0 43-33 77-76 77H103c-15 0-26-11-26-26s11-25 26-25h332c15 0 25-11 25-26V174c0-15 11-25 26-25s25 10 25 25zM78 352h280c15 0 25-10 25-25V180l-126 99c-11 9-23 13-37 13-15 0-27-4-38-13L52 179v148c0 15 11 25 26 25z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/ab-testing";
export { pathData, ltr, accData };