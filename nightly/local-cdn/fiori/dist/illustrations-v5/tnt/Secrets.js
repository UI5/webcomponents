import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Secrets.js";
import sceneSvg from "./tnt-Scene-Secrets.js";
import spotSvg from "./tnt-Spot-Secrets.js";
import dotSvg from "./tnt-Dot-Secrets.js";

const name = "Secrets";
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

export default "tnt/Secrets";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};