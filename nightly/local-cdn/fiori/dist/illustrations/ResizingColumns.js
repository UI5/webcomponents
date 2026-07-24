import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-ResizingColumns.js";
import sceneSvg from "./sapIllus-Scene-ResizingColumns.js";
import spotSvg from "./sapIllus-Spot-ResizingColumns.js";
import dotSvg from "./sapIllus-Dot-ResizingColumns.js";import {
	IM_TITLE_RESIZECOLUMN,
	IM_SUBTITLE_RESIZECOLUMN,
} from "../generated/i18n/i18n-defaults.js";

const name = "ResizingColumns";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_RESIZECOLUMN;
const subtitle = IM_SUBTITLE_RESIZECOLUMN;

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

export default "ResizingColumns";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};