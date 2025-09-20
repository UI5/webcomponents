import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartArea.js";
import sceneSvg from "./tnt-Scene-ChartArea.js";
import spotSvg from "./tnt-Spot-ChartArea.js";
import dotSvg from "./tnt-Dot-ChartArea.js";

const name = "ChartArea";
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

export default "tnt/ChartArea";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};