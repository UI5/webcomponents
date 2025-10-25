import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-NoDimensionsSet.js";
import sceneSvg from "./sapIllus-Scene-NoDimensionsSet.js";
import spotSvg from "./sapIllus-Spot-NoDimensionsSet.js";
import dotSvg from "./sapIllus-Dot-NoDimensionsSet.js";import {
	IM_TITLE_NODIMENSIONSSET,
	IM_SUBTITLE_NODIMENSIONSSET,
} from "../generated/i18n/i18n-defaults.js";

const name = "NoDimensionsSet";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_NODIMENSIONSSET;
const subtitle = IM_SUBTITLE_NODIMENSIONSSET;

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

export default "NoDimensionsSet";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};