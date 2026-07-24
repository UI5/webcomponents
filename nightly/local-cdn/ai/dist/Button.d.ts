import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type SplitButton from "@ui5/webcomponents/dist/SplitButton.js";
import type ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import type ButtonState from "./ButtonState.js";
import "./ButtonState.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { AccessibilityAttributes } from "@ui5/webcomponents-base/dist/types.js";
type AIButtonRootAccessibilityAttributes = Pick<AccessibilityAttributes, "hasPopup" | "roleDescription" | "title" | "ariaKeyShortcuts">;
type AIButtonArrowButtonAccessibilityAttributes = Pick<AccessibilityAttributes, "hasPopup" | "expanded" | "title">;
type AIButtonAccessibilityAttributes = {
    root?: AIButtonRootAccessibilityAttributes;
    arrowButton?: AIButtonArrowButtonAccessibilityAttributes;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-ai-button` component serves as a button for AI-related scenarios. Users can trigger actions by clicking or tapping the `ui5-ai-button`
 * or by pressing keyboard keys like [Enter] or [Space].
 *
 * ### Usage
 *
 * For the `ui5-ai-button` user interface, you can define one or more button states by placing `ui5-ai-button-state` components in their default slot.
 * Each state has a name for identification and can include text, an icon, and an end icon, as needed for its purpose.
 * You can define a split mode for the `ui5-ai-button`, which will results in displaying an arrow button for additional actions.
 *
 * You can choose from a set of predefined designs for `ui5-ai-button` (as in `ui5-button`) to match the desired styling.
 *
 * The `ui5-ai-button` can be activated by clicking or tapping it. You can change the button state in the click event handler. When the button is
 * in split mode, you can activate the default button action by clicking or tapping it, or by pressing keyboard keys like [Enter] or [Space].
 * You can activate the arrow button by clicking or tapping it, or by pressing keyboard keys like [Arrow Up], [Arrow Down], or [F4].
 * To display additional actions, you can attach a menu to the arrow button.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-ai/dist/Button.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.0.0
 * @public
 * @experimental The **@ui5/webcomponents-ai** package (including Button and ButtonState) is under active development and considered experimental. Component APIs are subject to change.
 * Furthermore, the package supports **Horizon** themes only.
 */
declare class Button extends UI5Element {
    eventDetails: {
        "click": void;
        "arrow-button-click": void;
    };
    /**
     * Defines the component design.
     * @default "Default"
     * @public
     */
    design?: `${ButtonDesign}`;
    /**
     * Defines whether the component is disabled.
     * A disabled component can't be pressed or
     * focused, and it is not in the tab chain.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines the current state of the component.
     *
     * @default undefined
     * @public
     */
    state?: string;
    /**
     * Defines the active state of the arrow button in split mode.
     * Set to true when the button is in split mode and a menu with additional options
     * is opened by the arrow button. Set back to false when the menu is closed.
     * @default false
     * @public
     * @since 2.6.0
     */
    arrowButtonPressed: boolean;
    /**
     * Defines the additional accessibility attributes that will be applied to the component.
     *
     * This property allows for fine-tuned control of ARIA attributes for screen reader support.
     * It accepts an object with the following optional fields:
     *
     * - **root**: Accessibility attributes that will be applied to the root element.
     *   - **hasPopup**: Indicates the availability and type of interactive popup element (such as a menu or dialog).
     *     Accepts string values: `"dialog"`, `"grid"`, `"listbox"`, `"menu"`, or `"tree"`.
     *   - **roleDescription**: Defines a human-readable description for the button's role.
     *     Accepts any string value.
     *   - **title**: Specifies a tooltip or description for screen readers.
     *     Accepts any string value.
     *  - **ariaKeyShortcuts**: Defines keyboard shortcuts that activate or focus the button.
     *
     * - **arrowButton**: Accessibility attributes that will be applied to the arrow (split) button element.
     *   - **hasPopup**: Indicates the type of popup triggered by the arrow button.
     *     Accepts string values: `"dialog"`, `"grid"`, `"listbox"`, `"menu"`, or `"tree"`.
     *   - **expanded**: Indicates whether the popup controlled by the arrow button is currently expanded.
     *     Accepts boolean values: `true` or `false`.
     *
     * @public
     * @since 2.6.0
     * @default {}
    */
    accessibilityAttributes: AIButtonAccessibilityAttributes;
    /**
     * Keeps the current state object of the component.
     * @private
     */
    _currentStateObject?: ButtonState;
    /**
     * Determines if the button is in icon-only mode.
     * This property is animation related only.
     * @default false
     * @private
     */
    iconOnly?: boolean | undefined;
    /**
     * Defines the available states of the component.
     * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that
     * you only use `ui5-ai-button-state` components in order to preserve the intended design.
     * @public
     */
    states: DefaultSlot<ButtonState>;
    _splitButton?: SplitButton;
    _hiddenSplitButton?: SplitButton;
    static i18nBundleAi: I18nBundle;
    get _hideArrowButton(): boolean;
    get _effectiveState(): string;
    get _effectiveStateObject(): ButtonState | undefined;
    get _stateIconOnly(): boolean;
    get _stateText(): string | undefined;
    get _stateIcon(): string | undefined;
    get _stateEndIcon(): string | undefined;
    get _hasText(): boolean;
    onBeforeRendering(): void;
    /**
     * Starts the fade-out animation.
     * @private
     */
    _fadeOut(): Promise<void>;
    /**
     * Starts the fade-in animation.
     * @private
     */
    _fadeIn(): void;
    /**
     * Resets the fade phases when the animation is completed.
     * @private
     */
    _resetFade(): void;
    /**
     * Handles the click event.
     * @private
     */
    _onClick(e: CustomEvent): void;
    /**
     * Handles the arrow-button-click event when `ui5-ai-button` is in split mode.
     * @private
     */
    _onArrowClick(e: CustomEvent): void;
    get _computedAccessibilityAttributes(): AIButtonAccessibilityAttributes;
}
export default Button;
export type { AIButtonAccessibilityAttributes, };
