import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-Success.js";
import sceneSvg from "./tnt-Scene-Success.js";
import spotSvg from "./tnt-Spot-Success.js";
import dotSvg from "./tnt-Spot-Success.js";

const name = "Success";
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

export default "tnt/Success";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};