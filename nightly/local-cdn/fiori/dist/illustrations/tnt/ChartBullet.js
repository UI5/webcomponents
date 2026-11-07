import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartBullet.js";
import sceneSvg from "./tnt-Scene-ChartBullet.js";
import spotSvg from "./tnt-Spot-ChartBullet.js";
import dotSvg from "./tnt-Spot-ChartBullet.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/ChartBullet", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/ChartBullet.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/ChartBullet", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/ChartBullet.js")).default;
});


const name = "ChartBullet";
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

export default "tnt/ChartBullet";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};