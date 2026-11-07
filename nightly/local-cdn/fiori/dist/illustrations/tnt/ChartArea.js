import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartArea.js";
import sceneSvg from "./tnt-Scene-ChartArea.js";
import spotSvg from "./tnt-Spot-ChartArea.js";
import dotSvg from "./tnt-Spot-ChartArea.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/ChartArea", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/ChartArea.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/ChartArea", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/ChartArea.js")).default;
});


const name = "ChartArea";
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

export default "tnt/ChartArea";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};