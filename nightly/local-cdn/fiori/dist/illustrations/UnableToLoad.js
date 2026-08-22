import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-UnableToLoad.js";
import sceneSvg from "./sapIllus-Scene-UnableToLoad.js";
import spotSvg from "./sapIllus-Spot-UnableToLoad.js";
import dotSvg from "./sapIllus-Dot-UnableToLoad.js";import {
	IM_TITLE_UNABLETOLOAD,
	IM_SUBTITLE_UNABLETOLOAD,
} from "../generated/i18n/i18n-defaults.js";

const name = "UnableToLoad";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_UNABLETOLOAD;
const subtitle = IM_SUBTITLE_UNABLETOLOAD;

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

export default "UnableToLoad";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};