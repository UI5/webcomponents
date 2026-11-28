import type { IFormItem } from "../Form.js";
declare const breakpoints: readonly ["S", "M", "L", "XL"];
type Breakpoint = typeof breakpoints[number];
declare const DEFAULT_FORM_ITEM_LAYOUT = "4fr 8fr 0fr";
declare const DEFAULT_FORM_ITEM_LAYOUT_S = "1fr";
declare function getFormItemLayoutValue(breakpoint: Breakpoint, labelSpan?: number | undefined, emptySpan?: number | undefined): string;
declare function getGroupsColSpan(cols: number, groups: number, index: number, group: IFormItem, breakpoint: Breakpoint): number;
export { getFormItemLayoutValue, getGroupsColSpan, DEFAULT_FORM_ITEM_LAYOUT, DEFAULT_FORM_ITEM_LAYOUT_S, };
export type { Breakpoint, };
