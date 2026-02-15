import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import PopubBlockLayerTemplate from "./PopupBlockLayerTemplate.js";
export default function PopupTemplate(hooks) {
    return (_jsxs(_Fragment, { children: [PopubBlockLayerTemplate.call(this), _jsxs("section", { "root-element": true, style: this.styles.root, class: this.classes.root, role: this._role, "aria-describedby": this.ariaDescribedByIds, "aria-modal": this._ariaModal, "aria-label": this._ariaLabel, "aria-labelledby": this._ariaLabelledBy, onKeyDown: this._onkeydown, onFocusOut: this._onfocusout, onMouseUp: this._onmouseup, onMouseDown: this._onmousedown, children: [_jsx("span", { class: "first-fe", "data-ui5-focus-trap": true, role: "none", tabIndex: 0, onFocusIn: this.forwardToLast }), (hooks?.beforeContent || beforeContent).call(this), _jsx("div", { style: this.styles.content, class: this.classes.content, onScroll: this._scroll, part: "content", children: _jsx("slot", {}) }), this.ariaDescriptionText &&
                        _jsx("span", { id: "accessibleDescription", class: "ui5-hidden-text", children: this.ariaDescriptionText }), (hooks?.afterContent || afterContent).call(this), _jsx("span", { class: "last-fe", "data-ui5-focus-trap": true, role: "none", tabIndex: 0, onFocusIn: this.forwardToFirst })] })] }));
}
export function beforeContent() { }
export function afterContent() { }
//# sourceMappingURL=PopupTemplate.js.map