import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-SimpleBell.js";
import sceneSvg from "./sapIllus-Scene-SimpleBell.js";
import spotSvg from "./sapIllus-Spot-SimpleBell.js";
import dotSvg from "./sapIllus-Dot-SimpleBell.js";import {
	IM_TITLE_NONOTIFICATIONS,
	IM_SUBTITLE_NONOTIFICATIONS,
} from "../generated/i18n/i18n-defaults.js";

const name = "SimpleBell";
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

export default "SimpleBell";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};