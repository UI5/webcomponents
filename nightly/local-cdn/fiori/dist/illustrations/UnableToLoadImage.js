import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-UnableToLoadImage.js";
import sceneSvg from "./sapIllus-Scene-UnableToLoadImage.js";
import spotSvg from "./sapIllus-Spot-UnableToLoadImage.js";
import dotSvg from "./sapIllus-Dot-UnableToLoadImage.js";import {
	IM_TITLE_UNABLETOLOADIMAGE,
	IM_SUBTITLE_UNABLETOLOADIMAGE,
} from "../generated/i18n/i18n-defaults.js";

const name = "UnableToLoadImage";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_UNABLETOLOADIMAGE;
const subtitle = IM_SUBTITLE_UNABLETOLOADIMAGE;

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

export default "UnableToLoadImage";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};