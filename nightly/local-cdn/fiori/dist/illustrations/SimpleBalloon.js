import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-SimpleBalloon.js";
import sceneSvg from "./sapIllus-Scene-SimpleBalloon.js";
import spotSvg from "./sapIllus-Spot-SimpleBalloon.js";
import dotSvg from "./sapIllus-Dot-SimpleBalloon.js";import {
	IM_TITLE_BALLOONSKY,
	IM_SUBTITLE_BALLOONSKY,
} from "../generated/i18n/i18n-defaults.js";

const name = "SimpleBalloon";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_BALLOONSKY;
const subtitle = IM_SUBTITLE_BALLOONSKY;

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

export default "SimpleBalloon";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};