import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Mission.js";
import sceneSvg from "./tnt-Scene-Mission.js";
import spotSvg from "./tnt-Spot-Mission.js";
import dotSvg from "./tnt-Dot-Mission.js";

const name = "Mission";
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

export default "tnt/Mission";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};