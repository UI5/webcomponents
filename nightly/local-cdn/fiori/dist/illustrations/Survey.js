import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-Survey.js";
import sceneSvg from "./sapIllus-Scene-Survey.js";
import spotSvg from "./sapIllus-Spot-Survey.js";
import dotSvg from "./sapIllus-Dot-Survey.js";import {
	IM_TITLE_SURVEY,
	IM_SUBTITLE_SURVEY,
} from "../generated/i18n/i18n-defaults.js";

const name = "Survey";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_SURVEY;
const subtitle = IM_SUBTITLE_SURVEY;

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

export default "Survey";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};