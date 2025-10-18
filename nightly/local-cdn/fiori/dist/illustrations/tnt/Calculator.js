import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Calculator.js";
import sceneSvg from "./tnt-Scene-Calculator.js";
import spotSvg from "./tnt-Spot-Calculator.js";
import dotSvg from "./tnt-Dot-Calculator.js";

const name = "Calculator";
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

export default "tnt/Calculator";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};