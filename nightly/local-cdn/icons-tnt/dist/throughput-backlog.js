import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/throughput-backlog.js";
import { pathData as pathDatav3 } from "./v3/throughput-backlog.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "tnt/throughput-backlog";
export { getPathData, ltr, accData };