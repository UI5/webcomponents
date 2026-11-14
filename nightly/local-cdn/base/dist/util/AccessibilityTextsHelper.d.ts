import type UI5Element from "../UI5Element.js";
type MutationCallback = () => void;
declare const getEffectiveAriaLabelText: (el: HTMLElement) => string | undefined;
/**
 *
 * @param {HTMLElement} el Defines the HTMLElement, for which you need to get all related texts
 */
declare const getAllAccessibleNameRefTexts: (el: HTMLElement) => string;
/**
 * @param {HTMLElement} el Defines the HTMLElement, for which you need to get all related "label for" texts
 */
declare const getAssociatedLabelForTexts: (el: HTMLElement) => string | undefined;
declare const registerUI5Element: (el: UI5Element, callback: MutationCallback) => void;
declare const deregisterUI5Element: (el: UI5Element) => void;
declare const getEffectiveAriaDescriptionText: (el: HTMLElement) => string | undefined;
declare const getAllAccessibleDescriptionRefTexts: (el: HTMLElement) => string;
export { getEffectiveAriaLabelText, getAssociatedLabelForTexts, registerUI5Element, deregisterUI5Element, getAllAccessibleNameRefTexts, getEffectiveAriaDescriptionText, getAllAccessibleDescriptionRefTexts, };
