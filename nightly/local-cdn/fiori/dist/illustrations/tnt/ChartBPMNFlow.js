import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-ChartBPMNFlow.js";
import sceneSvg from "./tnt-Scene-ChartBPMNFlow.js";
import spotSvg from "./tnt-Spot-ChartBPMNFlow.js";
import dotSvg from "./tnt-Spot-ChartBPMNFlow.js";

const name = "ChartBPMNFlow";
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

export default "tnt/ChartBPMNFlow";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};