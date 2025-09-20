import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-RoadMap.js";
import sceneSvg from "./tnt-Scene-RoadMap.js";
import spotSvg from "./tnt-Spot-RoadMap.js";
import dotSvg from "./tnt-Dot-RoadMap.js";

const name = "RoadMap";
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

export default "tnt/RoadMap";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};