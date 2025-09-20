import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-FilterTable.js";
import sceneSvg from "./sapIllus-Scene-FilterTable.js";
import spotSvg from "./sapIllus-Spot-FilterTable.js";
import dotSvg from "./sapIllus-Dot-FilterTable.js";import {
	IM_TITLE_FILTERTABLE,
	IM_SUBTITLE_FILTERTABLE,
} from "../generated/i18n/i18n-defaults.js";

const name = "FilterTable";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_FILTERTABLE;
const subtitle = IM_SUBTITLE_FILTERTABLE;

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

export default "FilterTable";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};