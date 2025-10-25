import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-ReloadScreen.js";
import sceneSvg from "./sapIllus-Scene-ReloadScreen.js";
import spotSvg from "./sapIllus-Spot-ReloadScreen.js";
import dotSvg from "./sapIllus-Dot-ReloadScreen.js";import {
	IM_TITLE_UNABLETOLOAD,
	IM_SUBTITLE_UNABLETOLOAD,
} from "../generated/i18n/i18n-defaults.js";

const name = "ReloadScreen";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_UNABLETOLOAD;
const subtitle = IM_SUBTITLE_UNABLETOLOAD;

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

export default "ReloadScreen";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};