/**
 * Returns a singleton HTML element, inserted in given parent element of HTML page,
 * used mostly to store and share global resources between multiple UI5 Web Components runtimes.
 *
 * @param { string } tag the element tag/selector
 * @param { HTMLElement } parentElement the parent element to insert the singleton element instance
 * @param { Function } createEl a factory function for the element instantiation, by default document.createElement is used
 * @returns { Element }
 */
const getSingletonElementInstance = (tag, parentElement = document.body, createEl) => {
    let el = document.querySelector(tag);
    if (el) {
        return el;
    }
    el = createEl ? createEl() : document.createElement(tag);
    return parentElement.insertBefore(el, parentElement.firstChild);
};
export default getSingletonElementInstance;
//# sourceMappingURL=getSingletonElementInstance.js.map