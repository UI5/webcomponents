import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-ReceiveAppreciation.js";
import sceneSvg from "./sapIllus-Scene-ReceiveAppreciation.js";
import spotSvg from "./sapIllus-Spot-ReceiveAppreciation.js";
import dotSvg from "./sapIllus-Dot-ReceiveAppreciation.js";import {
	IM_TITLE_BALLOONSKY,
	IM_SUBTITLE_BALLOONSKY,
} from "../generated/i18n/i18n-defaults.js";

const name = "ReceiveAppreciation";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_BALLOONSKY;
const subtitle = IM_SUBTITLE_BALLOONSKY;

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

export default "ReceiveAppreciation";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};