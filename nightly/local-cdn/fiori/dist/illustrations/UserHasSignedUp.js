import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-UserHasSignedUp.js";
import sceneSvg from "./sapIllus-Scene-UserHasSignedUp.js";
import spotSvg from "./sapIllus-Spot-UserHasSignedUp.js";
import dotSvg from "./sapIllus-Dot-UserHasSignedUp.js";import {
	IM_TITLE_USERHASSIGNEDUP,
	IM_SUBTITLE_USERHASSIGNEDUP,
} from "../generated/i18n/i18n-defaults.js";

const name = "UserHasSignedUp";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_USERHASSIGNEDUP;
const subtitle = IM_SUBTITLE_USERHASSIGNEDUP;

unsafeRegisterIllustration(name, {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
	title,
	subtitle,
	set,
	collection,
});

export default "UserHasSignedUp";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};