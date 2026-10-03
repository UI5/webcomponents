/**
 * @param node
 * @param callback
 * @param options
 */
declare const observeDOMNode: (node: Node, callback: MutationCallback, options?: MutationObserverInit) => void;
/**
 * @param node
 */
declare const unobserveDOMNode: (node: Node) => void;
export { observeDOMNode, unobserveDOMNode, };
