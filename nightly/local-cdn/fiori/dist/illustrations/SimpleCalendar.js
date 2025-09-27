import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-SimpleCalendar.js";
import sceneSvg from "./sapIllus-Scene-SimpleCalendar.js";
import spotSvg from "./sapIllus-Spot-SimpleCalendar.js";
import dotSvg from "./sapIllus-Dot-SimpleCalendar.js";import {
	IM_TITLE_NOACTIVITIES,
	IM_SUBTITLE_NOACTIVITIES,
} from "../generated/i18n/i18n-defaults.js";

const name = "SimpleCalendar";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_NOACTIVITIES;
const subtitle = IM_SUBTITLE_NOACTIVITIES;

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

export default "SimpleCalendar";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};