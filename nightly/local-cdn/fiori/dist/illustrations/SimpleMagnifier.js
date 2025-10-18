import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-SimpleMagnifier.js";
import sceneSvg from "./sapIllus-Scene-SimpleMagnifier.js";
import spotSvg from "./sapIllus-Spot-SimpleMagnifier.js";
import dotSvg from "./sapIllus-Dot-SimpleMagnifier.js";import {
	IM_TITLE_BEFORESEARCH,
	IM_SUBTITLE_BEFORESEARCH,
} from "../generated/i18n/i18n-defaults.js";

const name = "SimpleMagnifier";
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

export default "SimpleMagnifier";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};