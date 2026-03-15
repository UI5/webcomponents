import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartBar.js";
import sceneSvg from "./tnt-Scene-ChartBar.js";
import spotSvg from "./tnt-Spot-ChartBar.js";
import dotSvg from "./tnt-Spot-ChartBar.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/ChartBar", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/ChartBar.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/ChartBar", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/ChartBar.js")).default;
});


const name = "ChartBar";
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

export default "tnt/ChartBar";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};