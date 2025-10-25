import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Unlock.js";
import sceneSvg from "./tnt-Scene-Unlock.js";
import spotSvg from "./tnt-Spot-Unlock.js";
import dotSvg from "./tnt-Dot-Unlock.js";

const name = "Unlock";
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

export default "tnt/Unlock";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};