import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/less.js";
import SwitchDesign from "./types/SwitchDesign.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-switch` component is used for changing between binary states.
 *
 * The component can display texts, that will be switched, based on the component state, via the `textOn` and `textOff` properties,
 * but texts longer than 3 letters will be cutted off.
 *
 * However, users are able to customize the width of `ui5-switch` with pure CSS (`<ui5-switch style="width: 200px">`), and set widths, depending on the texts they would use.
 *
 * Note: the component would not automatically stretch to fit the whole text width.
 *
 * ### Keyboard Handling
 * The state can be changed by pressing the Space and Enter keys.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Switch";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 0.8.0
 * @csspart slider - Used to style the track, where the handle is being slid
 * @csspart text-on - Used to style the `textOn` property text
 * @csspart text-off - Used to style the `textOff` property text
 * @csspart handle - Used to style the handle of the switch
 */
declare class Switch extends UI5Element implements IFormInputElement {
    eventDetails: {
        change: void;
        "value-changed": void;
    };
    /**
     * Defines the component design.
     *
     * **Note:** If `Graphical` type is set,
     * positive and negative icons will replace the `textOn` and `textOff`.
     * @public
     * @default "Textual"
     */
    design: `${SwitchDesign}`;
    /**
     * Defines if the component is checked.
     *
     * **Note:** The property can be changed with user interaction,
     * either by cliking the component, or by pressing the `Enter` or `Space` key.
     * @default false
     * @formEvents change
     * @formProperty
     * @public
     */
    checked: boolean;
    /**
     * Defines whether the component is disabled.
     *
     * **Note:** A disabled component is noninteractive.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines the text, displayed when the component is checked.
     *
     * **Note:** We recommend using short texts, up to 3 letters (larger texts would be cut off).
     * @default undefined
     * @public
     */
    textOn?: string;
    /**
     * Defines the text, displayed when the component is not checked.
     *
     * **Note:** We recommend using short texts, up to 3 letters (larger texts would be cut off).
     * @default undefined
     * @public
     */
    textOff?: string;
    /**
     * Sets the accessible ARIA name of the component.
     *
     * **Note**: We recommend that you set an accessibleNameRef pointing to an external label or at least an `accessibleName`.
     * Providing an `accessibleNameRef` or an `accessibleName` is mandatory in the cases when `textOn` and `textOff` properties aren't set.
     * @default undefined
     * @public
     * @since 1.2.0
     */
    accessibleName?: string;
    /**
     * Receives id(or many ids) of the elements that label the component.
     *
     * **Note**: We recommend that you set an accessibleNameRef pointing to an external label or at least an `accessibleName`.
     * Providing an `accessibleNameRef` or an `accessibleName` is mandatory in the cases when `textOn` and `textOff` properties aren't set.
     * @default undefined
     * @public
     * @since 1.1.0
     */
    accessibleNameRef?: string;
    /**
     * Defines the tooltip of the component.
     *
     * **Note:** If applicable an external label reference should always be the preferred option to provide context to the `ui5-switch` component over a tooltip.
     * @default undefined
     * @public
     * @since 1.9.0
     */
    tooltip?: string;
    /**
     * Defines whether the component is required.
     * @default false
     * @public
     * @since 1.16.0
     */
    required: boolean;
    /**
     * Determines the name by which the component will be identified upon submission in an HTML form.
     *
     * **Note:** This property is only applicable within the context of an HTML Form element.
     * @default undefined
     * @public
     * @since 1.16.0
     */
    name?: string;
    /**
     * Defines the form value of the component.
     * @default ""
     * @since 2.12.0
     * @public
     */
    value: string;
    _cancelAction: boolean;
    _isSpacePressed: boolean;
    static i18nBundle: I18nBundle;
    get formValidityMessage(): string;
    get formValidity(): ValidityStateFlags;
    formElementAnchor(): Promise<HTMLElement | undefined>;
    get formFormattedValue(): string | null;
    get sapNextIcon(): "accept" | "less";
    _onclick(): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    toggle(): void;
    get graphical(): boolean;
    get hasNoLabel(): boolean;
    get _textOn(): string | undefined;
    get _textOff(): string | undefined;
    get effectiveTabIndex(): 0 | undefined;
    get effectiveAriaDisabled(): "true" | undefined;
    get accessibilityOnText(): string | undefined;
    get accessibilityOffText(): string | undefined;
    get hiddenText(): string | undefined;
    get ariaLabelText(): string;
}
export default Switch;
