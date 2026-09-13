import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-NoActivities.js";
import sceneSvg from "./sapIllus-Scene-NoActivities.js";
import spotSvg from "./sapIllus-Spot-NoActivities.js";
import dotSvg from "./sapIllus-Dot-NoActivities.js";import {
	IM_TITLE_NOACTIVITIES,
	IM_SUBTITLE_NOACTIVITIES,
} from "../generated/i18n/i18n-defaults.js";

const name = "NoActivities";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_NOACTIVITIES;
const subtitle = IM_SUBTITLE_NOACTIVITIES;

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

export default "NoActivities";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};