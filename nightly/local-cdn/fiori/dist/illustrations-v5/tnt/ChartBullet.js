import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartBullet.js";
import sceneSvg from "./tnt-Scene-ChartBullet.js";
import spotSvg from "./tnt-Spot-ChartBullet.js";
import dotSvg from "./tnt-Dot-ChartBullet.js";

const name = "ChartBullet";
const set = "tnt";
const collection = "V5";

registerIllustration(name, {
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