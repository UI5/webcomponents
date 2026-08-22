import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import dialogSvg from "./sapIllus-Dialog-NoNotifications.js";
import sceneSvg from "./sapIllus-Scene-NoNotifications.js";
import spotSvg from "./sapIllus-Spot-NoNotifications.js";
import dotSvg from "./sapIllus-Dot-NoNotifications.js";import {
	IM_TITLE_NONOTIFICATIONS,
	IM_SUBTITLE_NONOTIFICATIONS,
} from "../generated/i18n/i18n-defaults.js";

const name = "NoNotifications";
const set = "fiori";
const collection = "V4";
const title = IM_TITLE_NONOTIFICATIONS;
const subtitle = IM_SUBTITLE_NONOTIFICATIONS;

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

export default "NoNotifications";
export {
	dialogSvg,
	sceneSvg,
	spotSvg,
	dotSvg,
};