import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Tools.js";
import sceneSvg from "./tnt-Scene-Tools.js";
import spotSvg from "./tnt-Spot-Tools.js";
import dotSvg from "./tnt-Dot-Tools.js";

const name = "Tools";
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

export default "tnt/Tools";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};