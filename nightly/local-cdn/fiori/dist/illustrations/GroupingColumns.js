import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-GroupingColumns.js";
import sceneSvg from "./sapIllus-Scene-GroupingColumns.js";
import spotSvg from "./sapIllus-Spot-GroupingColumns.js";
import dotSvg from "./sapIllus-Dot-GroupingColumns.js";import {
	IM_TITLE_GROUPTABLE,
	IM_SUBTITLE_GROUPTABLE,
} from "../generated/i18n/i18n-defaults.js";

const name = "GroupingColumns";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_GROUPTABLE;
const subtitle = IM_SUBTITLE_GROUPTABLE;

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

export default "GroupingColumns";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};