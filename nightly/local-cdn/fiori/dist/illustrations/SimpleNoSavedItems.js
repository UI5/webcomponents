import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-SimpleNoSavedItems.js";
import sceneSvg from "./sapIllus-Scene-SimpleNoSavedItems.js";
import spotSvg from "./sapIllus-Spot-SimpleNoSavedItems.js";
import dotSvg from "./sapIllus-Dot-SimpleNoSavedItems.js";import {
	IM_TITLE_NOSAVEDITEMS,
	IM_SUBTITLE_NOSAVEDITEMS,
} from "../generated/i18n/i18n-defaults.js";

const name = "SimpleNoSavedItems";
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

export default "SimpleNoSavedItems";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};