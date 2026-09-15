import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Tools.js";
import sceneSvg from "./tnt-Scene-Tools.js";
import spotSvg from "./tnt-Spot-Tools.js";
import dotSvg from "./tnt-Spot-Tools.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/Tools", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/Tools.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/Tools", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/Tools.js")).default;
});


const name = "Tools";
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

export default "tnt/Tools";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};