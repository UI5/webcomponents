import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import TimelineLayout from "./types/TimelineLayout.js";
import ToggleButton from "@ui5/webcomponents/dist/ToggleButton.js";
import slimArrowleft from "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import slimArrowRight from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import slimArrowDown from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import slimArrowup from "@ui5/webcomponents-icons/dist/slim-arrow-up.js";
export default function TimelineGroupItemTemplate() {
    return (_jsxs("div", { class: "ui5-tlgi-root", role: "treeitem", children: [_jsxs("div", { class: "ui5-tlgi-btn-root", children: [_jsx("div", { class: "ui5-tlgi-icon-placeholder", children: _jsx("div", { class: "ui5-tlgi-icon-dot" }) }), _jsx("div", { class: "ui5-tlgi-line-placeholder", children: _jsx("div", { class: "ui5-tlgi-line" }) }), _jsx(ToggleButton, { class: "ui5-tlgi-btn", icon: getEffectiveGroupIcon.call(this, this.layout, this.collapsed), pressed: this.collapsed, onClick: this.onGroupItemClick, accessibleName: `${this.groupName || "Group"}, ${this.collapsed ? "collapsed" : "expanded"}`, children: this.groupName })] }), _jsx("div", { class: "ui5-tl-group-item", role: "group", "aria-label": `${this.groupName || "Group"} items`, children: this.items.map(item => _jsx("div", { class: "ui5-timeline-group-list-item", children: _jsx("slot", { name: item._individualSlot }) })) })] }));
}
function getEffectiveGroupIcon(layout, collapsed) {
    if (layout === TimelineLayout.Vertical) {
        return collapsed ? slimArrowleft : slimArrowDown;
    }
    return collapsed ? slimArrowup : slimArrowRight;
}
//# sourceMappingURL=TimelineGroupItemTemplate.js.map