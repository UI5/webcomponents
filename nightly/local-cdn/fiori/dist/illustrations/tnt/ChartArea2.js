import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartArea2.js";
import sceneSvg from "./tnt-Scene-ChartArea2.js";
import spotSvg from "./tnt-Spot-ChartArea2.js";
import dotSvg from "./tnt-Spot-ChartArea2.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/ChartArea2", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/ChartArea2.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/ChartArea2", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/ChartArea2.js")).default;
});


const name = "ChartArea2";
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

export default "tnt/ChartArea2";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};