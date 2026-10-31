import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-NoSavedItems.js";
import sceneSvg from "./sapIllus-Scene-NoSavedItems.js";
import spotSvg from "./sapIllus-Spot-NoSavedItems.js";
import dotSvg from "./sapIllus-Dot-NoSavedItems.js";import {
	IM_TITLE_NOSAVEDITEMS,
	IM_SUBTITLE_NOSAVEDITEMS,
} from "../generated/i18n/i18n-defaults.js";

const name = "NoSavedItems";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_NOSAVEDITEMS;
const subtitle = IM_SUBTITLE_NOSAVEDITEMS;

unsafeRegisterIllustration(name, {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
	title,
	subtitle,
	set,
	collection,
});

export default "NoSavedItems";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};