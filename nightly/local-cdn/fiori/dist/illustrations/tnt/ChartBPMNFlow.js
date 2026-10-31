import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartBPMNFlow.js";
import sceneSvg from "./tnt-Scene-ChartBPMNFlow.js";
import spotSvg from "./tnt-Spot-ChartBPMNFlow.js";
import dotSvg from "./tnt-Spot-ChartBPMNFlow.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/ChartBPMNFlow", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/ChartBPMNFlow.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/ChartBPMNFlow", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/ChartBPMNFlow.js")).default;
});


const name = "ChartBPMNFlow";
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

export default "tnt/ChartBPMNFlow";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};