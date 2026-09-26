import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-DragFilesToUpload.js";
import sceneSvg from "./sapIllus-Scene-DragFilesToUpload.js";
import spotSvg from "./sapIllus-Spot-DragFilesToUpload.js";
import dotSvg from "./sapIllus-Dot-DragFilesToUpload.js";import {
	IM_TITLE_UPLOADCOLLECTION,
	IM_SUBTITLE_UPLOADCOLLECTION,
} from "../generated/i18n/i18n-defaults.js";

const name = "DragFilesToUpload";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_UPLOADCOLLECTION;
const subtitle = IM_SUBTITLE_UPLOADCOLLECTION;

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

export default "DragFilesToUpload";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};