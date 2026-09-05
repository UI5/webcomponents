import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-Achievement.js";
import sceneSvg from "./sapIllus-Scene-Achievement.js";
import spotSvg from "./sapIllus-Spot-Achievement.js";
import dotSvg from "./sapIllus-Dot-Achievement.js";import {
	IM_TITLE_ACHIEVEMENT,
	IM_SUBTITLE_ACHIEVEMENT,
} from "../generated/i18n/i18n-defaults.js";

const name = "Achievement";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_ACHIEVEMENT;
const subtitle = IM_SUBTITLE_ACHIEVEMENT;

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

export default "Achievement";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};