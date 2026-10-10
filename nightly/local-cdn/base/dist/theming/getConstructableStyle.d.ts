import type UI5Element from "../UI5Element.js";
/**
 * Returns (and caches) a constructable style sheet for a web component class
 * Note: Chrome
 * @param ElementClass
 * @returns {*}
 */
declare const getConstructableStyle: (ElementClass: typeof UI5Element) => CSSStyleSheet[];
export default getConstructableStyle;
