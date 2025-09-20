import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartFlow.js";
import sceneSvg from "./tnt-Scene-ChartFlow.js";
import spotSvg from "./tnt-Spot-ChartFlow.js";
import dotSvg from "./tnt-Dot-ChartFlow.js";

const name = "ChartFlow";
const set = "tnt";
const collection = "V5";

registerIllustration(name, {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
	set,
	collection,
});

export default "tnt/ChartFlow";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};