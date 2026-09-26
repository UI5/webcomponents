import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Components.js";
import sceneSvg from "./tnt-Scene-Components.js";
import spotSvg from "./tnt-Spot-Components.js";
import dotSvg from "./tnt-Spot-Components.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/Components", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/Components.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/Components", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/Components.js")).default;
});


const name = "Components";
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

export default "tnt/Components";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};