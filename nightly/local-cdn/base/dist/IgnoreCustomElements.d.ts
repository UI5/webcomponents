/**
 * Ignores all custom HTML elements with a given tag prefix to improve the rendering performance of the UI5 Web Components.
 *
 * **When used:** the UI5 Web Components framework treats all custom HTML elements,
 * starting with the given prefix as if they are standard HTML elements, such as: `div`, `span`, etc, without additional processing.
 *
 * **When not used:** the framework waits for the slotted children to be defined and registered first,
 * because the state or visual appearance of the parent may rely on the slotted elements/children.
 *
 * **Note:** We recommend using `ignoreCustomElements` when slotting custom HTML elements (with only semantic purpose)
 * inside UI5 Web Components, to improve the time to render.
 *
 * @public
 * @since 1.14.0
 * @param { string } tagPrefix
 */
declare const ignoreCustomElements: (tagPrefix: string) => void;
/**
 * Determines whether custom elements with the given tag should be ignored.
 *
 * @private
 * @param { string } tag
 */
declare const shouldIgnoreCustomElement: (tag: string) => boolean;
export { ignoreCustomElements, shouldIgnoreCustomElement, };
