import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-NoFlows.js";
import sceneSvg from "./tnt-Scene-NoFlows.js";
import spotSvg from "./tnt-Spot-NoFlows.js";
import dotSvg from "./tnt-Dot-NoFlows.js";

const name = "NoFlows";
const set = "tnt";
const collection = "V5/HC";

registerIllustration(name, {
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