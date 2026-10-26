import type UI5Element from "../UI5Element.js";

type i18nDecorator = (target: typeof UI5Element, propertyName: string) => void;

/**
 * A decorator that converts a static class member into an accessor for the i18n bundle with a specified name.
 * It also automatically marks the component as language-aware, so it re-renders whenever the language changes
 * and translated strings are always up-to-date — removing the need to set `languageAware: true` in `@customElement`.
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
const i18n = (bundleName: string): i18nDecorator => {
	return (target: typeof UI5Element, propertyName: string) => {
		if (!target.metadata.i18n) {
			target.metadata.i18n = {};
		}

		Object.defineProperty(target, propertyName, {
			get() {
				return target.i18nBundles[bundleName];
			},
			set() {},
		});

		target.metadata.i18n[propertyName] = {
			bundleName,
			target,
		};
		target.metadata.languageAware = true;
	};
};

export default i18n;
