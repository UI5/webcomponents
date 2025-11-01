import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-SuccessCheckMark.js";
import sceneSvg from "./sapIllus-Scene-SuccessCheckMark.js";
import spotSvg from "./sapIllus-Spot-SuccessCheckMark.js";
import dotSvg from "./sapIllus-Spot-SuccessCheckMark.js";import {
	IM_TITLE_SUCCESSSCREEN,
	IM_SUBTITLE_SUCCESSSCREEN,
} from "../generated/i18n/i18n-defaults.js";

const name = "SuccessCheckMark";
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

export default "SuccessCheckMark";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};