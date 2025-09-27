import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "eraser";
const pathData = "M454 32q11 0 18.5 7.5T480 58v74q0 9-7 18L150 472q-8 8-18 8t-18-8l-74-74q-8-8-8-18t8-18L362 39q9-7 18-7h74zm-25 51h-38L255 219l38 38 136-136V83zM168 306l38 38 51-51-38-38zm2 74l-38-38-38 38 38 38zm284 49q11 0 18.5 7t7.5 18-7.5 18.5T454 480H282q-11 0-18.5-7.5T256 454t7.5-18 18.5-7h172z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/eraser";
export { pathData, ltr, accData };