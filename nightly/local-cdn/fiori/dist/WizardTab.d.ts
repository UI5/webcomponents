import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { AccessibilityAttributes } from "@ui5/webcomponents-base/dist/types.js";
type WizardTabAccessibilityAttributes = Pick<AccessibilityAttributes, "ariaSetsize" | "ariaPosinset" | "ariaLabel" | "ariaCurrent">;
/**
 * @class
 *
 * ### Overview
 * Private component, used internally by the `ui5-wizard`
 * to represent a "step" in the navigation header of the `ui5-wizard`.
 *
 * ### Usage
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/WizardTab.js";` (imported with <ui5-wizard>)
 * @constructor
 * @extends UI5Element
 * @private
 */
declare class WizardTab extends UI5Element implements ITabbable {
    eventDetails: {
        "focused": void;
        "selection-change-requested": void;
    };
    /**
     * Defines the `icon` of the step.
     * @default undefined
     * @private
     */
    icon?: string;
    /**
     * Defines the `titleText` of the step.
     * @default undefined
     * @private
     * @since 1.0.0-rc.15
     */
    titleText?: string;
    /**
     * Defines the `subtitleText` of the step.
     * @default undefined
     * @private
     * @since 1.0.0-rc.15
     */
    subtitleText?: string;
    /**
     * Defines the number that will be displayed in place of the `icon`, when it's missing.
     * @default undefined
     * @private
     */
    number?: string;
    /**
     * Defines if the step is `disabled` - the step is not responding to user interaction.
     * @default false
     * @private
     */
    disabled: boolean;
    /**
     * Defines if the step is `selected`.
     * @default false
     * @private
     */
    selected: boolean;
    /**
     * Defines if the step's separator is hidden or not.
     * @default false
     * @private
     */
    hideSeparator: boolean;
    /**
     * Defines if the step's separator is active or not.
     * @default false
     * @private
     */
    activeSeparator: boolean;
    /**
     * Defines if the step's separator is dashed or not.
     * @default false
     * @private
     */
    branchingSeparator: boolean;
    /**
     * Defines the tabindex of the step.
     * @default "-1"
     * @private
     */
    forcedTabIndex?: string;
    /**
     * @private
     */
    _wizardTabAccInfo?: WizardTabAccessibilityAttributes;
    _onclick(): void;
    _onkeyup(e: KeyboardEvent): void;
    get effectiveTabIndex(): 0 | -1 | undefined;
    _onfocusin(): void;
    get hasTexts(): string | undefined;
    get accInfo(): WizardTabAccessibilityAttributes;
}
export default WizardTab;
