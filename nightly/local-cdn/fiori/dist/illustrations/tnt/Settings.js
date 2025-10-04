import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Settings.js";
import sceneSvg from "./tnt-Scene-Settings.js";
import spotSvg from "./tnt-Spot-Settings.js";
import dotSvg from "./tnt-Dot-Settings.js";

const name = "Settings";
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

export default "tnt/Settings";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};