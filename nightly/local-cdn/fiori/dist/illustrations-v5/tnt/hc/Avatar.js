import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Avatar.js";
import sceneSvg from "./tnt-Scene-Avatar.js";
import spotSvg from "./tnt-Spot-Avatar.js";
import dotSvg from "./tnt-Dot-Avatar.js";

const name = "Avatar";
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

export default "tnt/Avatar";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};