import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import TokenizerPopoverTemplate from "./TokenizerPopoverTemplate.js";
export default function TokenizerTemplate() {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { class: "ui5-tokenizer-root", children: [_jsxs("div", { class: "ui5-tokenizer--content", onClick: this._click, onMouseDown: this._onmousedown, onKeyDown: this._onkeydown, onFocusOut: this._onfocusout, onFocusIn: this._onfocusin, "onui5-delete": this._delete, "onui5-select": this.onTokenSelect, children: [_jsx("div", { class: "ui5-tokenizer--list", role: "listbox", "aria-label": this.tokenizerLabel, "aria-description": this.tokenizerAriaDescription, "aria-disabled": this._ariaDisabled, "aria-readonly": this._ariaReadonly, children: this.tokens.map(token => _jsx("slot", { name: token._individualSlot })) }), this.showEffectiveClearAll &&
                                _jsx("span", { role: "button", class: "ui5-tokenizer--clear-all", onClick: this.handleClearAll, children: this._clearAllText })] }), this.showNMore &&
                        _jsx("span", { role: "button", "aria-haspopup": "dialog", class: "ui5-tokenizer-more-text", part: "n-more-text", onClick: this._handleNMoreClick, children: this._nMoreText })] }), TokenizerPopoverTemplate.call(this)] }));
}
//# sourceMappingURL=TokenizerTemplate.js.map