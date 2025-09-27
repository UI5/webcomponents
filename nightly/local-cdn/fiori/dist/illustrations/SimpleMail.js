import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-SimpleMail.js";
import sceneSvg from "./sapIllus-Scene-SimpleMail.js";
import spotSvg from "./sapIllus-Spot-SimpleMail.js";
import dotSvg from "./sapIllus-Dot-SimpleMail.js";import {
	IM_TITLE_NOMAIL,
	IM_SUBTITLE_NOMAIL,
} from "../generated/i18n/i18n-defaults.js";

const name = "SimpleMail";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_NOMAIL;
const subtitle = IM_SUBTITLE_NOMAIL;

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

export default "SimpleMail";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};