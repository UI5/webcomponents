import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Avatar.js";
import sceneSvg from "./tnt-Scene-Avatar.js";
import spotSvg from "./tnt-Spot-Avatar.js";
import dotSvg from "./tnt-Dot-Avatar.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/Avatar", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/Avatar.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/Avatar", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/Avatar.js")).default;
});


const name = "Avatar";
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

export default "tnt/Avatar";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};