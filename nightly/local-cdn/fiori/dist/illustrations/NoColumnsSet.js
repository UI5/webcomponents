import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-NoColumnsSet.js";
import sceneSvg from "./sapIllus-Scene-NoColumnsSet.js";
import spotSvg from "./sapIllus-Spot-NoColumnsSet.js";
import dotSvg from "./sapIllus-Dot-NoColumnsSet.js";import {
	IM_TITLE_NOCOLUMNSSET,
	IM_SUBTITLE_NOCOLUMNSSET,
} from "../generated/i18n/i18n-defaults.js";

const name = "NoColumnsSet";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_NOCOLUMNSSET;
const subtitle = IM_SUBTITLE_NOCOLUMNSSET;

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

export default "NoColumnsSet";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};