import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "@ui5/webcomponents/dist/Button.js";
import ToggleButton from "@ui5/webcomponents/dist/ToggleButton.js";
export default function DynamicPageHeaderActionsTemplate() {
    return (_jsx("div", { class: "ui5-dynamic-page-header-actions-root", children: _jsxs("div", { class: "ui5-dynamic-page-header-actions--wrapper", children: [_jsx(Button, { class: "ui5-dynamic-page-header-action ui5-dynamic-page-header-action-expand", onClick: this.onExpandClick, icon: this.arrowButtonIcon, accessibleName: this.expandLabel, accessibilityAttributes: this.accessibilityAttributes, tooltip: this.expandLabel, onMouseOver: this.onExpandHoverIn, onMouseOut: this.onExpandHoverOut }), this.showPinButton &&
                    _jsx(ToggleButton, { class: "ui5-dynamic-page-header-action ui5-dynamic-page-header-action-pin", onClick: this.onPinClick, icon: this.pinButtonIcon, pressed: this.pinned, accessibilityAttributes: this.accessibilityAttributes, accessibleName: this.pinLabel, tooltip: this.pinLabel })] }) }));
}
//# sourceMappingURL=DynamicPageHeaderActionsTemplate.js.map