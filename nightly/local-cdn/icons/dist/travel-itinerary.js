import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/travel-itinerary.js";
import { pathData as pathDatav5 } from "./v5/travel-itinerary.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "travel-itinerary";
export { getPathData, ltr, accData };