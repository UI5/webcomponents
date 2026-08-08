import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartOrg.js";
import sceneSvg from "./tnt-Scene-ChartOrg.js";
import spotSvg from "./tnt-Spot-ChartOrg.js";
import dotSvg from "./tnt-Spot-ChartOrg.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/ChartOrg", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/ChartOrg.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/ChartOrg", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/ChartOrg.js")).default;
});


const name = "ChartOrg";
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

export default "tnt/ChartOrg";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};