import type UI5Element from "./UI5Element.js";
type BeforeComponentRenderCallback = (webComponent: UI5Element) => void;
/**
 * Schedules a render task (if not already scheduled) to render the component
 *
 * @param webComponent
 * @returns {Promise}
 */
declare const renderDeferred: (webComponent: UI5Element) => Promise<void>;
/**
 * Renders a component synchronously and adds it to the registry of rendered components
 *
 * @param webComponent
 */
declare const renderImmediately: (webComponent: UI5Element) => void;
/**
 * Cancels the rendering of a component, if awaiting to be rendered, and removes it from the registry of rendered components
 *
 * @param webComponent
 */
declare const cancelRender: (webComponent: UI5Element) => void;
declare const renderFinished: () => Promise<void>;
/**
 * Re-renders all UI5 Elements on the page, with the option to specify filters to rerender only some components.
 *
 * Usage:
 * reRenderAllUI5Elements() -> re-renders all components
 * reRenderAllUI5Elements({tag: "ui5-button"}) -> re-renders only instances of ui5-button
 * reRenderAllUI5Elements({rtlAware: true}) -> re-renders only rtlAware components
 * reRenderAllUI5Elements({languageAware: true}) -> re-renders only languageAware components
 * reRenderAllUI5Elements({themeAware: true}) -> re-renders only themeAware components
 * reRenderAllUI5Elements({rtlAware: true, languageAware: true}) -> re-renders components that are rtlAware or languageAware
 * etc...
 *
 * @public
 * @param {object|undefined} filters - Object with keys that can be "rtlAware" or "languageAware"
 * @returns {Promise<void>}
 */
declare const reRenderAllUI5Elements: (filters?: {
    tag?: string;
    rtlAware?: boolean;
    languageAware?: boolean;
    themeAware?: boolean;
}) => Promise<void>;
declare const attachBeforeComponentRender: (listener: BeforeComponentRenderCallback) => void;
declare const detachBeforeComponentRender: (listener: BeforeComponentRenderCallback) => void;
export { renderDeferred, renderImmediately, cancelRender, renderFinished, reRenderAllUI5Elements, attachBeforeComponentRender, detachBeforeComponentRender, };
