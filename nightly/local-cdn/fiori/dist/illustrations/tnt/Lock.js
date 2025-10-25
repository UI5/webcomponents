import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Lock.js";
import sceneSvg from "./tnt-Scene-Lock.js";
import spotSvg from "./tnt-Spot-Lock.js";
import dotSvg from "./tnt-Spot-Lock.js";

const name = "Lock";
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

export default "tnt/Lock";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};