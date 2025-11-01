import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartBar.js";
import sceneSvg from "./tnt-Scene-ChartBar.js";
import spotSvg from "./tnt-Spot-ChartBar.js";
import dotSvg from "./tnt-Dot-ChartBar.js";

const name = "ChartBar";
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

export default "tnt/ChartBar";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};