import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartOrg.js";
import sceneSvg from "./tnt-Scene-ChartOrg.js";
import spotSvg from "./tnt-Spot-ChartOrg.js";
import dotSvg from "./tnt-Dot-ChartOrg.js";

const name = "ChartOrg";
const set = "tnt";
const collection = "V5/HC";

registerIllustration(name, {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
	set,
	collection,
});

export default "tnt/ChartOrg";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};