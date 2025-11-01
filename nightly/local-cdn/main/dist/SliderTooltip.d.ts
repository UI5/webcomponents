import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import type Input from "./Input.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { Interval } from "@ui5/webcomponents-base/dist/types.js";
type SliderTooltipChangeEventDetails = {
    value: string;
};
/**
 * @class
 *
 * ### Overview
 * @constructor
 * @extends UI5Element
 * @private
 */
declare class SliderTooltip extends UI5Element {
    eventDetails: {
        "change": SliderTooltipChangeEventDetails;
        "forward-focus": void;
    };
    value?: string;
    inputValue?: string;
    open: boolean;
    min: number;
    max: number;
    editable: boolean;
    valueState: `${ValueState}`;
    followRef?: HTMLElement;
    _repoisitionInterval?: Interval;
    _repositionTooltipBound: () => void;
    static i18nBundle: I18nBundle;
    constructor();
    onBeforeRendering(): void;
    onAfterRendering(): void;
    repositionTooltip(): void;
    isValueValid(value: string): boolean;
    attachGlobalScrollHandler(): void;
    detachGlobalScrollHandler(): void;
    _keydown(e: KeyboardEvent): void;
    _onInputFocusin(): void;
    _onInputFocusOut(e: FocusEvent): void;
    get inputRef(): Input;
    get _ariaLabelledByInputText(): string;
}
export type { SliderTooltipChangeEventDetails, };
export default SliderTooltip;
