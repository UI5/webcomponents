import type { IFormItem } from "../Form.js";

const breakpoints = ["S", "M", "L", "XL"] as const;
type Breakpoint = typeof breakpoints[number];
const MAX_FORM_ITEM_CELLS = 12;
const DEFAULT_FORM_ITEM_LAYOUT = "4fr 8fr 0fr";
const DEFAULT_FORM_ITEM_LAYOUT_S = "1fr";

function getFormItemLayoutValue(breakpoint: Breakpoint, labelSpan: number | undefined = 0, emptySpan: number | undefined = 0): string {
	if (isValidFormItemLayout(labelSpan, emptySpan)) {
		return labelSpan === MAX_FORM_ITEM_CELLS ? `1fr` : `${labelSpan}fr ${MAX_FORM_ITEM_CELLS - (labelSpan + emptySpan)}fr ${emptySpan}fr`;
	}

	// eslint-disable-next-line
	console.warn(`Form :: invalid usage of emptySpan and/or labelSpan in ${breakpoint} size. The labelSpan must be <=12 and when emptySpace is used - their combined values must not exceed 11.`);
	return breakpoint === "S" ? DEFAULT_FORM_ITEM_LAYOUT_S : DEFAULT_FORM_ITEM_LAYOUT;
}

function isValidFormItemLayout(labelSpan: number, emptySpan: number) {
	return emptySpan === 0 ? labelSpan <= MAX_FORM_ITEM_CELLS : labelSpan + emptySpan <= MAX_FORM_ITEM_CELLS - 1;
}

function getGroupsColSpan(cols: number, groups: number, index: number, group: IFormItem): number {
	// Case 0: column span is set from outside.
	if (group.columnSpan) {
		return group.columnSpan;
	}

	// CASE 1: The number of available columns match the number of groups, or only 1 column is available - each group takes 1 column.
	// For example: 1 column - 1 group, 2 columns - 2 groups, 3 columns - 3 groups, 4columns - 4 groups
	if (cols === 1 || cols <= groups) {
		return 1;
	}

	// CASE 2: The number of available columns IS multiple of the number of groups.
	// For example: 2 column - 1 group, 3 columns - 1 groups, 4 columns - 1 group, 4 columns - 2 groups
	if (cols % groups === 0) {
		return cols / groups;
	}

	// CASE 3: The number of available columns IS NOT multiple of the number of groups.
	const MIN_COL_SPAN = 1;
	const delta = cols - groups;

	// 7 cols & 4 groups => 2, 2, 2, 1
	if (delta <= groups) {
		return index < delta ? MIN_COL_SPAN + 1 : MIN_COL_SPAN;
	}

	// 7 cols & 3 groups => 3, 2, 2
	return index === 0 ? MIN_COL_SPAN + (delta - groups) + 1 : MIN_COL_SPAN + 1;
}

export {
	getFormItemLayoutValue,
	getGroupsColSpan,
	DEFAULT_FORM_ITEM_LAYOUT,
	DEFAULT_FORM_ITEM_LAYOUT_S,
};

export type {
	Breakpoint,
};
