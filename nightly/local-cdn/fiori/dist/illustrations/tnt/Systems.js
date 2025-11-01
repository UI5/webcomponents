import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Systems.js";
import sceneSvg from "./tnt-Scene-Systems.js";
import spotSvg from "./tnt-Spot-Systems.js";
import dotSvg from "./tnt-Spot-Systems.js";

const name = "Systems";
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

export default "tnt/Systems";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};