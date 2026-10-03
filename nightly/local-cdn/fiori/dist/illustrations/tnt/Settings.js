import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Settings.js";
import sceneSvg from "./tnt-Scene-Settings.js";
import spotSvg from "./tnt-Spot-Settings.js";
import dotSvg from "./tnt-Dot-Settings.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/Settings", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/Settings.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/Settings", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/Settings.js")).default;
});


const name = "Settings";
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

export default "tnt/Settings";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};