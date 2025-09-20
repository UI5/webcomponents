import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-SimpleTask.js";
import sceneSvg from "./sapIllus-Scene-SimpleTask.js";
import spotSvg from "./sapIllus-Spot-SimpleTask.js";
import dotSvg from "./sapIllus-Dot-SimpleTask.js";import {
	IM_TITLE_NOTASKS,
	IM_SUBTITLE_NOTASKS,
} from "../generated/i18n/i18n-defaults.js";

const name = "SimpleTask";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_NOTASKS;
const subtitle = IM_SUBTITLE_NOTASKS;

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

export default "SimpleTask";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};