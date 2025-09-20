import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Help.js";
import sceneSvg from "./tnt-Scene-Help.js";
import spotSvg from "./tnt-Spot-Help.js";
import dotSvg from "./tnt-Dot-Help.js";

const name = "Help";
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

export default "tnt/Help";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};