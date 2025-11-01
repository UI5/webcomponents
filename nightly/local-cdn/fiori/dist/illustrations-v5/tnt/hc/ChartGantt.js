import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartGantt.js";
import sceneSvg from "./tnt-Scene-ChartGantt.js";
import spotSvg from "./tnt-Spot-ChartGantt.js";
import dotSvg from "./tnt-Dot-ChartGantt.js";

const name = "ChartGantt";
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

export default "tnt/ChartGantt";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};