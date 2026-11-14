type ResizeObserverCallback = () => Promise<void> | void;
/**
 * Allows to register/deregister resize observers for a DOM element
 *
 * @public
 * @class
  */
declare class ResizeHandler {
    /**
     * @public
     * @param element UI5 Web Component or DOM Element to be observed
     * @param callback Callback to be executed
     */
    static register(element: HTMLElement, callback: ResizeObserverCallback): void;
    /**
     * @public
     * @param element UI5 Web Component or DOM Element to be unobserved
     * @param callback Callback to be removed
     */
    static deregister(element: HTMLElement, callback: ResizeObserverCallback): void;
}
export default ResizeHandler;
export type { ResizeObserverCallback, };
