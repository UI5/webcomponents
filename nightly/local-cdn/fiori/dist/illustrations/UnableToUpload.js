import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-UnableToUpload.js";
import sceneSvg from "./sapIllus-Scene-UnableToUpload.js";
import spotSvg from "./sapIllus-Spot-UnableToUpload.js";
import dotSvg from "./sapIllus-Dot-UnableToUpload.js";import {
	IM_TITLE_UNABLETOUPLOAD,
	IM_SUBTITLE_UNABLETOUPLOAD,
} from "../generated/i18n/i18n-defaults.js";

const name = "UnableToUpload";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_UNABLETOUPLOAD;
const subtitle = IM_SUBTITLE_UNABLETOUPLOAD;

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

export default "UnableToUpload";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};