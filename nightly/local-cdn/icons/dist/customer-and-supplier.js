import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/customer-and-supplier.js";
import { pathData as pathDatav5 } from "./v5/customer-and-supplier.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "customer-and-supplier";
export { getPathData, ltr, accData };