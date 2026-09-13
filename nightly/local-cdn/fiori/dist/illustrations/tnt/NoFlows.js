import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-NoFlows.js";
import sceneSvg from "./tnt-Scene-NoFlows.js";
import spotSvg from "./tnt-Spot-NoFlows.js";
import dotSvg from "./tnt-Spot-NoFlows.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/NoFlows", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/NoFlows.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/NoFlows", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/NoFlows.js")).default;
});


const name = "NoFlows";
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

export default "tnt/NoFlows";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};