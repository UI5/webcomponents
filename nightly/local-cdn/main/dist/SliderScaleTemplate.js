import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
export default function SliderScaleTemplate() {
    return (_jsxs("div", { class: "ui5-slider-scale-root", part: "inner", children: [this._tickmarks.length > 0 && (_jsx("div", { class: "ui5-slider-scale-tickmarks-container", children: this._tickmarks.map(tick => (_jsx("div", { class: {
                        "ui5-slider-scale-tickmark": true,
                        "ui5-slider-scale-tickmark-in-range": tick.isInRange,
                    }, style: {
                        insetInlineStart: `${this.orientation === "Horizontal" ? tick.position : "50"}%`,
                        bottom: `${this.orientation === "Vertical" ? tick.position : "auto"}%`
                    }, children: tick.label && tick.showLabel && (_jsx("span", { class: "ui5-slider-scale-tickmark-label", children: tick.label })) }))) })), _jsx("div", { class: "ui5-slider-scale-progress", part: "progress", style: this._progressStyle }), _jsx("slot", {})] }));
}
//# sourceMappingURL=SliderScaleTemplate.js.map