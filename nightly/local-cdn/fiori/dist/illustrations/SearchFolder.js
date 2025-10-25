import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-SearchFolder.js";
import sceneSvg from "./sapIllus-Scene-SearchFolder.js";
import spotSvg from "./sapIllus-Spot-SearchFolder.js";
import dotSvg from "./sapIllus-Dot-SearchFolder.js";import {
	IM_TITLE_NOSEARCHRESULTS,
	IM_SUBTITLE_NOSEARCHRESULTS,
} from "../generated/i18n/i18n-defaults.js";

const name = "SearchFolder";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_NOSEARCHRESULTS;
const subtitle = IM_SUBTITLE_NOSEARCHRESULTS;

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

export default "SearchFolder";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};