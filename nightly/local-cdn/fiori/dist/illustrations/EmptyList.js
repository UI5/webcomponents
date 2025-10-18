import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-EmptyList.js";
import sceneSvg from "./sapIllus-Scene-EmptyList.js";
import spotSvg from "./sapIllus-Spot-EmptyList.js";
import dotSvg from "./sapIllus-Dot-EmptyList.js";import {
	IM_TITLE_NOENTRIES,
	IM_SUBTITLE_NOENTRIES,
} from "../generated/i18n/i18n-defaults.js";

const name = "EmptyList";
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

export default "EmptyList";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};