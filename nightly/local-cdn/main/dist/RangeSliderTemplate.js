import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import SliderTooltip from "./SliderTooltip.js";
import SliderHandle, { SliderHandleType } from "./SliderHandle.js";
import SliderScale from "./SliderScale.js";
const _handlePosition = (min, max, value) => {
    const range = max - min;
    const position = ((value - min) / range) * 100;
    return position;
};
const startHandle = (slider) => {
    const position = _handlePosition(slider.min, slider.max, slider.startValue);
    return (_jsxs(_Fragment, { children: [_jsx(SliderHandle, { value: slider.startValue, min: slider.min, max: slider.max, tabIndex: slider._tabIndex, active: slider.rangePressed, handleType: SliderHandleType.Start, "aria-orientation": "horizontal", part: "handle", exportparts: "icon: handle-icon", role: "slider", "aria-valuemin": slider.min, "aria-valuemax": slider.max, "aria-valuenow": slider.startValue, "aria-label": slider._ariaLabelStartHandle, "aria-disabled": slider._ariaDisabled, "aria-describedby": slider._ariaDescribedByHandleText, onFocusIn: slider._onfocusin, onFocusOut: slider._onfocusout, style: {
                    "inset-inline-start": `clamp(0%, ${position}%, 100%)`,
                } }), startTooltip(slider)] }));
};
const endHandle = (slider) => {
    const position = _handlePosition(slider.min, slider.max, slider.endValue);
    return (_jsxs(_Fragment, { children: [_jsx(SliderHandle, { value: slider.endValue, min: slider.min, max: slider.max, tabIndex: slider._tabIndex, active: slider.rangePressed, handleType: SliderHandleType.End, "aria-orientation": "horizontal", part: "handle", exportparts: "icon: handle-icon", role: "slider", "aria-valuemin": slider.min, "aria-valuemax": slider.max, "aria-valuenow": slider.endValue, "aria-label": slider._ariaLabelEndHandle, "aria-disabled": slider._ariaDisabled, "aria-describedby": slider._ariaDescribedByHandleText, onFocusIn: slider._onfocusin, onFocusOut: slider._onfocusout, style: {
                    "inset-inline-start": `clamp(0%, ${position}%, 100%)`,
                } }), endTooltip(slider)] }));
};
const startTooltip = (slider) => (_jsx(SliderTooltip, { open: slider._tooltipsOpen, value: slider.tooltipStartValue, valueState: slider.tooltipStartValueState, min: slider.min, max: slider.max, "data-sap-ui-start-value": true, editable: slider.editableTooltip, followRef: slider._startHandle, onChange: slider._onTooltipChange, onKeyDown: slider._onTooltipKeydown, onFocusChange: slider._onTooltipFocusChange, onOpen: slider._onTooltipOpen, onInput: slider._onTooltipInput }));
const endTooltip = (slider) => (_jsx(SliderTooltip, { open: slider._tooltipsOpen, value: slider.tooltipEndValue, valueState: slider.tooltipEndValueState, min: slider.min, max: slider.max, "data-sap-ui-end-value": true, editable: slider.editableTooltip, followRef: slider._endHandle, onChange: slider._onTooltipChange, onKeyDown: slider._onTooltipKeydown, onFocusChange: slider._onTooltipFocusChange, onOpen: slider._onTooltipOpen, onInput: slider._onTooltipInput }));
export default function RangeSliderTemplate() {
    return (_jsx(_Fragment, { children: _jsx("div", { class: "ui5-slider-evo-root", part: "root-container", onMouseDown: this._onmousedown, onTouchStart: this._onmousedown, onMouseOver: this._onmouseover, onMouseOut: this._onmouseout, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, children: _jsxs(SliderScale, { startValue: this.startValue, endValue: this.endValue, min: this.min, max: this.max, step: this._effectiveStep, showTickmarks: this.showTickmarks, labelInterval: this.labelInterval, progressTabIndex: this._tabIndex, progressAriaValueNow: this._ariaValueNow, progressAriaValueText: `From ${this.startValue} to ${this.endValue}`, progressAriaLabel: this._ariaLabel, progressAriaDisabled: this._ariaDisabled, progressPressed: this.rangePressed, progressFocused: this._progressFocused, onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, part: "scale", exportparts: "inner: scale-inner, progress: progress-bar", children: [startHandle(this), endHandle(this), this.editableTooltip && _jsx(_Fragment, { children: _jsx("span", { id: "ui5-slider-InputDesc", class: "ui5-hidden-text", children: this._ariaDescribedByInputText }) })] }) }) }));
}
//# sourceMappingURL=RangeSliderTemplate.js.map