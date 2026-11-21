import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartDoughnut.js";
import sceneSvg from "./tnt-Scene-ChartDoughnut.js";
import spotSvg from "./tnt-Spot-ChartDoughnut.js";
import dotSvg from "./tnt-Spot-ChartDoughnut.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/ChartDoughnut", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/ChartDoughnut.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/ChartDoughnut", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/ChartDoughnut.js")).default;
});


const name = "ChartDoughnut";
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

export default "tnt/ChartDoughnut";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};