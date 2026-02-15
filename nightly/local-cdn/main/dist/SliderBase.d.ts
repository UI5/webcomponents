import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
type StateStorage = {
    [key: string]: number | undefined;
};
type DirectionStart = "left" | "right";
/**
 * Fired when the value changes and the user has finished interacting with the slider.
 * @public
 */
declare abstract class SliderBase extends UI5Element {
    eventDetails: {
        "change": void;
        "input": void;
    };
    /**
     * Defines the minimum value of the slider.
     * @default 0
     * @public
     */
    min: number;
    /**
     * Defines the maximum value of the slider.
     * @default 100
     * @public
     */
    max: number;
    /**
     * Determines the name by which the component will be identified upon submission in an HTML form.
     *
     * **Note:** This property is only applicable within the context of an HTML Form element.
     * @default undefined
     * @public
     * @since 2.0.0
     */
    name?: string;
    /**
     * Defines the size of the slider's selection intervals (e.g. min = 0, max = 10, step = 5 would result in possible selection of the values 0, 5, 10).
     *
     * **Note:** If set to 0 the slider handle movement is disabled. When negative number or value other than a number, the component fallbacks to its default value.
     * @default 1
     * @public
     */
    step: number;
    /**
     * Displays a label with a value on every N-th step.
     *
     * **Note:** The step and tickmarks properties must be enabled.
     * Example - if the step value is set to 2 and the label interval is also specified to 2 - then every second
     * tickmark will be labelled, which means every 4th value number.
     * @default 0
     * @public
     */
    labelInterval: number;
    /**
     * Enables tickmarks visualization for each step.
     *
     * **Note:** The step must be a positive number.
     * @default false
     * @public
     */
    showTickmarks: boolean;
    /**
     * Enables handle tooltip displaying the current value.
     * @default false
     * @public
     */
    showTooltip: boolean;
    /**
     *
     * Indicates whether input fields should be used as tooltips for the handles.
     *
     * **Note:** Setting this option to true will only work if showTooltip is set to true.
     * **Note:** In order for the component to comply with the accessibility standard, it is recommended to set the editableTooltip property to true.
     * @default false
     * @public
     */
    editableTooltip: boolean;
    /**
     * Defines whether the slider is in disabled state.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     * @since 1.4.0
     */
    accessibleName?: string;
    /**
     * @private
     */
    value: number;
    /**
     * @private
     */
    _tooltipsOpen: boolean;
    _labelsOverlapping: boolean;
    _hiddenTickmarks: boolean;
    _resizeHandler: ResizeObserverCallback;
    _moveHandler: (e: TouchEvent | MouseEvent) => void;
    _upHandler: (e: TouchEvent | MouseEvent) => void;
    _windowMouseoutHandler: (e: MouseEvent) => void;
    _stateStorage: StateStorage;
    notResized: boolean;
    _isUserInteraction: boolean;
    _isInnerElementFocusing: boolean;
    _oldNumberOfLabels?: number;
    _oldMin?: number;
    _oldMax?: number;
    _labelWidth: number;
    _labelValues?: Array<string>;
    _valueOnInteractionStart?: number;
    formElementAnchor(): Promise<HTMLElement | undefined>;
    constructor();
    _handleMove(e: TouchEvent | MouseEvent): void;
    _handleUp(e: TouchEvent | MouseEvent): void;
    _onmousedown(e: TouchEvent | MouseEvent): void;
    _handleActionKeyPress(e: Event): void;
    abstract tickmarksObject: Array<boolean>;
    abstract _ariaLabelledByText: string;
    static get ACTION_KEYS(): ((event: KeyboardEvent) => boolean)[];
    static get MIN_SPACE_BETWEEN_TICKMARKS(): number;
    static get TOOLTIP_VISIBILITY(): {
        VISIBLE: string;
        HIDDEN: string;
    };
    static get renderer(): import("@ui5/webcomponents-base/dist/UI5Element.js").Renderer;
    static get styles(): string;
    get classes(): {
        root: {
            "ui5-slider-root-phone": boolean;
        };
        labelContainer: {
            "ui5-slider-hidden-labels": boolean;
        };
    };
    onEnterDOM(): void;
    onExitDOM(): void;
    onAfterRendering(): void;
    /** Shows the tooltip(s) if the `showTooltip` property is set to true
     * @private
     */
    _onmouseover(): void;
    /**
     * Hides the tooltip(s) if the `showTooltip` property is set to true
     * @private
     */
    _onmouseout(): void;
    _onkeydown(e: KeyboardEvent): void;
    _onKeyupBase(): void;
    /**
     * Flags if an inner element is currently being focused
     * @private
     */
    _preserveFocus(isFocusing: boolean): void;
    /**
     * Return if an inside element within the component is currently being focused
     * @private
     */
    _isFocusing(): boolean;
    /**
     * Prevent focus out when inner element within the component is currently being in process of focusing in.
     * @private
     */
    _preventFocusOut(): void;
    /**
     * Manages the focus between the component's inner elements
     * @protected
     */
    focusInnerElement(): void;
    /**
     * Handle the responsiveness of the Slider's UI elements when resizing
     * @private
     */
    _handleResize(): void;
    /**
     * Called when the user starts interacting with the slider.
     * After a down event on the slider root, listen for move events on window, so the slider value
     * is updated even if the user drags the pointer outside the slider root.
     * @protected
     */
    handleDownBase(e: TouchEvent | MouseEvent): number;
    /**
     * Forward the focus to an inner inner part within the component on press
     * @private
     */
    _handleFocusOnMouseDown(e: TouchEvent | MouseEvent): void;
    /**
     * Called when the user finish interacting with the slider
     * Fires an `change` event indicating a final value change, after user interaction is finished.
     * @protected
     */
    handleUpBase(): void;
    /**
     * Updates state storage for the value-related property
     * Fires an `input` event indicating a value change via interaction that is not yet finished.
     * @protected
     */
    updateStateStorageAndFireInputEvent(valueType: string): void;
    /**
     * Goes through the key shortcuts available for the component and returns 'true' if the event is triggered by one.
     * @private
     */
    static _isActionKey(e: KeyboardEvent): boolean;
    /**
     * Locks the given value between min and max boundaries based on slider properties
     * @protected
     */
    static clipValue(value: number, min: number, max: number): number;
    /**
     * Sets the slider value from an event
     * @protected
     */
    static getValueFromInteraction(e: TouchEvent | MouseEvent, stepSize: number, min: number, max: number, boundingClientRect: DOMRect, directionStart: DirectionStart): number;
    /**
     * "Stepify" the raw value - calculate the new value depending on the specified step property
     * @protected
     */
    static getSteppedValue(value: number, stepSize: number, min: number): number;
    /**
     * Gets pageX value from event on user interaction with the Slider
     * @protected
     */
    static getPageXValueFromEvent(e: TouchEvent | MouseEvent): number;
    /**
     * Computes the new value (in %) from the pageX position of the cursor.
     * Returns the value rounded to a precision of at most 2 digits after decimal point.
     * @protected
     */
    static computedValueFromPageX(pageX: number, min: number, max: number, boundingClientRect: DOMRect, directionStart: DirectionStart): number;
    /**
     * Calculates the precision (decimal places) of a number, returns 0 if integer
     * Handles scientific notation cases.
     * @private
     */
    static _getDecimalPrecisionOfNumber(value: number): number;
    /**
     * In order to always keep the visual UI representation and the internal
     * state in sync, the component has a 'state storage' that is updated when the
     * current state is changed due to a user action.
     *
     * Check if the previously saved state is outdated. That would mean
     * a property has been changed programmatically because the previous state
     * is always updated in the interaction handlers.
     *
     * Will return true if any of the properties is not equal to its previously
     * stored value.
     * @protected
     */
    isCurrentStateOutdated(): boolean;
    /**
     * Returns the last stored value of a property
     * @protected
     */
    getStoredPropertyState(prop: string): number | undefined;
    /**
     * Check if one or more properties have been updated compared to their last
     * saved values in the state storage.
     * @protected
     */
    isPropertyUpdated(...props: Array<string>): boolean;
    /**
     * Updates the previously saved in the _stateStorage values of one or more properties.
     * @protected
     */
    storePropertyState(...props: Array<string>): void;
    /**
     * Returns the start side of a direction - left for LTR, right for RTL
     */
    get directionStart(): "left" | "right";
    /**
     * Calculates the labels amount, width and text and creates them
     * @private
     */
    _createLabels(): void;
    _handleActionKeyPressBase(e: KeyboardEvent, affectedPropName: string): number;
    static _isIncreaseValueAction(e: KeyboardEvent, directionStart: DirectionStart): boolean;
    static _isBigStepAction(e: KeyboardEvent): boolean;
    get _tickmarksCount(): number;
    /**
     * Calculates space between tickmarks
     * @private
     */
    _spaceBetweenTickmarks(): number;
    /**
     * Notify in case of a invalid step value type
     * @private
     */
    _validateStep(step: number): void;
    get _labels(): string[];
    /**
     * Normalizes a new `step` property value.
     * If tickmarks are enabled recreates them according to it.
     * @private
     */
    get _effectiveStep(): number;
    get _effectiveMin(): number;
    get _effectiveMax(): number;
    get _tabIndex(): 0 | -1;
    get _ariaKeyshortcuts(): "F2" | undefined;
    get _ariaDescribedByHandleText(): "ui5-slider-InputDesc" | undefined;
    get _ariaLabel(): string;
    get _ariaDescribedByInputText(): string;
    get _ariaLabelledByInputText(): string;
}
export default SliderBase;
