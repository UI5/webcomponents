/**
 * Returns the tabbable elements within the provided HTMLElement.
 *
 * @public
 * @param { HTMLElement } el the component to operate on (component that slots or contains within its shadow root the items the user navigates among)
 * @returns { Array<HTMLElement> } the tabbable elements
 */
declare const getTabbableElements: (el: HTMLElement) => Array<HTMLElement>;
/**
 * Returns the last tabbable element within the provided HTMLElement.
 *
 * @public
 * @param { HTMLElement } el the component to operate on (component that slots or contains within its shadow root the items the user navigates among)
 * @returns { HTMLElement | null } the last tabbable element or "null" if not found
 */
declare const getLastTabbableElement: (el: HTMLElement) => HTMLElement | null;
export { getTabbableElements, getLastTabbableElement, };
