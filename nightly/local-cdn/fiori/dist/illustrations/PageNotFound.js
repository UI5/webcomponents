import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-PageNotFound.js";
import sceneSvg from "./sapIllus-Scene-PageNotFound.js";
import spotSvg from "./sapIllus-Spot-PageNotFound.js";
import dotSvg from "./sapIllus-Dot-PageNotFound.js";import {
	IM_TITLE_PAGENOTFOUND,
	IM_SUBTITLE_PAGENOTFOUND,
} from "../generated/i18n/i18n-defaults.js";

const name = "PageNotFound";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_PAGENOTFOUND;
const subtitle = IM_SUBTITLE_PAGENOTFOUND;

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

export default "PageNotFound";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};