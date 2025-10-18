import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Services.js";
import sceneSvg from "./tnt-Scene-Services.js";
import spotSvg from "./tnt-Spot-Services.js";
import dotSvg from "./tnt-Dot-Services.js";

const name = "Services";
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

export default "tnt/Services";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};