import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-UploadToCloud.js";
import sceneSvg from "./sapIllus-Scene-UploadToCloud.js";
import spotSvg from "./sapIllus-Spot-UploadToCloud.js";
import dotSvg from "./sapIllus-Dot-UploadToCloud.js";import {
	IM_TITLE_UPLOADTOCLOUD,
	IM_SUBTITLE_UPLOADTOCLOUD,
} from "../generated/i18n/i18n-defaults.js";

const name = "UploadToCloud";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_UPLOADTOCLOUD;
const subtitle = IM_SUBTITLE_UPLOADTOCLOUD;

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

export default "UploadToCloud";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};