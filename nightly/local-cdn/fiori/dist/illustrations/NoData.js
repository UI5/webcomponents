import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-NoData.js";
import sceneSvg from "./sapIllus-Scene-NoData.js";
import spotSvg from "./sapIllus-Spot-NoData.js";
import dotSvg from "./sapIllus-Dot-NoData.js";import {
	IM_TITLE_NODATA,
	IM_SUBTITLE_NODATA,
} from "../generated/i18n/i18n-defaults.js";

const name = "NoData";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_NODATA;
const subtitle = IM_SUBTITLE_NODATA;

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

export default "NoData";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};