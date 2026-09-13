import type UI5Element from "../UI5Element.js";
type i18nDecorator = (target: typeof UI5Element, propertyName: string) => void;
/**
 * A decorator that converts a static class member into an accessor for the i18n bundle with a specified name
 *
 * @param { string } bundleName name of the i18n bundle to load
 * @returns { i18nDecorator }
 *
 * ```ts
 * class MyComponnet extends UI5Element {
 *   @i18n('@ui5/webcomponents')
 *   i18nBundle: I18nBundle;
 * }
 * ```
 */
declare const i18n: (bundleName: string) => i18nDecorator;
export default i18n;
