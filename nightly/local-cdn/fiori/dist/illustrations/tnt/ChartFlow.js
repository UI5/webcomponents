import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartFlow.js";
import sceneSvg from "./tnt-Scene-ChartFlow.js";
import spotSvg from "./tnt-Spot-ChartFlow.js";
import dotSvg from "./tnt-Spot-ChartFlow.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/ChartFlow", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/ChartFlow.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/ChartFlow", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/ChartFlow.js")).default;
});


const name = "ChartFlow";
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

export default "tnt/ChartFlow";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};