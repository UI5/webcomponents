import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Success.js";
import sceneSvg from "./tnt-Scene-Success.js";
import spotSvg from "./tnt-Spot-Success.js";
import dotSvg from "./tnt-Spot-Success.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/Success", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/Success.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/Success", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/Success.js")).default;
});


const name = "Success";
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

export default "tnt/Success";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};