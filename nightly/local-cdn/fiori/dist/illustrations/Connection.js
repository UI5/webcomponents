import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-Connection.js";
import sceneSvg from "./sapIllus-Scene-Connection.js";
import spotSvg from "./sapIllus-Spot-Connection.js";
import dotSvg from "./sapIllus-Dot-Connection.js";import {
	IM_TITLE_UNABLETOLOAD,
	IM_SUBTITLE_UNABLETOLOAD,
} from "../generated/i18n/i18n-defaults.js";

const name = "Connection";
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

export default "Connection";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};