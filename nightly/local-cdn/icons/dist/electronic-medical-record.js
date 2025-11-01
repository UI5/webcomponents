import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/electronic-medical-record.js";
import { pathData as pathDatav5 } from "./v5/electronic-medical-record.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "electronic-medical-record";
export { getPathData, ltr, accData };