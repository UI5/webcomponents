import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
export default function SearchItemShowMoreTemplate() {
    return (_jsx("li", { class: "ui5-li-root ui5-li--focusable ui5-search-item-show-more", role: "option", tabindex: this._effectiveTabIndex, "aria-selected": this.selected, onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, onClick: this._onclick, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, children: _jsx("span", { class: "ui5-search-item-show-more-text", children: this.showMoreTextCount }) }));
}
//# sourceMappingURL=SearchItemShowMoreTemplate.js.map