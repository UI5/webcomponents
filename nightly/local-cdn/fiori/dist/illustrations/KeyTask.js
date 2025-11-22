import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-KeyTask.js";
import sceneSvg from "./sapIllus-Scene-KeyTask.js";
import spotSvg from "./sapIllus-Spot-KeyTask.js";
import dotSvg from "./sapIllus-Dot-KeyTask.js";import {
	IM_TITLE_SUCCESSSCREEN,
	IM_SUBTITLE_SUCCESSSCREEN,
} from "../generated/i18n/i18n-defaults.js";

const name = "KeyTask";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_SUCCESSSCREEN;
const subtitle = IM_SUBTITLE_SUCCESSSCREEN;

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

export default "KeyTask";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};