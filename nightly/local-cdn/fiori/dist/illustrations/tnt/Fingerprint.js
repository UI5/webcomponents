import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Fingerprint.js";
import sceneSvg from "./tnt-Scene-Fingerprint.js";
import spotSvg from "./tnt-Spot-Fingerprint.js";
import dotSvg from "./tnt-Spot-Fingerprint.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/Fingerprint", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/Fingerprint.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/Fingerprint", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/Fingerprint.js")).default;
});


const name = "Fingerprint";
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

export default "tnt/Fingerprint";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};