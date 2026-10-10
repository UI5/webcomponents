import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartPie.js";
import sceneSvg from "./tnt-Scene-ChartPie.js";
import spotSvg from "./tnt-Spot-ChartPie.js";
import dotSvg from "./tnt-Spot-ChartPie.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/ChartPie", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/ChartPie.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/ChartPie", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/ChartPie.js")).default;
});


const name = "ChartPie";
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

export default "tnt/ChartPie";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};