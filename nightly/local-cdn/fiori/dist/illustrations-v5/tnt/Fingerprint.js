import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Fingerprint.js";
import sceneSvg from "./tnt-Scene-Fingerprint.js";
import spotSvg from "./tnt-Spot-Fingerprint.js";
import dotSvg from "./tnt-Dot-Fingerprint.js";

const name = "Fingerprint";
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

export default "tnt/Fingerprint";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};