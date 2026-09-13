import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Compass.js";
import sceneSvg from "./tnt-Scene-Compass.js";
import spotSvg from "./tnt-Spot-Compass.js";
import dotSvg from "./tnt-Dot-Compass.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/Compass", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/Compass.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/Compass", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/Compass.js")).default;
});


const name = "Compass";
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

export default "tnt/Compass";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};