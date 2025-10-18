import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Compass.js";
import sceneSvg from "./tnt-Scene-Compass.js";
import spotSvg from "./tnt-Spot-Compass.js";
import dotSvg from "./tnt-Dot-Compass.js";

const name = "Compass";
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

export default "tnt/Compass";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};