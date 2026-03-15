import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import directionArrows from "@ui5/webcomponents-icons/dist/direction-arrows.js";
import Icon from "./Icon.js";
export default function SliderHandleTemplate() {
    return (_jsx("div", { class: "ui5-slider-handle-container", children: _jsx(Icon, { name: directionArrows, mode: "Decorative", part: "icon", "slider-icon": true }) }));
}
//# sourceMappingURL=SliderHandleTemplate.js.map