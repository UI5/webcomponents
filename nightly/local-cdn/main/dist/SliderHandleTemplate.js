import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import directionArrows from "@ui5/webcomponents-icons/dist/direction-arrows.js";
import Icon from "./Icon.js";
import { SliderHandleType } from "./SliderHandle.js";
export default function SliderHandleTemplate() {
    return (_jsx("div", { class: {
            "ui5-slider-handle-container": true,
            "ui5-slider-handle": true,
            "ui5-slider-handle--start": this.handleType === SliderHandleType.Start,
            "ui5-slider-handle--end": this.handleType === SliderHandleType.End,
        }, children: _jsx(Icon, { name: directionArrows, mode: "Decorative", part: "icon", "slider-icon": true }) }));
}
//# sourceMappingURL=SliderHandleTemplate.js.map