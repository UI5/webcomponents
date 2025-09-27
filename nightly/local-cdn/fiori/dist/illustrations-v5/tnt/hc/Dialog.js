import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Dialog.js";
import sceneSvg from "./tnt-Scene-Dialog.js";
import spotSvg from "./tnt-Spot-Dialog.js";
import dotSvg from "./tnt-Dot-Dialog.js";

const name = "Dialog";
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

export default "tnt/Dialog";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};