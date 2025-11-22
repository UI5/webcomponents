import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "gate";
const pathData = "M60 480c-23 0-43-20-43-43v-49c0-23 20-43 43-43h1V229c0-19 10-35 21-47-18-17-27-38-27-63 0-48 39-86 86-86h307c27 0 47 20 47 47v82c0 27-20 47-47 47H217c1 7 3 13 3 20v116h2c24 0 43 20 43 43v49c0 23-19 43-43 43H60zm65-271c-11 0-18 9-18 20v116h68V229c0-11-8-20-19-20h-31zm-31-90c0 25 21 46 46 46s44-21 44-46-19-44-44-44-46 19-46 44zm126 272H63v43h157v-43zm48-226h44l87-88h-43zm107 0h73c1 0 2-1 2-3V90zm-83-88h-76c7 13 11 27 11 42 0 10-1 19-3 26z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/gate";
export { pathData, ltr, accData };