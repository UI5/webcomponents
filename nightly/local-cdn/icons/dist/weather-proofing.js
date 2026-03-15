import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/weather-proofing.js";
import { pathData as pathDatav5 } from "./v5/weather-proofing.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "weather-proofing";
export { getPathData, ltr, accData };