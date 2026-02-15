import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "pharmacy";
const pathData = "M89.125 410c-52-52-75-123-68-192h475c7 69-16 140-68 192-47 47-107 70-170 70-61 0-122-23-169-70zm-20-145c13 96 92 167 189 167 95 0 179-71 190-167h-379zm122 83c0-13 11-22 24-22h19v-21c0-13 11-24 24-24 15 0 25 11 25 24v21h18c15 0 25 9 25 22 0 15-10 25-25 25h-18v20c0 13-10 23-25 23-13 0-24-10-24-23v-20h-19c-13 0-24-10-24-25zm156-192c-9-9-9-24 0-33l110-114c5-6 10-8 16-8s13 2 18 8c9 9 9 24 0 33l-110 113c-4 5-10 8-18 8-6 0-11-2-16-7z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/pharmacy";
export { pathData, ltr, accData };