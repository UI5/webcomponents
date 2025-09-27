import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-SimpleCheckMark.js";
import sceneSvg from "./sapIllus-Scene-SimpleCheckMark.js";
import spotSvg from "./sapIllus-Spot-SimpleCheckMark.js";
import dotSvg from "./sapIllus-Dot-SimpleCheckMark.js";import {
	IM_TITLE_SUCCESSSCREEN,
	IM_SUBTITLE_SUCCESSSCREEN,
} from "../generated/i18n/i18n-defaults.js";

const name = "SimpleCheckMark";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_SUCCESSSCREEN;
const subtitle = IM_SUBTITLE_SUCCESSSCREEN;

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

export default "SimpleCheckMark";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};