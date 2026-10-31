/**
 * Returns if the HTMLElement is tabbable.
 *
 * @public
 * @param { HTMLElement } el the component to operate on (component that slots or contains within its shadow root the items the user navigates among)
 * @returns { boolean } true if the element is tabbable or false - if not
 */
declare const isElementTabbable: (el: HTMLElement) => boolean;
export default isElementTabbable;
