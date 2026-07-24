import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import "./Icon.js";
/**
 * @class
 * ### Overview
 * The `ui5-input-icon` component represents an interactive icon that can be placed inside an `ui5-input` component.
 * Unlike the standard `ui5-icon`, this component provides button-like behavior with hover, focus, and active states,
 * matching the visual style of the input's built-in clear icon.
 *
 * ### Usage
 * Use `ui5-input-icon` for interactive icons that users can click (e.g., search, voice input, camera).
 * For decorative icons, use the standard `ui5-icon` component instead.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/InputIcon.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.25.0
 */
declare class InputIcon extends UI5Element {
    eventDetails: {
        click: void;
    };
    /**
     * Defines the icon name to be displayed.
     *
     * **Note:** Make sure you import the desired icon before using it.
     *
     * @default undefined
     * @public
     */
    name?: string;
    /**
     * Defines the accessible name of the icon.
     *
     * **Note:** This property is used for accessibility purposes and will be announced by screen readers.
     *
     * @default undefined
     * @public
     */
    accessibleName?: string;
    /**
     * Defines whether the tooltip is shown.
     *
     * **Note:** The tooltip text should be provided via the `accessible-name` property.
     *
     * @default false
     * @public
     */
    showTooltip: boolean;
    /**
     * Defines the value state of the icon.
     *
     * **Note:** This property should match the parent input's value state for consistent styling.
     *
     * @default "None"
     * @public
     */
    valueState: `${ValueState}`;
    /**
     * Defines whether the icon is disabled.
     *
     * **Note:** Disabled icons are not interactive and do not fire click events.
     *
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines whether the icon is readonly.
     *
     * **Note:** Readonly icons are not interactive and do not fire click events.
     *
     * @default false
     * @public
     */
    readonly: boolean;
    /**
     * @private
     */
    _pressed: boolean;
    /**
     * @private
     */
    _focused: boolean;
    /**
     * @private
     */
    _parentDisabled: boolean;
    _onclick(e: MouseEvent): void;
    _onmousedown(): void;
    _onmouseup(): void;
    _onmouseleave(): void;
    _onfocus(): void;
    _onblur(): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    get effectiveTabIndex(): 0 | -1;
    get effectiveAriaLabel(): string | undefined;
    get effectiveTitle(): string | undefined;
}
export default InputIcon;
