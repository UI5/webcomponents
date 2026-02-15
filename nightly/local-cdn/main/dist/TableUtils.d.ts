import type Table from "./Table.js";
import type TableRow from "./TableRow.js";
declare const isInstanceOfTable: (object: any) => object is Table;
declare const isSelectionCell: (e: Event) => boolean;
declare const isHeaderSelectionCell: (e: Event) => boolean;
declare const findRowInPath: (composedPath: Array<EventTarget>) => TableRow;
declare const findVerticalScrollContainer: (element: HTMLElement) => HTMLElement;
declare const scrollElementIntoView: (scrollContainer: HTMLElement, element: HTMLElement, stickyElements: HTMLElement[], isRtl: boolean) => void;
declare const isFeature: <T>(element: any, identifier: string) => element is T;
declare const throttle: (callback: () => void) => () => void;
declare const toggleAttribute: (element: HTMLElement, attribute: string, condition: boolean | undefined, value?: string) => void;
/**
 * Checks if a given width is valid for a column.
 *
 * @param width Width string to check
 * @returns {boolean} true if the width is valid, false otherwise
 */
declare const isValidColumnWidth: (width: string | undefined) => width is string;
export { isInstanceOfTable, isSelectionCell, isHeaderSelectionCell, findRowInPath, findVerticalScrollContainer, scrollElementIntoView, isFeature, throttle, toggleAttribute, isValidColumnWidth, };
