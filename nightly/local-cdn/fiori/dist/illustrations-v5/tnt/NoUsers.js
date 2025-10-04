import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-NoUsers.js";
import sceneSvg from "./tnt-Scene-NoUsers.js";
import spotSvg from "./tnt-Spot-NoUsers.js";
import dotSvg from "./tnt-Dot-NoUsers.js";

const name = "NoUsers";
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

export default "tnt/NoUsers";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};