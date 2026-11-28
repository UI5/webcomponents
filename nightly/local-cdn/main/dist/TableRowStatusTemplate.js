import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/information.js";
const DEFAULT_ICONS = {
    Positive: "sys-enter-2",
    Negative: "error",
    Critical: "alert",
    Information: "information",
};
export default function TableRowStatusTemplate() {
    const icon = this.icon || (this.value && DEFAULT_ICONS[this.value]);
    const hasStatus = this.value != null || this.colorScheme != null;
    const renderTooltip = hasStatus && this._design === "Extended";
    return (_jsxs(_Fragment, { children: [_jsx("div", { id: "status", part: "status" }), renderTooltip && _jsx("div", { id: "status-tooltip", title: this._accessibleText, children: icon && _jsx(Icon, { id: "status-icon", name: icon, accessibleName: this._accessibleText }) })] }));
}
//# sourceMappingURL=TableRowStatusTemplate.js.map