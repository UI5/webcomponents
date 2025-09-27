import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-SearchEarth.js";
import sceneSvg from "./sapIllus-Scene-SearchEarth.js";
import spotSvg from "./sapIllus-Spot-SearchEarth.js";
import dotSvg from "./sapIllus-Dot-SearchEarth.js";import {
	IM_TITLE_BEFORESEARCH,
	IM_SUBTITLE_BEFORESEARCH,
} from "../generated/i18n/i18n-defaults.js";

const name = "SearchEarth";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_BEFORESEARCH;
const subtitle = IM_SUBTITLE_BEFORESEARCH;

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

export default "SearchEarth";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};