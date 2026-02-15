import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
export default function DropIndicatorTemplate() {
    return _jsx("div", { class: {
            "ui5-di-rect": this.placement === MovePlacement.On,
            "ui5-di-needle": this.placement !== MovePlacement.On,
        } });
}
//# sourceMappingURL=DropIndicatorTemplate.js.map