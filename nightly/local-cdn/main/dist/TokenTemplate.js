import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
export default function TokenTemplate() {
    return (_jsxs("div", { role: "option", tabindex: this.forcedTabIndex ? parseInt(this.forcedTabIndex) : -1, class: "ui5-token--wrapper", "aria-description": this.ariaDescription, "aria-selected": this.selected, onClick: this._handleSelect, onFocusIn: this._focusin, onFocusOut: this._focusout, onKeyDown: this._keydown, children: [_jsx("span", { class: "ui5-token--text", children: this.text }), !this.readonly &&
                _jsx("div", { class: "ui5-token--icon", children: this.closeIcon.length > 0 ?
                        _jsx("slot", { name: "closeIcon", onClick: this._delete })
                        :
                            _jsx(Icon, { name: decline, mode: "Decorative", accessibleName: this.tokenDeletableText, showTooltip: true, onClick: this._delete, onMouseDown: this._onmousedown }) })] }));
}
//# sourceMappingURL=TokenTemplate.js.map