import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-SuccessfulAuth.js";
import sceneSvg from "./tnt-Scene-SuccessfulAuth.js";
import spotSvg from "./tnt-Spot-SuccessfulAuth.js";
import dotSvg from "./tnt-Spot-SuccessfulAuth.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/SuccessfulAuth", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/SuccessfulAuth.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/SuccessfulAuth", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/SuccessfulAuth.js")).default;
});


const name = "SuccessfulAuth";
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

export default "tnt/SuccessfulAuth";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};