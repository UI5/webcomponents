/**
 * Returns a singleton HTML element, inserted in given parent element of HTML page,
 * used mostly to store and share global resources between multiple UI5 Web Components runtimes.
 *
 * @param { string } tag the element tag/selector
 * @param { HTMLElement } parentElement the parent element to insert the singleton element instance
 * @param { Function } createEl a factory function for the element instantiation, by default document.createElement is used
 * @returns { Element }
 */
declare const getSingletonElementInstance: (tag: string, parentElement?: HTMLElement, createEl?: () => Element) => Element;
export default getSingletonElementInstance;
