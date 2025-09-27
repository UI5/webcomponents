import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-ResizeColumn.js";
import sceneSvg from "./sapIllus-Scene-ResizeColumn.js";
import spotSvg from "./sapIllus-Spot-ResizeColumn.js";
import dotSvg from "./sapIllus-Dot-ResizeColumn.js";import {
	IM_TITLE_RESIZECOLUMN,
	IM_SUBTITLE_RESIZECOLUMN,
} from "../generated/i18n/i18n-defaults.js";

const name = "ResizeColumn";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_RESIZECOLUMN;
const subtitle = IM_SUBTITLE_RESIZECOLUMN;

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

export default "ResizeColumn";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};