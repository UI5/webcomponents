import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-RoadMap.js";
import sceneSvg from "./tnt-Scene-RoadMap.js";
import spotSvg from "./tnt-Spot-RoadMap.js";
import dotSvg from "./tnt-Dot-RoadMap.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/RoadMap", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/RoadMap.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/RoadMap", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/RoadMap.js")).default;
});


const name = "RoadMap";
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

export default "tnt/RoadMap";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};