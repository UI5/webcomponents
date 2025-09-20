import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-EmptyContentPane.js";
import sceneSvg from "./tnt-Scene-EmptyContentPane.js";
import spotSvg from "./tnt-Spot-EmptyContentPane.js";
import dotSvg from "./tnt-Dot-EmptyContentPane.js";

const name = "EmptyContentPane";
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

export default "tnt/EmptyContentPane";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};