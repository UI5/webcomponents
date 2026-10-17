import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-NoChartData.js";
import sceneSvg from "./sapIllus-Scene-NoChartData.js";
import spotSvg from "./sapIllus-Spot-NoChartData.js";
import dotSvg from "./sapIllus-Dot-NoChartData.js";import {
	IM_TITLE_NODIMENSIONSSET,
	IM_SUBTITLE_NODIMENSIONSSET,
} from "../generated/i18n/i18n-defaults.js";

const name = "NoChartData";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_NODIMENSIONSSET;
const subtitle = IM_SUBTITLE_NODIMENSIONSSET;

unsafeRegisterIllustration(name, {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
	title,
	subtitle,
	set,
	collection,
});

export default "NoChartData";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};