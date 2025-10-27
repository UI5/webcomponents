import DynamicDateRangeInputTemplate from "./DynamicDateRangeInputTemplate.js";
import DynamicDateRangePopoverTemplate from "./DynamicDateRangePopoverTemplate.js";

import type DynamicDateRange from "./DynamicDateRange.js";

export default function DynamicDateRangeTemplate(this: DynamicDateRange) {
	return [
		DynamicDateRangeInputTemplate.call(this),
		DynamicDateRangePopoverTemplate.call(this),
	];
}
