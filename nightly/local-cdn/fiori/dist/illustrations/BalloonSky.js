import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-BalloonSky.js";
import sceneSvg from "./sapIllus-Scene-BalloonSky.js";
import spotSvg from "./sapIllus-Spot-BalloonSky.js";
import dotSvg from "./sapIllus-Dot-BalloonSky.js";import {
	IM_TITLE_BALLOONSKY,
	IM_SUBTITLE_BALLOONSKY,
} from "../generated/i18n/i18n-defaults.js";

const name = "BalloonSky";
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

export default "BalloonSky";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};