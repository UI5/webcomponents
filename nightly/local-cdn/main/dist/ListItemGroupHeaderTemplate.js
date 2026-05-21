import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import WrappingType from "./types/WrappingType.js";
export default function ListItemGroupHeaderTemplate() {
    return (_jsxs("div", { part: "native-li", role: this.effectiveAccRole, tabindex: this.forcedTabIndex ? parseInt(this.forcedTabIndex) : undefined, class: {
            "ui5-ghli-root": true,
            ...this.classes.main,
        }, "aria-label": this.ariaLabelText, "aria-roledescription": this.groupHeaderText, onFocusIn: this._onfocusin, onKeyDown: this._onkeydown, children: [_jsx("div", { id: `${this._id}-content`, class: "ui5-li-content", children: renderTitle.call(this) }), this.hasSubItems && _jsx("slot", { name: "subItems" })] }));
}
function renderTitle() {
    if (this.wrappingType === WrappingType.Normal) {
        return this.expandableTextTemplate?.call(this, {
            className: "ui5-ghli-title",
            text: this._textContent,
            maxCharacters: this._maxCharacters,
            part: "title",
        });
    }
    return (_jsx("span", { part: "title", class: "ui5-ghli-title", children: _jsx("slot", {}) }));
}
//# sourceMappingURL=ListItemGroupHeaderTemplate.js.map