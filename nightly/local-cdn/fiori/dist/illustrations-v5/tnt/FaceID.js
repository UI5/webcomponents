import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-FaceID.js";
import sceneSvg from "./tnt-Scene-FaceID.js";
import spotSvg from "./tnt-Spot-FaceID.js";
import dotSvg from "./tnt-Dot-FaceID.js";

const name = "FaceID";
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

export default "tnt/FaceID";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};