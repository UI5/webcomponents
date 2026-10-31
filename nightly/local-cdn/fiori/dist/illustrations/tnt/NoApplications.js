import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-NoApplications.js";
import sceneSvg from "./tnt-Scene-NoApplications.js";
import spotSvg from "./tnt-Spot-NoApplications.js";
import dotSvg from "./tnt-Spot-NoApplications.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/NoApplications", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/NoApplications.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/NoApplications", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/NoApplications.js")).default;
});


const name = "NoApplications";
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

export default "tnt/NoApplications";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};