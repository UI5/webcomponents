import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-CodePlaceholder.js";
import sceneSvg from "./tnt-Scene-CodePlaceholder.js";
import spotSvg from "./tnt-Spot-CodePlaceholder.js";
import dotSvg from "./tnt-Spot-CodePlaceholder.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/CodePlaceholder", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/CodePlaceholder.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/CodePlaceholder", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/CodePlaceholder.js")).default;
});


const name = "CodePlaceholder";
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

export default "tnt/CodePlaceholder";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};