import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-SleepingBell.js";
import sceneSvg from "./sapIllus-Scene-SleepingBell.js";
import spotSvg from "./sapIllus-Spot-SleepingBell.js";
import dotSvg from "./sapIllus-Dot-SleepingBell.js";import {
	IM_TITLE_NONOTIFICATIONS,
	IM_SUBTITLE_NONOTIFICATIONS,
} from "../generated/i18n/i18n-defaults.js";

const name = "SleepingBell";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_NONOTIFICATIONS;
const subtitle = IM_SUBTITLE_NONOTIFICATIONS;

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

export default "SleepingBell";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};