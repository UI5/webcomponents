import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-UploadCollection.js";
import sceneSvg from "./sapIllus-Scene-UploadCollection.js";
import spotSvg from "./sapIllus-Spot-UploadCollection.js";
import dotSvg from "./sapIllus-Dot-UploadCollection.js";import {
	IM_TITLE_UPLOADCOLLECTION,
	IM_SUBTITLE_UPLOADCOLLECTION,
} from "../generated/i18n/i18n-defaults.js";

const name = "UploadCollection";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_UPLOADCOLLECTION;
const subtitle = IM_SUBTITLE_UPLOADCOLLECTION;

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

export default "UploadCollection";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};