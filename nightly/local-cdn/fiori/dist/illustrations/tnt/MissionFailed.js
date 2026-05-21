import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-MissionFailed.js";
import sceneSvg from "./tnt-Scene-MissionFailed.js";
import spotSvg from "./tnt-Spot-MissionFailed.js";
import dotSvg from "./tnt-Dot-MissionFailed.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/MissionFailed", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/MissionFailed.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/MissionFailed", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/MissionFailed.js")).default;
});


const name = "MissionFailed";
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

export default "tnt/MissionFailed";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};