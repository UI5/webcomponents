import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Mission.js";
import sceneSvg from "./tnt-Scene-Mission.js";
import spotSvg from "./tnt-Spot-Mission.js";
import dotSvg from "./tnt-Spot-Mission.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/Mission", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/Mission.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/Mission", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/Mission.js")).default;
});


const name = "Mission";
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

export default "tnt/Mission";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};