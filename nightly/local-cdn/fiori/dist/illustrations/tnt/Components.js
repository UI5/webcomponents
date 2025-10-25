import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Components.js";
import sceneSvg from "./tnt-Scene-Components.js";
import spotSvg from "./tnt-Spot-Components.js";
import dotSvg from "./tnt-Spot-Components.js";

const name = "Components";
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

export default "tnt/Components";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};