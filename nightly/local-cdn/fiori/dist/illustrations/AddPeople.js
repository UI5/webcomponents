import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-AddPeople.js";
import sceneSvg from "./sapIllus-Scene-AddPeople.js";
import spotSvg from "./sapIllus-Spot-AddPeople.js";
import dotSvg from "./sapIllus-Dot-AddPeople.js";import {
	IM_TITLE_ADDPEOPLE,
	IM_SUBTITLE_ADDPEOPLE,
} from "../generated/i18n/i18n-defaults.js";

const name = "AddPeople";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_ADDPEOPLE;
const subtitle = IM_SUBTITLE_ADDPEOPLE;

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

export default "AddPeople";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};