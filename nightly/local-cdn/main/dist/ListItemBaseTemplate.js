import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
export default function ListItemBaseTemplate(hooks, injectedProps) {
    const listItemContent = hooks?.listItemContent || defaultListItemContent;
    return (_jsx("li", { part: "native-li", "data-sap-focus-ref": true, tabindex: this._effectiveTabIndex, class: this.classes.main, draggable: this.movable, role: injectedProps?.role, title: injectedProps?.title, onFocusIn: this._onfocusin, onKeyUp: this._onkeyup, onKeyDown: this._onkeydown, onClick: this._onclick, children: listItemContent.call(this) }));
}
function defaultListItemContent() {
    return _jsx("div", { part: "content", id: `${this._id}-content`, class: "ui5-li-content", children: _jsx("div", { class: "ui5-li-text-wrapper", children: _jsx("span", { part: "title", class: "ui5-li-title", children: _jsx("slot", {}) }) }) });
}
//# sourceMappingURL=ListItemBaseTemplate.js.map