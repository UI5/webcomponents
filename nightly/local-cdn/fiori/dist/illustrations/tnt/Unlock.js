import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Unlock.js";
import sceneSvg from "./tnt-Scene-Unlock.js";
import spotSvg from "./tnt-Spot-Unlock.js";
import dotSvg from "./tnt-Spot-Unlock.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/Unlock", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/Unlock.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/Unlock", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/Unlock.js")).default;
});


const name = "Unlock";
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

export default "tnt/Unlock";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};