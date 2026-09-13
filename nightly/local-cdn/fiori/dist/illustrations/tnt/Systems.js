import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Systems.js";
import sceneSvg from "./tnt-Scene-Systems.js";
import spotSvg from "./tnt-Spot-Systems.js";
import dotSvg from "./tnt-Spot-Systems.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/Systems", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/Systems.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/Systems", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/Systems.js")).default;
});


const name = "Systems";
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

export default "tnt/Systems";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};