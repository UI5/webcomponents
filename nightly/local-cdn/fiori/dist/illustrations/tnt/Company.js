import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Company.js";
import sceneSvg from "./tnt-Scene-Company.js";
import spotSvg from "./tnt-Spot-Company.js";
import dotSvg from "./tnt-Spot-Company.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/Company", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/Company.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/Company", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/Company.js")).default;
});


const name = "Company";
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

export default "tnt/Company";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};