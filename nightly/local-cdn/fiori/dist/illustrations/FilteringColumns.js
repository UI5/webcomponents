import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-FilteringColumns.js";
import sceneSvg from "./sapIllus-Scene-FilteringColumns.js";
import spotSvg from "./sapIllus-Spot-FilteringColumns.js";
import dotSvg from "./sapIllus-Dot-FilteringColumns.js";import {
	IM_TITLE_FILTERTABLE,
	IM_SUBTITLE_FILTERTABLE,
} from "../generated/i18n/i18n-defaults.js";

const name = "FilteringColumns";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_FILTERTABLE;
const subtitle = IM_SUBTITLE_FILTERTABLE;

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

export default "FilteringColumns";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};