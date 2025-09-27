import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Handshake.js";
import sceneSvg from "./tnt-Scene-Handshake.js";
import spotSvg from "./tnt-Spot-Handshake.js";
import dotSvg from "./tnt-Dot-Handshake.js";

const name = "Handshake";
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

export default "tnt/Handshake";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};