import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Mission.js";
import sceneSvg from "./tnt-Scene-Mission.js";
import spotSvg from "./tnt-Spot-Mission.js";
import dotSvg from "./tnt-Spot-Mission.js";

const name = "Mission";
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

export default "tnt/Mission";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};