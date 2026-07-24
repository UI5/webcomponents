import type UI5Element from "./UI5Element.js";
declare class RenderQueue {
    list: Array<UI5Element>;
    lookup: Set<UI5Element>;
    constructor();
    add(webComponent: UI5Element): void;
    remove(webComponent: UI5Element): void;
    shift(): UI5Element | undefined;
    isEmpty(): boolean;
    isAdded(webComponent: UI5Element): boolean;
    /**
     * Processes the whole queue by executing the callback on each component,
     * while also imposing restrictions on how many times a component may be processed.
     *
     * @param callback - function with one argument (the web component to be processed)
     */
    process(callback: (el: UI5Element) => void): void;
}
export default RenderQueue;
