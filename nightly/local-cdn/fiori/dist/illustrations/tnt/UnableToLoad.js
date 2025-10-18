import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-UnableToLoad.js";
import sceneSvg from "./tnt-Scene-UnableToLoad.js";
import spotSvg from "./tnt-Spot-UnableToLoad.js";
import dotSvg from "./tnt-Spot-UnableToLoad.js";

const name = "UnableToLoad";
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

export default "tnt/UnableToLoad";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};