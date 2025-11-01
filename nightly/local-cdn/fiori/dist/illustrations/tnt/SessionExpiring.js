import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-SessionExpiring.js";
import sceneSvg from "./tnt-Scene-SessionExpiring.js";
import spotSvg from "./tnt-Spot-SessionExpiring.js";
import dotSvg from "./tnt-Spot-SessionExpiring.js";

const name = "SessionExpiring";
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

export default "tnt/SessionExpiring";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};