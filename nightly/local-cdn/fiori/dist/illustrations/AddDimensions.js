import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-AddDimensions.js";
import sceneSvg from "./sapIllus-Scene-AddDimensions.js";
import spotSvg from "./sapIllus-Spot-AddDimensions.js";
import dotSvg from "./sapIllus-Dot-AddDimensions.js";import {
	IM_TITLE_ADDDIMENSIONS,
	IM_SUBTITLE_ADDDIMENSIONS,
} from "../generated/i18n/i18n-defaults.js";

const name = "AddDimensions";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_ADDDIMENSIONS;
const subtitle = IM_SUBTITLE_ADDDIMENSIONS;

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

export default "AddDimensions";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};