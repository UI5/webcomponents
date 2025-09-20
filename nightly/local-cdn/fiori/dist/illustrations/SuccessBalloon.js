import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-SuccessBalloon.js";
import sceneSvg from "./sapIllus-Scene-SuccessBalloon.js";
import spotSvg from "./sapIllus-Spot-SuccessBalloon.js";
import dotSvg from "./sapIllus-Spot-SuccessBalloon.js";import {
	IM_TITLE_BALLOONSKY,
	IM_SUBTITLE_BALLOONSKY,
} from "../generated/i18n/i18n-defaults.js";

const name = "SuccessBalloon";
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

export default "SuccessBalloon";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};