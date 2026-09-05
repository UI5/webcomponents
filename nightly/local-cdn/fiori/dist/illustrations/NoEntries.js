import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-NoEntries.js";
import sceneSvg from "./sapIllus-Scene-NoEntries.js";
import spotSvg from "./sapIllus-Spot-NoEntries.js";
import dotSvg from "./sapIllus-Dot-NoEntries.js";import {
	IM_TITLE_NOENTRIES,
	IM_SUBTITLE_NOENTRIES,
} from "../generated/i18n/i18n-defaults.js";

const name = "NoEntries";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_NOENTRIES;
const subtitle = IM_SUBTITLE_NOENTRIES;

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

export default "NoEntries";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};