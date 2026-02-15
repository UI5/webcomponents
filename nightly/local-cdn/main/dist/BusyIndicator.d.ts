import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { Timeout } from "@ui5/webcomponents-base/dist/types.js";
import type BusyIndicatorSize from "./types/BusyIndicatorSize.js";
import BusyIndicatorTextPlacement from "./types/BusyIndicatorTextPlacement.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-busy-indicator` signals that some operation is going on and that the
 * user must wait. It does not block the current UI screen so other operations could be triggered in parallel.
 * It displays 3 dots and each dot expands and shrinks at a different rate, resulting in a cascading flow of animation.
 *
 * ### Usage
 * For the `ui5-busy-indicator` you can define the size, the text and whether it is shown or hidden.
 * In order to hide it, use the "active" property.
 *
 * In order to show busy state over an HTML element, simply nest the HTML element in a `ui5-busy-indicator` instance.
 *
 * **Note:** Since `ui5-busy-indicator` has `display: inline-block;` by default and no width of its own,
 * whenever you need to wrap a block-level element, you should set `display: block` to the busy indicator as well.
 *
 * #### When to use:
 *
 * - The user needs to be able to cancel the operation.
 * - Only part of the application or a particular component is affected.
 *
 * #### When not to use:
 *
 * - The operation takes less than one second.
 * - You need to block the screen and prevent the user from starting another activity.
 * - Do not show multiple busy indicators at once.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/BusyIndicator.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @slot {Array<Node>} default - Determines the content over which the component will appear.
 * @since 0.12.0
 */
declare class BusyIndicator extends UI5Element {
    /**
     * Defines text to be displayed below the component. It can be used to inform the user of the current operation.
     * @public
     * @default undefined
     * @since 1.0.0-rc.7
     */
    text?: string;
    /**
     * Defines the size of the component.
     * @default "M"
     * @public
     */
    size: `${BusyIndicatorSize}`;
    /**
     * Defines if the busy indicator is visible on the screen. By default it is not.
     * @default false
     * @public
     */
    active: boolean;
    /**
     * Defines the delay in milliseconds, after which the busy indicator will be visible on the screen.
     * @default 1000
     * @public
     */
    delay: number;
    /**
     * Defines the placement of the text.
     *
     * @default "Bottom"
     * @public
     */
    textPlacement: `${BusyIndicatorTextPlacement}`;
    /**
     * Defines if the component is currently in busy state.
     * @private
     */
    _isBusy: boolean;
    _keydownHandler: (e: KeyboardEvent) => void;
    _preventEventHandler: (e: KeyboardEvent) => void;
    _busyTimeoutId?: Timeout;
    focusForward?: boolean;
    static i18nBundle: I18nBundle;
    constructor();
    onEnterDOM(): void;
    onExitDOM(): void;
    get ariaTitle(): string;
    get labelId(): string | undefined;
    get textPosition(): {
        top: boolean | "" | undefined;
        bottom: boolean | "" | undefined;
    };
    get hasContent(): boolean;
    onBeforeRendering(): void;
    _handleKeydown(e: KeyboardEvent): void;
    _preventEvent(e: KeyboardEvent): void;
    /**
     * Moves the focus to busy area when coming with SHIFT + TAB
     */
    _redirectFocus(e: FocusEvent): void;
}
export default BusyIndicator;
