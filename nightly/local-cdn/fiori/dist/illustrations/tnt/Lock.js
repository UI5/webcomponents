import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Lock.js";
import sceneSvg from "./tnt-Scene-Lock.js";
import spotSvg from "./tnt-Spot-Lock.js";
import dotSvg from "./tnt-Spot-Lock.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/Lock", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/Lock.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/Lock", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/Lock.js")).default;
});


const name = "Lock";
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

export default "tnt/Lock";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};