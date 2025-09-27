import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ExternalLink.js";
import sceneSvg from "./tnt-Scene-ExternalLink.js";
import spotSvg from "./tnt-Spot-ExternalLink.js";
import dotSvg from "./tnt-Dot-ExternalLink.js";

const name = "ExternalLink";
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

export default "tnt/ExternalLink";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};