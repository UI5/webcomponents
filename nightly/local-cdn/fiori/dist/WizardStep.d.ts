import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 *
 * ### Overview
 *
 * A component that represents a logical step as part of the `ui5-wizard`.
 * It is meant to aggregate arbitrary HTML elements that form the content of a single step.
 *
 * ### Structure
 *
 * - Each wizard step has arbitrary content.
 * - Each wizard step might have texts - defined by the `titleText` and `subtitleText` properties.
 * - Each wizard step might have an icon - defined by the `icon` property.
 * - Each wizard step might display a number in place of the `icon`, when it's missing.
 *
 * ### Usage
 * The `ui5-wizard-step` component should be used only as slot of the `ui5-wizard` component
 * and should not be used standalone.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 1.0.0-rc.10
 * @public
 * @slot {Node[]} default - Defines the step content.
 */
declare class WizardStep extends UI5Element {
    /**
     * Defines the `titleText` of the step.
     *
     * **Note:** The text is displayed in the `ui5-wizard` navigation header.
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    titleText?: string;
    /**
     * Defines the `subtitleText` of the step.
     *
     * **Note:** the text is displayed in the `ui5-wizard` navigation header.
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    subtitleText?: string;
    /**
     * Defines the `icon` of the step.
     *
     * **Note:** The icon is displayed in the `ui5-wizard` navigation header.
     *
     * The SAP-icons font provides numerous options.
     * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default undefined
     * @public
     */
    icon?: string;
    /**
     * Defines if the step is `disabled`. When disabled the step is displayed,
     * but the user can't select the step by clicking or navigate to it with scrolling.
     *
     * **Note:** Step can't be `selected` and `disabled` at the same time.
     * In this case the `selected` property would take precedence.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines the step's `selected` state - the step that is currently active.
     *
     * **Note:** Step can't be `selected` and `disabled` at the same time.
     * In this case the `selected` property would take precedence.
     * @default false
     * @public
     */
    selected: boolean;
    /**
     * When `branching` is enabled a dashed line would be displayed after the step,
     * meant to indicate that the next step is not yet known and depends on user choice in the current step.
     *
     * **Note:** It is recommended to use `branching` on the last known step
     * and later add new steps when it becomes clear how the wizard flow should continue.
     * @default false
     * @public
     */
    branching: boolean;
    stretch?: boolean;
    stepContentAriaLabel?: string;
}
export default WizardStep;
