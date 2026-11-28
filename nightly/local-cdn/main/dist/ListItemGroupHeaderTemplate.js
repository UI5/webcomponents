import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import WrappingType from "./types/WrappingType.js";
export default function ListItemGroupHeaderTemplate() {
    return (_jsx("div", { part: "native-li", role: this.effectiveAccRole, "aria-level": this.accAriaLevel, tabindex: this.forcedTabIndex ? parseInt(this.forcedTabIndex) : undefined, class: {
            "ui5-ghli-root": true,
            ...this.classes.main,
        }, "aria-label": this.accAriaLabel, "aria-roledescription": this.accAriaRoleDescription, onFocusIn: this._onfocusin, onKeyDown: this._onkeydown, children: _jsx("div", { id: `${this._id}-content`, class: "ui5-li-content", children: renderTitle.call(this) }) }));
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