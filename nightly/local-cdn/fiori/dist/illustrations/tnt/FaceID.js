import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-FaceID.js";
import sceneSvg from "./tnt-Scene-FaceID.js";
import spotSvg from "./tnt-Spot-FaceID.js";
import dotSvg from "./tnt-Spot-FaceID.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/FaceID", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/FaceID.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/FaceID", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/FaceID.js")).default;
});


const name = "FaceID";
const set = "tnt";
const collection = "V4";

unsafeRegisterIllustration(name, {
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