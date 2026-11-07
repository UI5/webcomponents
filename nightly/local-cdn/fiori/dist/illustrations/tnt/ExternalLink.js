import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ExternalLink.js";
import sceneSvg from "./tnt-Scene-ExternalLink.js";
import spotSvg from "./tnt-Spot-ExternalLink.js";
import dotSvg from "./tnt-Spot-ExternalLink.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/ExternalLink", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/ExternalLink.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/ExternalLink", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/ExternalLink.js")).default;
});


const name = "ExternalLink";
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

export default "tnt/ExternalLink";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};