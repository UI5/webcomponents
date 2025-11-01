import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartDoughnut.js";
import sceneSvg from "./tnt-Scene-ChartDoughnut.js";
import spotSvg from "./tnt-Spot-ChartDoughnut.js";
import dotSvg from "./tnt-Dot-ChartDoughnut.js";

const name = "ChartDoughnut";
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

export default "tnt/ChartDoughnut";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};