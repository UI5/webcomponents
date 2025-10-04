import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-NoFilterResults.js";
import sceneSvg from "./sapIllus-Scene-NoFilterResults.js";
import spotSvg from "./sapIllus-Spot-NoFilterResults.js";
import dotSvg from "./sapIllus-Dot-NoFilterResults.js";import {
	IM_TITLE_NOFILTERRESULTS,
	IM_SUBTITLE_NOFILTERRESULTS,
} from "../generated/i18n/i18n-defaults.js";

const name = "NoFilterResults";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_NOFILTERRESULTS;
const subtitle = IM_SUBTITLE_NOFILTERRESULTS;

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

export default "NoFilterResults";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};