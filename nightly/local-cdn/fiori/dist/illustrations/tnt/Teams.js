import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Teams.js";
import sceneSvg from "./tnt-Scene-Teams.js";
import spotSvg from "./tnt-Spot-Teams.js";
import dotSvg from "./tnt-Spot-Teams.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/Teams", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/Teams.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/Teams", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/Teams.js")).default;
});


const name = "Teams";
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

export default "tnt/Teams";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};