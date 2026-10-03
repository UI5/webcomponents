import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type ToastPlacement from "./types/ToastPlacement.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-toast` is a small, non-disruptive popup for success or information messages that
 * disappears automatically after a few seconds.
 *
 * ### Usage
 *
 * #### When to use:
 *
 * - You want to display a short success or information message.
 * - You do not want to interrupt users while they are performing an action.
 * - You want to confirm a successful action.
 *
 * #### When not to use:
 *
 * - You want to display error or warning message.
 * - You want to interrupt users while they are performing an action.
 * - You want to make sure that users read the message before they leave the page.
 * - You want users to be able to copy some part of the message text.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Toast.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.6
 * @slot {Array<Node>} default
 * Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 */
declare class Toast extends UI5Element {
    eventDetails: {
        "close": void;
    };
    /**
     * Defines the duration in milliseconds for which component
     * remains on the screen before it's automatically closed.
     *
     * **Note:** The minimum supported value is `500` ms
     * and even if a lower value is set, the duration would remain `500` ms.
     * @default 3000
     * @public
     */
    duration: number;
    /**
     * Defines the placement of the component.
     * @default "BottomCenter"
     * @public
     */
    placement: `${ToastPlacement}`;
    /**
     * Indicates whether the component is open (visible).
     * @default false
     * @public
     * @since 2.0.0
     */
    open: boolean;
    /**
     * Indicates whether the component is hovered.
     * @private
     */
    hover: boolean;
    /**
     * Indicates whether the toast could be focused
     * This happens when ctr / command + shift + m is pressed
     * @private
     */
    focusable: boolean;
    /**
     * Indicates whether the toast is focused
     * This happens when ctr / command + shift + m is pressed
     * @private
     */
    focused: boolean;
    _onfocusinFn: () => void;
    _onfocusoutFn: () => void;
    _onkeydownFn: (e: KeyboardEvent) => void;
    _onmouseoverFn: () => void;
    _onmouseleaveFn: () => void;
    _ontransitionendFn: () => void;
    constructor();
    onBeforeRendering(): void;
    onAfterRendering(): void;
    _onfocusin(): void;
    _onfocusout(): void;
    /**
     * If the minimum duration is lower than 500ms, we force
     * it to be 500ms, as described in the documentation.
     * @private
     */
    get effectiveDuration(): number;
    _ontransitionend(): void;
    _onmouseover(): void;
    _onmouseleave(): void;
    _onkeydown(e: KeyboardEvent): void;
    get _tabindex(): 0 | -1;
    onEnterDOM(): void;
    onExitDOM(): void;
}
export default Toast;
