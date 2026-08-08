import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartGantt.js";
import sceneSvg from "./tnt-Scene-ChartGantt.js";
import spotSvg from "./tnt-Spot-ChartGantt.js";
import dotSvg from "./tnt-Spot-ChartGantt.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/ChartGantt", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/ChartGantt.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/ChartGantt", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/ChartGantt.js")).default;
});


const name = "ChartGantt";
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

export default "tnt/ChartGantt";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};