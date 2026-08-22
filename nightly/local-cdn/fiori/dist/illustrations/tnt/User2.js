import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./tnt-Dialog-User2.js";
import sceneSvg from "./tnt-Scene-User2.js";
import spotSvg from "./tnt-Spot-User2.js";
import dotSvg from "./tnt-Spot-User2.js";

const name = "User2";
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

export default "tnt/User2";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};