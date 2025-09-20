import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Company.js";
import sceneSvg from "./tnt-Scene-Company.js";
import spotSvg from "./tnt-Spot-Company.js";
import dotSvg from "./tnt-Dot-Company.js";

const name = "Company";
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

export default "tnt/Company";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};