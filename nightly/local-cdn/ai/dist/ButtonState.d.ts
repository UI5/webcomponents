import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 *
 * ### Overview
 *
 * `ui5-ai-button-state` is the item to use for defining states of `ui5-ai-button` components.
 *
 * ### Usage
 *
 * `ui5-ai-button-state` is an abstract element, representing a state of `ui5-ai-button`. It is meant to be used in the `default` slot
 * of `ui5-ai-button` and should not be used as standalone component.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/AiButtonState.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 2.0.0
 * @public
 * @experimental The **@ui5/webcomponents-ai** package (including ButtonState) is under active development and considered experimental. Component APIs are subject to change.
 * Furthermore, the package supports **Horizon** themes only.
 */
declare class ButtonState extends UI5Element {
    /**
     * Defines the name of the button state.
     * @default undefined
     * @public
     */
    name?: string;
    /**
     * Defines the text of the button in this state.
     * @default undefined
     * @public
     */
    text?: string;
    /**
     * Defines the icon to be displayed as graphical element within the component before the text.
     * The SAP-icons font provides numerous options.
     *
     * **Example:**
     *
     * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default undefined
     * @public
     */
    icon?: string;
    /**
     * Defines the icon to be displayed as graphical element within the component after the text.
     * The SAP-icons font provides numerous options.
     *
     * **Example:**
     *
     * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default undefined
     * @public
     */
    endIcon?: string;
    /**
     * Defines if the component is in split button mode.
     * @default false
     * @since 2.6.0
     * @public
     */
    showArrowButton: boolean;
}
export default ButtonState;
