import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-NoApplications.js";
import sceneSvg from "./tnt-Scene-NoApplications.js";
import spotSvg from "./tnt-Spot-NoApplications.js";
import dotSvg from "./tnt-Dot-NoApplications.js";

const name = "NoApplications";
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

export default "tnt/NoApplications";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};