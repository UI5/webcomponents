import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Calculator.js";
import sceneSvg from "./tnt-Scene-Calculator.js";
import spotSvg from "./tnt-Spot-Calculator.js";
import dotSvg from "./tnt-Dot-Calculator.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/Calculator", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/Calculator.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/Calculator", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/Calculator.js")).default;
});


const name = "Calculator";
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

export default "tnt/Calculator";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};