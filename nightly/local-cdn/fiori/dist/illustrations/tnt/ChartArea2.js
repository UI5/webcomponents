import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartArea2.js";
import sceneSvg from "./tnt-Scene-ChartArea2.js";
import spotSvg from "./tnt-Spot-ChartArea2.js";
import dotSvg from "./tnt-Spot-ChartArea2.js";

const name = "ChartArea2";
const set = "tnt";
const collection = "V4";

registerIllustration(name, {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
	set,
	collection,
});

export default "tnt/ChartArea2";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};