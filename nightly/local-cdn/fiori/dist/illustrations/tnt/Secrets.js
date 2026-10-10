import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Secrets.js";
import sceneSvg from "./tnt-Scene-Secrets.js";
import spotSvg from "./tnt-Spot-Secrets.js";
import dotSvg from "./tnt-Spot-Secrets.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/Secrets", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/Secrets.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/Secrets", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/Secrets.js")).default;
});


const name = "Secrets";
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

export default "tnt/Secrets";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};