import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Handshake.js";
import sceneSvg from "./tnt-Scene-Handshake.js";
import spotSvg from "./tnt-Spot-Handshake.js";
import dotSvg from "./tnt-Dot-Handshake.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/Handshake", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/Handshake.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/Handshake", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/Handshake.js")).default;
});


const name = "Handshake";
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

export default "tnt/Handshake";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};