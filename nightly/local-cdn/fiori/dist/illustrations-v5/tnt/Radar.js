import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Radar.js";
import sceneSvg from "./tnt-Scene-Radar.js";
import spotSvg from "./tnt-Spot-Radar.js";
import dotSvg from "./tnt-Dot-Radar.js";

const name = "Radar";
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

export default "tnt/Radar";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};