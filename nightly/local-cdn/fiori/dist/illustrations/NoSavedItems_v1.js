import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-NoSavedItems_v1.js";
import sceneSvg from "./sapIllus-Scene-NoSavedItems_v1.js";
import spotSvg from "./sapIllus-Spot-NoSavedItems_v1.js";
import dotSvg from "./sapIllus-Dot-NoSavedItems_v1.js";import {
	IM_TITLE_NOSAVEDITEMS,
	IM_SUBTITLE_NOSAVEDITEMS,
} from "../generated/i18n/i18n-defaults.js";

const name = "NoSavedItems_v1";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_NOSAVEDITEMS;
const subtitle = IM_SUBTITLE_NOSAVEDITEMS;

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

export default "NoSavedItems_v1";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};