import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
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
        "focus-change": void;
        "open": void;
        "input": {
            value?: string;
        };
    };
    value: string;
    open: boolean;
    min: number;
    max: number;
    editable: boolean;
    valueState: `${ValueState}`;
    followRef?: HTMLElement;
    _repoisitionInterval?: Interval;
    _repositionTooltipBound: () => void;
    static i18nBundle: I18nBundle;
    _open: boolean;
    constructor();
    onBeforeRendering(): void;
    onAfterRendering(): void;
    repositionTooltip(): void;
    attachGlobalScrollHandler(): void;
    detachGlobalScrollHandler(): void;
    _onInputFocusin(): void;
    _onInputKeydown(e: KeyboardEvent): void;
    _onInputInput(): void;
    _onInputFocusOut(e: FocusEvent): void;
    get _ariaLabelledByInputText(): string;
    get inputRef(): Input | null | undefined;
}
export type { SliderTooltipChangeEventDetails, };
export default SliderTooltip;
