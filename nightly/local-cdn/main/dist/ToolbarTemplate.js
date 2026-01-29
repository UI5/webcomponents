import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "./Button.js";
import Popover from "./Popover.js";
import overflowIcon from "@ui5/webcomponents-icons/dist/overflow.js";
export default function ToolbarTemplate() {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { class: {
                    "ui5-tb-items": true,
                    "ui5-tb-items-full-width": this.hasFlexibleSpacers,
                }, role: this.accInfo.root.role, "aria-label": this.accInfo.root.accessibleName, children: [this.standardItems.map(item => {
                        if ("styles" in item) {
                            return (_jsx("div", { class: "ui5-tb-item", id: item._individualSlot, style: item.styles, children: _jsx("slot", { name: item._individualSlot }) }));
                        }
                        return (_jsx("div", { class: "ui5-tb-item", id: item._individualSlot, children: _jsx("slot", { name: item._individualSlot }) }));
                    }), _jsx(Button, { "aria-hidden": this.hideOverflowButton, icon: overflowIcon, design: "Transparent", onClick: this.toggleOverflow, class: {
                            "ui5-tb-item": true,
                            "ui5-tb-overflow-btn": true,
                            "ui5-tb-overflow-btn-hidden": this.hideOverflowButton,
                        }, tooltip: this.accInfo.overflowButton.tooltip, accessibleName: this.accInfo.overflowButton.accessibleName, accessibilityAttributes: this.accInfo.overflowButton.accessibilityAttributes })] }), _jsx(Popover, { class: "ui5-overflow-popover", placement: "Bottom", horizontalAlign: "End", onClose: this.onOverflowPopoverClosed, onOpen: this.onOverflowPopoverOpened, accessibleName: this.accInfo.popover.accessibleName, hideArrow: true, children: _jsx("div", { class: {
                        "ui5-overflow-list": true
                    }, children: this.overflowItems.map(item => {
                        if (item.isSeparator) {
                            return (_jsx("div", { class: "ui5-tb-popover-item ui5-tb-separator ui5-tb-separator-in-overflow", id: item._individualSlot, children: _jsx("slot", { name: item._individualSlot }) }));
                        }
                        return (_jsx("div", { class: "ui5-tb-popover-item", id: item._individualSlot, children: _jsx("slot", { name: item._individualSlot }) }));
                    }) }) })] }));
}
//# sourceMappingURL=ToolbarTemplate.js.map