import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-AddingColumns.js";
import sceneSvg from "./sapIllus-Scene-AddingColumns.js";
import spotSvg from "./sapIllus-Spot-AddingColumns.js";
import dotSvg from "./sapIllus-Dot-AddingColumns.js";import {
	IM_TITLE_ADDCOLUMN,
	IM_SUBTITLE_ADDCOLUMN,
} from "../generated/i18n/i18n-defaults.js";

const name = "AddingColumns";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_ADDCOLUMN;
const subtitle = IM_SUBTITLE_ADDCOLUMN;

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

export default "AddingColumns";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};