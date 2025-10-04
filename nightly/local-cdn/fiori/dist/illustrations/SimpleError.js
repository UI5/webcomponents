import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-SimpleError.js";
import sceneSvg from "./sapIllus-Scene-SimpleError.js";
import spotSvg from "./sapIllus-Spot-SimpleError.js";
import dotSvg from "./sapIllus-Dot-SimpleError.js";import {
	IM_TITLE_UNABLETOUPLOAD,
	IM_SUBTITLE_UNABLETOUPLOAD,
} from "../generated/i18n/i18n-defaults.js";

const name = "SimpleError";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_UNABLETOUPLOAD;
const subtitle = IM_SUBTITLE_UNABLETOUPLOAD;

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

export default "SimpleError";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};