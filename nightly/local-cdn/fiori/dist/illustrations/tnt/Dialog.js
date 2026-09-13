import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Dialog.js";
import sceneSvg from "./tnt-Scene-Dialog.js";
import spotSvg from "./tnt-Spot-Dialog.js";
import dotSvg from "./tnt-Dot-Dialog.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/Dialog", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/Dialog.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/Dialog", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/Dialog.js")).default;
});


const name = "Dialog";
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

export default "tnt/Dialog";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};