import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type SliderHandle from "./SliderHandle.js";
type Tickmark = {
    value: number;
    label?: string;
};
declare enum SliderScaleOrientation {
    /**
     * Horizontal orientation
     * @public
     */
    Horizontal = "Horizontal",
    /**
     * Vertical orientation
     * @private
     */
    Vertical = "Vertical"
}
declare class SliderScale extends UI5Element {
    /**
     * Defines the start value of the progress bar.
     * @default 0
     * @private
     */
    startValue: number;
    /**
     * Defines the end value of the progress bar.
     * @default 100
     * @private
     */
    endValue: number;
    /**
     * Defines the minimum value of the scale.
     * @default 0
     * @private
     */
    min: number;
    /**
     * Defines the maximum value of the scale.
     * @default 100
     * @private
     */
    max: number;
    /**
     * Defines the step value for tickmarks.
     * @default 1
     * @private
     */
    step: number;
    /**
     * Determines whether tickmarks should be displayed.
     * @default false
     * @private
     */
    showTickmarks: boolean;
    /**
     * Defines the orientation of the scale.
     * @default "Horizontal"
     * @private
     */
    orientation: `${SliderScaleOrientation}`;
    /**
     * Defines custom tickmarks to be displayed on the scale.
     * @default []
     * @private
     */
    tickmarks: Array<Tickmark>;
    /**
     * Defines the interval for displaying labels on tickmarks.
     * @default 0
     * @private
     */
    labelInterval: number;
    /**
     * Tab index for the progress bar.
     * @default -1
     * @private
     */
    progressTabIndex: number;
    /**
     * ARIA role for the progress bar.
     * @private
     */
    progressRole?: string;
    /**
     * ARIA aria-valuenow for the progress bar.
     * @private
     */
    progressAriaValueNow?: number;
    /**
     * ARIA aria-valuetext for the progress bar.
     * @private
     */
    progressAriaValueText?: string;
    /**
     * ARIA aria-label for the progress bar.
     * @private
     */
    progressAriaLabel?: string;
    /**
     * ARIA aria-disabled for the progress bar.
     * @private
     */
    progressAriaDisabled?: boolean;
    /**
     * Indicates that the progress bar is being pressed/dragged.
     * Used to show the focus outline during mouse interaction.
     * @default false
     * @private
     */
    progressPressed: boolean;
    /**
     * Indicates that the progress bar should show as focused.
     * Set by parent component (RangeSlider) when the progress bar has focus.
     * @default false
     * @private
     */
    progressFocused: boolean;
    /**
     * Indicates that the progress bar is being hovered.
     * @default false
     * @private
     */
    progressHovered: boolean;
    /**
     * @private
     */
    _labelInterval: number;
    _labelsOverlapping: boolean;
    _hiddenTickmarks: boolean;
    _resizeHandler: ResizeObserverCallback;
    _notResized: boolean;
    /**
     * Defines the component items.
     * @public
     */
    handles: Array<SliderHandle>;
    static get MIN_LABEL_DISTANCE(): number;
    static get MIN_SPACE_BETWEEN_TICKMARKS(): number;
    constructor();
    onEnterDOM(): void;
    onExitDOM(): void;
    onAfterRendering(): void;
    /**
     * Handle the responsiveness of the SliderScale's UI elements when resizing
     * @private
     */
    _handleResize(): void;
    /**
     * Calculates space between tickmarks
     * @private
     */
    _spaceBetweenTickmarks(): number;
    _onProgressMouseEnter(): void;
    _onProgressMouseLeave(): void;
    get _tickmarksCount(): number;
    get _visibleLabels(): {
        value: number;
        label: string;
        isInRange: boolean;
        position: number;
        showLabel: boolean;
        visible: boolean;
    }[];
    get _progressStyle(): {
        top: string;
        bottom: string;
        height: string;
        insetInlineStart?: undefined;
        width?: undefined;
    } | {
        insetInlineStart: string;
        width: string;
        top?: undefined;
        bottom?: undefined;
        height?: undefined;
    };
    get _allTickmarks(): Tickmark[];
    get _tickmarks(): {
        value: number;
        label: string;
        isInRange: boolean;
        position: number;
        showLabel: boolean;
        visible: boolean;
    }[];
}
export default SliderScale;
export { SliderScaleOrientation };
export type { Tickmark };
