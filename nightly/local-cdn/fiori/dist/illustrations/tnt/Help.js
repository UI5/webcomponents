import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Help.js";
import sceneSvg from "./tnt-Scene-Help.js";
import spotSvg from "./tnt-Spot-Help.js";
import dotSvg from "./tnt-Dot-Help.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/Help", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/Help.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/Help", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/Help.js")).default;
});


const name = "Help";
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

export default "tnt/Help";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};