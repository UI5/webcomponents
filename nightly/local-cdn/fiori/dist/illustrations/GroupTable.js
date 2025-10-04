import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-GroupTable.js";
import sceneSvg from "./sapIllus-Scene-GroupTable.js";
import spotSvg from "./sapIllus-Spot-GroupTable.js";
import dotSvg from "./sapIllus-Dot-GroupTable.js";import {
	IM_TITLE_GROUPTABLE,
	IM_SUBTITLE_GROUPTABLE,
} from "../generated/i18n/i18n-defaults.js";

const name = "GroupTable";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_GROUPTABLE;
const subtitle = IM_SUBTITLE_GROUPTABLE;

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

export default "GroupTable";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};