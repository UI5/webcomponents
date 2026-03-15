import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import SliderTooltip from "./SliderTooltip.js";
import SliderHandle from "./SliderHandle.js";
import SliderScale from "./SliderScale.js";
const _handlePosition = (min, max, value) => {
    const range = max - min;
    const position = ((value - min) / range) * 100;
    return position;
};
const handle = (slider) => {
    const position = _handlePosition(slider.min, slider.max, slider.value);
    return (_jsxs(_Fragment, { children: [_jsx(SliderHandle, { "data-sap-focus-ref": true, value: slider.value, min: slider.min, max: slider.max, tabIndex: slider.disabled ? -1 : 0, disabled: slider.disabled, "aria-orientation": "horizontal", part: "handle", exportparts: "icon: handle-icon", role: "slider", "aria-valuemin": slider.min, "aria-valuemax": slider.max, "aria-valuenow": slider.value, "aria-label": slider._ariaLabel, "aria-disabled": slider._ariaDisabled, "aria-keyshortcuts": slider._ariaKeyshortcuts, "aria-describedby": slider._ariaDescribedByHandleText, style: {
                    "inset-inline-start": `clamp(0%, ${position}%, 100%)`,
                } }), tooltip(slider)] }));
};
const tooltip = (slider) => (_jsx(SliderTooltip, { open: slider._tooltipsOpen, value: slider.tooltipValue, min: slider.min, max: slider.max, editable: slider.editableTooltip, followRef: slider.shadowRoot?.querySelector("[ui5-slider-handle]"), valueState: slider.tooltipValueState, onChange: slider._onTooltipChange, onKeyDown: slider._onTooltipKeydown, onFocusChange: slider._onTooltipFocusChange, onOpen: slider._onTooltipOpen, onInput: slider._onTooltipInput }));
export default function SliderTemplate() {
    return (_jsx(_Fragment, { children: _jsx("div", { class: "ui5-slider-evo-root", part: "root-container", onMouseDown: this._onmousedown, onTouchStart: this._onmousedown, onMouseOver: this._onmouseover, onMouseOut: this._onmouseout, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, children: _jsxs(SliderScale, { endValue: this.value, min: this.min, max: this.max, step: this.step, startValue: this.min, showTickmarks: this.showTickmarks, labelInterval: this.labelInterval, onFocusOut: this._onfocusout, onFocusIn: this._onfocusin, part: "scale", exportparts: "inner: scale-inner, progress: progress", children: [handle(this), this.editableTooltip && _jsx(_Fragment, { children: _jsx("span", { id: "ui5-slider-InputDesc", class: "ui5-hidden-text", children: this._ariaDescribedByInputText }) })] }) }) }));
}
//# sourceMappingURL=SliderTemplate.js.map