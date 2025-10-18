import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-CodePlaceholder.js";
import sceneSvg from "./tnt-Scene-CodePlaceholder.js";
import spotSvg from "./tnt-Spot-CodePlaceholder.js";
import dotSvg from "./tnt-Dot-CodePlaceholder.js";

const name = "CodePlaceholder";
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

export default "tnt/CodePlaceholder";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};