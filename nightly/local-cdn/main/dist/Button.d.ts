import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { AccessibilityAttributes, AriaRole } from "@ui5/webcomponents-base";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ButtonDesign from "./types/ButtonDesign.js";
import ButtonType from "./types/ButtonType.js";
import ButtonAccessibleRole from "./types/ButtonAccessibleRole.js";
import type ButtonBadge from "./ButtonBadge.js";
/**
 * Interface for components that may be used as a button inside numerous higher-order components
 * @public
 */
interface IButton extends HTMLElement, ITabbable {
    nonInteractive: boolean;
}
type ButtonAccessibilityAttributes = Pick<AccessibilityAttributes, "expanded" | "hasPopup" | "controls" | "ariaKeyShortcuts" | "ariaLabel">;
type ButtonClickEventDetail = {
    originalEvent: MouseEvent;
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-button` component represents a simple push button.
 * It enables users to trigger actions by clicking or tapping the `ui5-button`, or by pressing
 * certain keyboard keys, such as Enter.
 *
 * ### Usage
 *
 * For the `ui5-button` UI, you can define text, icon, or both. You can also specify
 * whether the text or the icon is displayed first.
 *
 * You can choose from a set of predefined types that offer different
 * styling to correspond to the triggered action.
 *
 * You can set the `ui5-button` as enabled or disabled. An enabled
 * `ui5-button` can be pressed by clicking or tapping it. The button changes
 * its style to provide visual feedback to the user that it is pressed or hovered over with
 * the mouse cursor. A disabled `ui5-button` appears inactive and cannot be pressed.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Button.js";`
 * @csspart button - Used to style the native button element
 * @csspart icon - Used to style the icon in the native button element
 * @csspart endIcon - Used to style the end icon in the native button element
 * @constructor
 * @extends UI5Element
 * @implements { IButton }
 * @public
 */
declare class Button extends UI5Element implements IButton {
    eventDetails: {
        "click": ButtonClickEventDetail;
        "active-state-change": void;
    };
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
     * Defines the icon, displayed as graphical element within the component.
     * The SAP-icons font provides numerous options.
     *
     * Example:
     * See all the available icons within the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default undefined
     * @public
     */
    icon?: string;
    /**
     * Defines the icon, displayed as graphical element within the component after the button text.
     *
     * **Note:** It is highly recommended to use `endIcon` property only together with `icon` and/or `text` properties.
     * Usage of `endIcon` only should be avoided.
     *
     * The SAP-icons font provides numerous options.
     *
     * Example:
     * See all the available icons within the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default undefined
     * @public
     */
    endIcon?: string;
    /**
     * When set to `true`, the component will
     * automatically submit the nearest HTML form element on `press`.
     *
     * **Note:** This property is only applicable within the context of an HTML Form element.`
     * @default false
     * @public
     * @deprecated Set the "type" property to "Submit" to achieve the same result. The "submits" property is ignored if "type" is set to any value other than "Button".
     */
    submits: boolean;
    /**
     * Defines the tooltip of the component.
     *
     * **Note:** A tooltip attribute should be provided for icon-only buttons, in order to represent their exact meaning/function.
     * @default undefined
     * @public
     * @since 1.2.0
     */
    tooltip?: string;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleName?: string;
    /**
     * Receives id(or many ids) of the elements that label the component.
     * @default undefined
     * @public
     * @since 1.1.0
     */
    accessibleNameRef?: string;
    /**
     * Defines the additional accessibility attributes that will be applied to the component.
     * The following fields are supported:
     *
     * - **expanded**: Indicates whether the button, or another grouping element it controls, is currently expanded or collapsed.
     * Accepts the following string values: `true` or `false`
     *
     * - **hasPopup**: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button.
     * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
     *
     * - **ariaLabel**: Defines the accessible ARIA name of the component.
     * Accepts any string value.
     *
     *  - **ariaKeyShortcuts**: Defines keyboard shortcuts that activate or give focus to the button.
     *
     * - **controls**: Identifies the element (or elements) whose contents or presence are controlled by the button element.
     * Accepts a lowercase string value.
     *
     * @public
     * @since 1.2.0
     * @default {}
     */
    accessibilityAttributes: ButtonAccessibilityAttributes;
    /**
     * Defines the accessible description of the component.
     * @default undefined
     * @public
     * @since 2.5.0
     */
    accessibleDescription?: string;
    /**
     * Defines whether the button has special form-related functionality.
     *
     * **Note:** This property is only applicable within the context of an HTML Form element.
     * @default "Button"
     * @public
     * @since 1.15.0
     */
    type: `${ButtonType}`;
    /**
     * Describes the accessibility role of the button.
     *
     * **Note:** Use <code>ButtonAccessibleRole.Link</code> role only with a press handler, which performs a navigation. In all other scenarios the default button semantics are recommended.
     *
     * @default "Button"
     * @public
     * @since 1.23
     */
    accessibleRole: `${ButtonAccessibleRole}`;
    /**
     * Used to switch the active state (pressed or not) of the component.
     * @private
     */
    active: boolean;
    /**
     * Defines if a content has been added to the default slot
     * @private
     */
    iconOnly: boolean;
    /**
     * Indicates if the elements has a slotted icon
     * @private
     */
    hasIcon: boolean;
    /**
     * Indicates if the elements has a slotted end icon
     * @private
     */
    hasEndIcon: boolean;
    /**
     * Indicates if the element is focusable
     * @private
     */
    nonInteractive: boolean;
    /**
     * Defines whether the button shows a loading indicator.
     *
     * **Note:** If set to `true`, a busy indicator component will be displayed on the related button.
     * @default false
     * @public
     * @since 2.13.0
     */
    loading: boolean;
    /**
     * Specifies the delay in milliseconds before the loading indicator appears within the associated button.
     * @default 1000
     * @public
     * @since 2.13.0
     */
    loadingDelay: number;
    /**
     * The button's current title is determined by either the `tooltip` property or the icon's tooltip, with the `tooltip`
     * property taking precedence if both are set.
     * @private
     */
    buttonTitle?: string;
    /**
     * @private
     */
    _iconSettings: object;
    /**
     * Defines the tabIndex of the component.
     * @private
     */
    forcedTabIndex: string;
    /**
     * @since 1.0.0-rc.13
     * @private
     */
    _isTouch: boolean;
    _cancelAction: boolean;
    _isSpacePressed: boolean;
    /**
     * Defines the text of the component.
     *
     * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
     * @public
     */
    text: DefaultSlot<Node>;
    /**
     * Adds a badge to the button.
     * @since 2.7.0
     * @public
     */
    badge: Slot<ButtonBadge>;
    _deactivate: () => void;
    _onclickBound: (e: MouseEvent) => void;
    _clickHandlerAttached: boolean;
    static i18nBundle: I18nBundle;
    constructor();
    _ontouchstart(): void;
    onEnterDOM(): void;
    onExitDOM(): void;
    onBeforeRendering(): Promise<void>;
    _setBadgeOverlayStyle(): void;
    _onclick(e: MouseEvent): void;
    _onmousedown(): void;
    _ontouchend(e: TouchEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _onfocusout(): void;
    _setActiveState(active: boolean): void;
    get hasButtonType(): boolean;
    get isIconOnly(): boolean;
    static typeTextMappings(): Record<string, I18nText>;
    getDefaultTooltip(): Promise<string | undefined> | undefined;
    get buttonTypeText(): string;
    get effectiveAccRole(): AriaRole;
    get tabIndexValue(): number | undefined;
    get ariaLabelText(): string;
    get ariaDescriptionText(): string | undefined;
    get _computedAccessibilityAttributes(): ButtonAccessibilityAttributes;
    get accessibilityInfo(): {
        description: string | undefined;
        role: import("@ui5/webcomponents-base/dist/thirdparty/preact/jsx.js").JSXInternal.AriaRole;
        disabled: boolean;
        children: DefaultSlot<Node>;
        type: string;
    };
    get effectiveAccRoleTranslation(): string;
    get effectiveBadgeDescriptionText(): string;
    get _isSubmit(): boolean;
    get _isReset(): boolean;
    get shouldRenderBadge(): boolean;
}
export default Button;
export type { ButtonAccessibilityAttributes, ButtonClickEventDetail, IButton, };
