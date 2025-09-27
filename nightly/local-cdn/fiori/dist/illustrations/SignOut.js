import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-SignOut.js";
import sceneSvg from "./sapIllus-Scene-SignOut.js";
import spotSvg from "./sapIllus-Spot-SignOut.js";
import dotSvg from "./sapIllus-Dot-SignOut.js";import {
	IM_TITLE_SIGNOUT,
	IM_SUBTITLE_SIGNOUT,
} from "../generated/i18n/i18n-defaults.js";

const name = "SignOut";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_SIGNOUT;
const subtitle = IM_SUBTITLE_SIGNOUT;

registerIllustration(name, {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
	title,
	subtitle,
	set,
	collection,
});

export default "SignOut";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};