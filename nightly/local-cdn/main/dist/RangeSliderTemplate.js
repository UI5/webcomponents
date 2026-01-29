import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import directionArrows from "@ui5/webcomponents-icons/dist/direction-arrows.js";
import Icon from "./Icon.js";
import SliderBaseTemplate from "./SliderBaseTemplate.js";
import SliderTooltip from "./SliderTooltip.js";
export default function RangeSliderTemplate() {
    return SliderBaseTemplate.call(this, {
        handlesAriaText,
        progressBar,
        handles,
    });
}
export function handlesAriaText() {
    return (_jsxs(_Fragment, { children: [_jsx("span", { id: "ui5-slider-startHandleDesc", class: "ui5-hidden-text", children: this._ariaHandlesText.startHandleText }), _jsx("span", { id: "ui5-slider-endHandleDesc", class: "ui5-hidden-text", children: this._ariaHandlesText.endHandleText })] }));
}
export function progressBar() {
    return (_jsx("div", { class: "ui5-slider-progress-container", part: "progress-container", children: _jsx("div", { class: "ui5-slider-progress", part: "progress-bar", style: this.styles.progress, onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, role: "slider", tabIndex: this._tabIndex, "aria-orientation": "horizontal", "aria-valuemin": this.min, "aria-valuemax": this.max, "aria-valuenow": this._ariaValueNow, "aria-valuetext": `From ${this.startValue} to ${this.endValue}`, "aria-label": this._ariaLabel, "aria-disabled": this._ariaDisabled }) }));
}
export function handles() {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { class: "ui5-slider-handle-container", style: this.styles.startHandle, part: "handle-container", children: [_jsx("div", { class: "ui5-slider-handle ui5-slider-handle--start", part: "handle", onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, role: "slider", tabindex: this._tabIndex, "aria-orientation": "horizontal", "aria-valuemin": this.min, "aria-valuemax": this.max, "aria-valuenow": this.startValue, "aria-labelledby": this._ariaLabelledByStartHandleText, "aria-disabled": this._ariaDisabled, "aria-describedby": this._ariaDescribedByHandleText, "aria-keyshortcuts": this._ariaKeyshortcuts, children: _jsx(Icon, { name: directionArrows, mode: "Decorative", "slider-icon": true }) }), _jsx(SliderTooltip, { open: this._tooltipsOpen, value: this.tooltipStartValue, valueState: this.tooltipStartValueState, min: this.min, max: this.max, "data-sap-ui-start-value": true, editable: this.editableTooltip, followRef: this._startHandle, onChange: this._onTooltipChange, onKeyDown: this._onTooltipKeydown, onFocusChange: this._onTooltipFocusChange, onOpen: this._onTooltipOpen, onInput: this._onTooltipInput })] }), _jsxs("div", { class: "ui5-slider-handle-container", style: this.styles.endHandle, part: "handle-container", children: [_jsx("div", { class: "ui5-slider-handle ui5-slider-handle--end", part: "handle", onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, role: "slider", tabIndex: this._tabIndex, "aria-orientation": "horizontal", "aria-valuemin": this.min, "aria-valuemax": this.max, "aria-valuenow": this.endValue, "aria-labelledby": this._ariaLabelledByEndHandleText, "aria-describedby": this._ariaDescribedByHandleText, "aria-disabled": this._ariaDisabled, "aria-keyshortcuts": "F2", children: _jsx(Icon, { name: directionArrows, mode: "Decorative", "slider-icon": true }) }), _jsx(SliderTooltip, { open: this._tooltipsOpen, value: this.tooltipEndValue, valueState: this.tooltipEndValueState, min: this.min, max: this.max, "data-sap-ui-end-value": true, editable: this.editableTooltip, followRef: this._endHandle, onChange: this._onTooltipChange, onKeyDown: this._onTooltipKeydown, onFocusChange: this._onTooltipFocusChange, onOpen: this._onTooltipOpen, onInput: this._onTooltipInput })] })] }));
}
//# sourceMappingURL=RangeSliderTemplate.js.map