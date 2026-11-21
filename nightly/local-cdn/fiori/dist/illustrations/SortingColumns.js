import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-SortingColumns.js";
import sceneSvg from "./sapIllus-Scene-SortingColumns.js";
import spotSvg from "./sapIllus-Spot-SortingColumns.js";
import dotSvg from "./sapIllus-Dot-SortingColumns.js";import {
	IM_TITLE_SORTCOLUMN,
	IM_SUBTITLE_SORTCOLUMN,
} from "../generated/i18n/i18n-defaults.js";

const name = "SortingColumns";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_SORTCOLUMN;
const subtitle = IM_SUBTITLE_SORTCOLUMN;

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

export default "SortingColumns";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};