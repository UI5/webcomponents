import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-NoTasks.js";
import sceneSvg from "./sapIllus-Scene-NoTasks.js";
import spotSvg from "./sapIllus-Spot-NoTasks.js";
import dotSvg from "./sapIllus-Dot-NoTasks.js";import {
	IM_TITLE_NOTASKS,
	IM_SUBTITLE_NOTASKS,
} from "../generated/i18n/i18n-defaults.js";

const name = "NoTasks";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_NOTASKS;
const subtitle = IM_SUBTITLE_NOTASKS;

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

export default "NoTasks";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};