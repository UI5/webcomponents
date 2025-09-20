import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Tutorials.js";
import sceneSvg from "./tnt-Scene-Tutorials.js";
import spotSvg from "./tnt-Spot-Tutorials.js";
import dotSvg from "./tnt-Dot-Tutorials.js";

const name = "Tutorials";
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

export default "tnt/Tutorials";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};