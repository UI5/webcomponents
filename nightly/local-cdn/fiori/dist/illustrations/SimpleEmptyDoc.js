import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-SimpleEmptyDoc.js";
import sceneSvg from "./sapIllus-Scene-SimpleEmptyDoc.js";
import spotSvg from "./sapIllus-Spot-SimpleEmptyDoc.js";
import dotSvg from "./sapIllus-Dot-SimpleEmptyDoc.js";import {
	IM_TITLE_NODATA,
	IM_SUBTITLE_NODATA,
} from "../generated/i18n/i18n-defaults.js";

const name = "SimpleEmptyDoc";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_NODATA;
const subtitle = IM_SUBTITLE_NODATA;

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

export default "SimpleEmptyDoc";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};