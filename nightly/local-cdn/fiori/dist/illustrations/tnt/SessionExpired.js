import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-SessionExpired.js";
import sceneSvg from "./tnt-Scene-SessionExpired.js";
import spotSvg from "./tnt-Spot-SessionExpired.js";
import dotSvg from "./tnt-Spot-SessionExpired.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/SessionExpired", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/SessionExpired.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/SessionExpired", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/SessionExpired.js")).default;
});


const name = "SessionExpired";
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

export default "tnt/SessionExpired";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};