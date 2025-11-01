import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-SimpleEmptyList.js";
import sceneSvg from "./sapIllus-Scene-SimpleEmptyList.js";
import spotSvg from "./sapIllus-Spot-SimpleEmptyList.js";
import dotSvg from "./sapIllus-Dot-SimpleEmptyList.js";import {
	IM_TITLE_NOENTRIES,
	IM_SUBTITLE_NOENTRIES,
} from "../generated/i18n/i18n-defaults.js";

const name = "SimpleEmptyList";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_NOENTRIES;
const subtitle = IM_SUBTITLE_NOENTRIES;

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

export default "SimpleEmptyList";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};