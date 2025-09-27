import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-AddColumn.js";
import sceneSvg from "./sapIllus-Scene-AddColumn.js";
import spotSvg from "./sapIllus-Spot-AddColumn.js";
import dotSvg from "./sapIllus-Dot-AddColumn.js";import {
	IM_TITLE_ADDCOLUMN,
	IM_SUBTITLE_ADDCOLUMN,
} from "../generated/i18n/i18n-defaults.js";

const name = "AddColumn";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_ADDCOLUMN;
const subtitle = IM_SUBTITLE_ADDCOLUMN;

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

export default "AddColumn";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};