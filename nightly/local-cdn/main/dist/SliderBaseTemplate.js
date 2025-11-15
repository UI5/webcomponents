import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
export default function SliderBaseTemplate(hooks) {
    return (_jsxs("div", { class: {
            "ui5-slider-root": true,
            "ui5-slider-root-phone": isPhone(),
        }, onMouseDown: this._onmousedown, onTouchStart: this._onmousedown, onMouseOver: this._onmouseover, onMouseOut: this._onmouseout, onKeyDown: this._onkeydown, onKeyUp: this._onKeyupBase, part: "root-container", children: [(hooks?.handlesAriaText || handlesAriaText).call(this), _jsxs("div", { class: "ui5-slider-inner", children: [!!this.step && this.showTickmarks && _jsxs(_Fragment, { children: [_jsx("ul", { class: "ui5-slider-tickmarks", children: this.tickmarksObject.map(tm => _jsx(_Fragment, { children: tm ?
                                        _jsx("li", { class: "ui5-slider-tickmark ui5-slider-tickmark-in-range" })
                                        :
                                            _jsx("li", { class: "ui5-slider-tickmark" }) })) }), !!this.labelInterval &&
                                _jsx("ul", { class: {
                                        "ui5-slider-labels": true,
                                        "ui5-slider-hidden-labels": this._labelsOverlapping,
                                    }, children: this._labels.map(l => _jsx("li", { "data-counter": l })) })] }), (hooks?.progressBar || progressBar).call(this), (hooks?.handles || handles).call(this)] }), this.editableTooltip && _jsx(_Fragment, { children: _jsx("span", { id: "ui5-slider-InputDesc", class: "ui5-hidden-text", children: this._ariaDescribedByInputText }) })] }));
}
export function handlesAriaText() { }
export function progressBar() { }
export function handles() { }
//# sourceMappingURL=SliderBaseTemplate.js.map