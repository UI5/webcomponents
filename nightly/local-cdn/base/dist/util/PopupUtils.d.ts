declare const getFocusedElement: () => HTMLElement | null;
declare const isFocusedElementWithinNode: (node: HTMLElement) => boolean;
declare const isClickInRect: (e: MouseEvent | TouchEvent, rect: DOMRect) => boolean;
declare const getClosedPopupParent: (el: HTMLElement) => HTMLElement;
export { getFocusedElement, isClickInRect, getClosedPopupParent, isFocusedElementWithinNode, };
