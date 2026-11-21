import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Services.js";
import sceneSvg from "./tnt-Scene-Services.js";
import spotSvg from "./tnt-Spot-Services.js";
import dotSvg from "./tnt-Spot-Services.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/Services", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/Services.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/Services", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/Services.js")).default;
});


const name = "Services";
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

export default "tnt/Services";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};