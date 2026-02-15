import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-AddPeopleToCalendar.js";
import sceneSvg from "./sapIllus-Scene-AddPeopleToCalendar.js";
import spotSvg from "./sapIllus-Spot-AddPeopleToCalendar.js";
import dotSvg from "./sapIllus-Dot-AddPeopleToCalendar.js";import {
	IM_TITLE_ADDPEOPLE,
	IM_SUBTITLE_ADDPEOPLE,
} from "../generated/i18n/i18n-defaults.js";

const name = "AddPeopleToCalendar";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_ADDPEOPLE;
const subtitle = IM_SUBTITLE_ADDPEOPLE;

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

export default "AddPeopleToCalendar";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};