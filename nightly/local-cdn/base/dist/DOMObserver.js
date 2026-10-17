const observers = new WeakMap();
/**
 * @param node
 * @param callback
 * @param options
 */
const observeDOMNode = (node, callback, options) => {
    const observer = new MutationObserver(callback);
    observers.set(node, observer);
    observer.observe(node, options);
};
/**
 * @param node
 */
const unobserveDOMNode = (node) => {
    const observer = observers.get(node);
    if (observer) {
        observer.disconnect();
        observers.delete(node);
    }
};
export { observeDOMNode, unobserveDOMNode, };
//# sourceMappingURL=DOMObserver.js.map