import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-NoUsers.js";
import sceneSvg from "./tnt-Scene-NoUsers.js";
import spotSvg from "./tnt-Spot-NoUsers.js";
import dotSvg from "./tnt-Spot-NoUsers.js";
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

registerIllustrationLoader("tnt/V5/NoUsers", async function loadIllustrationV5() {
	return (await import("../../illustrations-v5/tnt/NoUsers.js")).default;
});
registerIllustrationLoader("tnt/V5/HC/NoUsers", async function loadIllustrationV5HC() {
	return (await import("../../illustrations-v5/tnt/hc/NoUsers.js")).default;
});


const name = "NoUsers";
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

export default "tnt/NoUsers";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};