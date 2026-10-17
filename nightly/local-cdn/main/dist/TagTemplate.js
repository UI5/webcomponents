import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
export default function TagTemplate() {
    return (_jsx(_Fragment, { children: this.interactive ?
            _jsx("button", { class: "ui5-tag-root", title: this._title, "aria-roledescription": this._roleDescription, "aria-description": this._valueState, onClick: this._onclick, part: "root", children: content.call(this) })
            :
                _jsx("div", { class: "ui5-tag-root", title: this._title, part: "root", children: content.call(this) }) }));
}
function content() {
    return (_jsxs(_Fragment, { children: [_jsx("slot", { name: "icon" }), this._semanticIconName &&
                _jsx(Icon, { class: "ui5-tag-semantic-icon", name: this._semanticIconName }), _jsx("span", { class: "ui5-hidden-text", children: this.tagDescription }), this.hasText &&
                _jsx("span", { class: "ui5-tag-text", children: _jsx("slot", {}) })] }));
}
//# sourceMappingURL=TagTemplate.js.map