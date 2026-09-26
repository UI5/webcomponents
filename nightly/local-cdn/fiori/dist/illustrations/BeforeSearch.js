import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-BeforeSearch.js";
import sceneSvg from "./sapIllus-Scene-BeforeSearch.js";
import spotSvg from "./sapIllus-Spot-BeforeSearch.js";
import dotSvg from "./sapIllus-Dot-BeforeSearch.js";import {
	IM_TITLE_BEFORESEARCH,
	IM_SUBTITLE_BEFORESEARCH,
} from "../generated/i18n/i18n-defaults.js";

const name = "BeforeSearch";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_BEFORESEARCH;
const subtitle = IM_SUBTITLE_BEFORESEARCH;

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

export default "BeforeSearch";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};