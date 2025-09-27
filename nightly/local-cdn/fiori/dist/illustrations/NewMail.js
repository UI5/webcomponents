import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-NewMail.js";
import sceneSvg from "./sapIllus-Scene-NewMail.js";
import spotSvg from "./sapIllus-Spot-NewMail.js";
import dotSvg from "./sapIllus-Dot-NewMail.js";import {
	IM_TITLE_NEWMAIL,
	IM_SUBTITLE_NEWMAIL,
} from "../generated/i18n/i18n-defaults.js";

const name = "NewMail";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_NEWMAIL;
const subtitle = IM_SUBTITLE_NEWMAIL;

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

export default "NewMail";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};