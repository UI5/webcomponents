import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
type TimePickerClockChangeEventDetail = {
    value: number;
    stringValue: string;
    finalChange: boolean;
};
type TimePickerClockItem = {
    angle?: number;
    item?: string;
};
type TimePickerClockSelection = {
    showMarker?: boolean;
    itemClasses?: string;
};
type TimePickerClockDimensions = {
    radius: number;
    centerX: number;
    centerY: number;
    dotHeight: number;
    numberHeight: number;
    activeRadiusMax: number;
    activeRadiusMin: number;
    offsetX: number;
    offsetY: number;
};
type TimePickerClockSelectedItem = TimePickerClockItem & TimePickerClockSelection;
/**
 * @class
 *
 * ### Overview
 *
 * `ui5-time-picker-clock` allows selecting of hours,minutes or seconds (depending on property set).
 * The component supports interactions with mouse, touch and mouse wheel.
 * The step for displaying or selecting of items can be configured.
 *
 * `ui5-time-picker-clock` is used as part of `ui5-time-selection-clocks` component, which
 * is used in `ui5-time-picker` component respectively.
 *
 * ### Usage
 *
 * `ui5-time-picker-clock` can display hours, minutes or seconds
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TimePickerClock.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.15.0
 * @private
 */
declare class TimePickerClock extends UI5Element {
    eventDetails: {
        change: TimePickerClockChangeEventDetail;
    };
    /**
     * Determines whether the component is displayed as disabled.
     * @default false
     */
    disabled: boolean;
    /**
     * Determines whether the component is active (visible).
     * @default false
     */
    active: boolean;
    /**
     * Minimum item value for the circle of the clock.
     * @default -1
     */
    itemMin: number;
    /**
     * Maximum item value for the circle of the clock.
     * @default -1
     */
    itemMax: number;
    /**
     * Label of the clock dial - for example, 'Hours', 'Minutes', or 'Seconds'.
     * @default undefined
     */
    label?: string;
    /**
     * If set to `true`, a surrounding circle with markers (dots) will be hidden.
     * (for example, on the 'Minutes' clock-dial, markers represent minutes).
     * @default false
     */
    hideFractions: boolean;
    /**
     * If provided, this will replace the last item displayed. Usually, the last item ('12', '24' or '60') is replaced with '0'.
     * @default -1
     */
    lastItemReplacement: number;
    /**
     * Prepend with zero flag. If `true`, values less than 10 will be prepend with 0.
     * @default false
     */
    prependZero: boolean;
    /**
     * The currently selected value of the clock.
     * @default -1
     */
    selectedValue: number;
    /**
     * The step for displaying of one unit of items.
     * 1 means 1/60 of the circle.
     * The default display step is 5 which means minutes and seconds are displayed as "0", "5", "10", etc.
     * For hours the display step must be set to 1.
     * @default 5
     */
    displayStep: number;
    /**
     * The step for selection of items.
     * 1 means 1 unit:
     * - if the clock displays hours - 1 unit = 1 hour
     * - if the clock displays minutes/seconds - 1 unit = 1 minute/second
     * @default 1
     */
    valueStep: number;
    /**
     * Defines the currently available Time Picker Clock items depending on Clock setup.
     */
    _items: Array<TimePickerClockItem>;
    /**
     * Defines the currently selected Time Picker Clock item.
     */
    _selectedItem: TimePickerClockSelectedItem;
    /**
     * Defines the currently hovered Time Picker Clock item.
     */
    _hoveredItem: TimePickerClockSelectedItem;
    /**
     * Keeps variables used in interaction calculations.
     */
    _dimensionParameters: TimePickerClockDimensions;
    /**
     * Mousedown or Touchstart event flag.
     * @default false
     */
    _mouseOrTouchDown: boolean;
    /**
     * Cancel Mouseout flag.
     * @default false
     */
    _cancelTouchOut: boolean;
    /**
     * Calculated selected value of the clock during interactions.
     * @default -1
     */
    _selectedValue: number;
    /**
     * Selected value of the clock during interactions.
     * @default -1
     */
    _movSelectedValue: number;
    /**
     * Hovered value of the clock during interactions.
     * @default -1
     */
    _hoveredValue: number;
    /**
     * Previously hovered value of the clock during interactions.
     * @default -1
     */
    _prevHoveredValue: number;
    /**
     * Animation skip flag. If set to `true`, the component will not have transition animation when displayed.
     * @default false
     */
    _skipAnimation: boolean;
    _firstNumberElement?: HTMLElement;
    _clockWrapper?: HTMLElement;
    _fnOnMouseOutUp: () => void;
    constructor();
    onEnterDOM(): void;
    onExitDOM(): void;
    onBeforeRendering(): void;
    get _itemsCount(): number;
    get _angleStep(): number;
    /**
     * Returns the real value of the passed clock item, if the replacement must be done, returns the replaced value.
     * @param value The value of the clock item
     * @returns The real/replaced value
     */
    _fixReplacementValue(value: number): number;
    /**
     * Returns internally selected or hovered value object constructed for rendering purposes.
     * @param value currently selected or hovered value.
     * @returns Selected or hovered value object
     */
    _updateSelectedOrHoveredItem(value: number, cssClass?: string): TimePickerClockSelectedItem;
    /**
     * Prepares clock items objects according to current clock settings. Item objects are used for rendering purposes.
     */
    _prepareClockItems(): void;
    /**
     * Returns the DOM Reference of the clock cover element
     * @returns the DOM Reference
     */
    _getClockCoverContainerDomRef(): Element | null | undefined;
    /**
     * Calculates the outer height of a HTML element.
     * @param element The element which outer height to be calculated
     * @returns Outer height of the passed HTML element
     */
    _outerHeight(element: HTMLElement): number;
    /**
     * Returns the Id of the DOM element of the clock item that display specific value.
     * @param value The value of the clock item
     * @returns Id of the clock item element
     */
    _hoveredId(value: number): string;
    /**
     * Returns provided value as string. Padding with additional zero is applied if necessary.
     * @param value The value that should be returned as string
     * @returns The value as string
     */
    _getStringValue(value: number): string;
    /**
     * Calculates dimension variables necessary for determining of item selection.
     * @returns Dimensions object
     */
    _calculateDimensions(): TimePickerClockDimensions | undefined;
    /**
     * Calculates selected and hovered values based on click/touch position.
     * @param x X position of click/touch returned by the event
     * @param y Y position of click/touch returned by the event
     */
    _calculatePosition(x: number, y: number): void;
    /**
     * Mousewheel handler. Increases/decreases value of the clock.
     * @param increase whether to increase or decrease the value
     */
    _modifyValue(increase: boolean): void;
    /**
     * Sets new selected value, fires change event and updates selected value object used for rendering purposes.
     * @param value a value to be set
     * @param bFinalChange whether the change is final or not
     */
    _setSelectedValue(value: number, bFinalChange?: boolean): void;
    /**
     * TouchStart/MouseDown event handler.
     * @param evt Event object
     */
    _onTouchStart(evt: Event): void;
    /**
     * TouchMove/MouseMove event handler.
     * @param evt Event object
     */
    _onTouchMove(evt: Event): void;
    /**
     * TouchEnd/MouseUp event handler.
     * @param evt Event object
     */
    _onTouchEnd(evt: Event): void;
    /**
     * Mouse Wheel event handler.
     * @param evt Event object
     */
    _onMouseWheel(evt: WheelEvent): void;
    /**
     * MouseOut event handler.
     */
    _onMouseOut(): void;
    noop(): boolean;
}
export default TimePickerClock;
export type { TimePickerClockChangeEventDetail };
