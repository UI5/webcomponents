import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { AccessibilityAttributes } from "@ui5/webcomponents-base/dist/types.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type ButtonDesign from "./types/ButtonDesign.js";
import type Button from "./Button.js";
type SplitButtonRootAccAttributes = Pick<AccessibilityAttributes, "hasPopup" | "roleDescription" | "title" | "ariaKeyShortcuts">;
type SplitButtonArrowButtonAccAtributes = Pick<AccessibilityAttributes, "hasPopup" | "expanded" | "title">;
type SplitButtonAccessibilityAttributes = {
    root?: SplitButtonRootAccAttributes;
    arrowButton?: SplitButtonArrowButtonAccAtributes;
};
/**
 * @class
 *
 * ### Overview
 *
 * `ui5-split-button` enables users to trigger actions. It is constructed of two separate actions -
 * default action and arrow action that can be activated by clicking or tapping, or by
 * pressing certain keyboard keys - `Space` or `Enter` for default action,
 * and `Arrow Down` or `Arrow Up` for arrow action.
 *
 * ### Usage
 *
 * `ui5-split-button` consists two separate buttons:
 *
 * - for the first one (default action) you can define some `text` or an `icon`, or both.
 * - the second one (arrow action) contains only `slim-arrow-down` icon.
 *
 * You can choose a `design` from a set of predefined types (the same as for ui5-button) that offer
 * different styling to correspond to the triggered action. Both text and arrow actions have the same design.
 *
 * You can set the `ui5-split-button` as enabled or disabled. Both parts of an enabled
 * `ui5-split-button` can be pressed by clicking or tapping it, or by certain keys, which changes
 * the style to provide visual feedback to the user that it is pressed or hovered over with
 * the mouse cursor. A disabled `ui5-split-button` appears inactive and any of the two buttons
 * cannot be pressed.
 *
 * ### Keyboard Handling
 *
 * - `Space` or `Enter` - triggers the default action
 * - `Shift` or `Escape` - if `Space` is pressed, releases the default action button without triggering the click event.
 * - `Arrow Down`, `Arrow Up`, `Alt`+`Arrow Down`, `Alt`+`Arrow Up`, or `F4` - triggers the arrow action
 * There are separate events that are fired on activating of `ui5-split-button` parts:
 *
 * - `click` for the first button (default action)
 * - `arrow-click` for the second button (arrow action)
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/SplitButton.js";`
 * @csspart button - Used to style the native button element
 * @csspart icon - Used to style the icon in the native button element
 * @csspart endIcon - Used to style the end icon in the native button element
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.1.0
 */
declare class SplitButton extends UI5Element {
    eventDetails: {
        click: void;
        "arrow-click": void;
    };
    /**
     * Defines the icon to be displayed as graphical element within the component.
     * The SAP-icons font provides numerous options.
     *
     * Example:
     *
     * See all available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default undefined
     * @public
     */
    icon?: string;
    /**
     * Defines whether the arrow button should have the active state styles or not.
     * @default false
     * @public
     * @since 1.21.0
     */
    activeArrowButton: boolean;
    /**
     * Defines the component design.
     * @default "Default"
     * @public
     */
    design: `${ButtonDesign}`;
    /**
     * Defines whether the component is disabled.
     * A disabled component can't be pressed or
     * focused, and it is not in the tab chain.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     */
    accessibleName?: string;
    /**
     * Defines the tabIndex of the component.
     * @default "0"
     * @private
     */
    _tabIndex: number;
    /**
     * Indicates if there is Shift or Escape key pressed while Space key is down.
     * @default false
     * @private
     */
    _shiftOrEscapePressedDuringSpace: boolean;
    /**
     * Defines the active state of the text button
     * @default false
     * @private
     */
    _textButtonActive: boolean;
    /**
     * Defines the state of the internal Button used for the Arrow button of the SplitButton.
     * @default false
     * @private
     */
    _activeArrowButton: boolean;
    /**
     * Defines the display of the end icon as a graphical element within the default action of the component after the button text.
     * The SAP-icons font provides different options.
     *
     * Example:
     *
     * See all available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default undefined
     * @private
     */
    _endIcon?: string;
    /**
     * Defines the visibility of the arrow button of the component.
     *
     * @default false
     * @private
     */
    _hideArrowButton: boolean;
    /**
     * Defines the additional accessibility attributes that will be applied to the component.
     * The `accessibilityAttributes` property accepts an object with the following optional fields:
     *
     * - **root**: Attributes that will be applied to the main (text) button.
     *   - **hasPopup**: Indicates the presence and type of popup triggered by the button.
     *     Accepts string values: `"dialog"`, `"grid"`, `"listbox"`, `"menu"`, or `"tree"`.
     *   - **roleDescription**: Provides a human-readable description for the role of the button.
     *     Accepts any string value.
     *   - **title**: Specifies a tooltip or description for screen readers.
     *     Accepts any string value.
     * 	- **ariaKeyShortcuts**: Defines keyboard shortcuts that activate or give focus to the button.
     *
     * - **arrowButton**: Attributes applied specifically to the arrow (split) button.
     *   - **hasPopup**: Indicates the presence and type of popup triggered by the arrow button.
     *     Accepts string values: `"dialog"`, `"grid"`, `"listbox"`, `"menu"`, or `"tree"`.
     *   - **expanded**: Indicates whether the popup triggered by the arrow button is currently expanded.
     *     Accepts boolean values: `true` or `false`.
     *
     * @default {}
     * @public
     * @since 2.13.0
     */
    accessibilityAttributes: SplitButtonAccessibilityAttributes;
    /**
     * Defines the text of the component.
     *
     * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
     * @public
     */
    text: DefaultSlot<Node>;
    static i18nBundle: I18nBundle;
    onBeforeRendering(): void;
    _handleMouseClick(e: UI5CustomEvent<Button, "click">): void;
    _onFocusOut(): void;
    handleTouchStart(e: TouchEvent | MouseEvent): void;
    _onInnerButtonFocusIn(e: FocusEvent): void;
    _onKeyDown(e: KeyboardEvent): void;
    _onKeyUp(e: KeyboardEvent): void;
    _resetActionButtonStates(): void;
    _fireClick(e?: Event): void;
    _fireArrowClick(e?: Event): void;
    _textButtonRelease(): void;
    _arrowButtonPress(e: MouseEvent): void;
    _arrowButtonRelease(e: MouseEvent): void;
    _setTabIndexValue(innerButtonPressed?: boolean): void;
    _onArrowButtonActiveStateChange(e: CustomEvent): void;
    /**
     * Checks if the pressed key is an arrow key.
     * @param e - keyboard event
     * @private
     */
    _isArrowKeyAction(e: KeyboardEvent): boolean;
    /**
     * Checks if the pressed key is a default action key (Space or Enter).
     * @param e - keyboard event
     * @private
     */
    _isDefaultAction(e: KeyboardEvent): boolean;
    /**
     * Handles the click event and the focus on the arrow button.
     * @param e - keyboard event
     * @private
     */
    _handleArrowButtonAction(e: UI5CustomEvent<Button, "click"> | KeyboardEvent): void;
    /**
     * Handles the default action and the active state of the respective button.
     * @param e - keyboard event
     * @private
     */
    _handleDefaultAction(e: KeyboardEvent): void;
    get effectiveActiveArrowButton(): boolean;
    get buttonTextContent(): string | null;
    get isTextButton(): boolean;
    get textButton(): Button | null | undefined;
    get arrowButton(): Button | null | undefined;
    get _computedAccessibilityAttributes(): SplitButtonAccessibilityAttributes;
    get accInfo(): {
        keyboardHint: string;
        description: string;
    };
    get arrowButtonTooltip(): string;
    get ariaLabelText(): string;
}
export default SplitButton;
export type { SplitButtonAccessibilityAttributes, };
