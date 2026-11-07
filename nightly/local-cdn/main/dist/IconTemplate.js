import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
export default function IconTemplate() {
    if (this.hasFontIcon) {
        return (_jsx("span", { class: "ui5-icon-root", part: "root", tabindex: this._tabIndex, role: this.effectiveAccessibleRole, "aria-label": this.effectiveAccessibleName, "aria-hidden": this.effectiveAriaHidden, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onClick: this._onclick, children: _jsx("slot", { name: "fontIcon" }) }));
    }
    return (_jsxs("svg", { class: "ui5-icon-root", part: "root", tabindex: this._tabIndex, dir: this._dir, viewBox: this.viewBox, role: this.effectiveAccessibleRole, focusable: "false", preserveAspectRatio: "xMidYMid meet", "aria-label": this.effectiveAccessibleName, "aria-hidden": this.effectiveAriaHidden, xmlns: "http://www.w3.org/2000/svg", onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onClick: this._onclick, children: [this.hasIconTooltip &&
                _jsxs("title", { id: `${this._id}-tooltip`, children: [" ", this.effectiveAccessibleName, " "] }), _jsx("g", { role: "presentation", children: content.call(this) })] }));
}
function content() {
    if (this.customTemplate) {
        return this.customTemplate;
    }
    if (this.customTemplateAsString) {
        return _jsx("g", { dangerouslySetInnerHTML: { __html: this.customTemplateAsString } });
    }
    return this.pathData.map(path => (_jsx("path", { d: path })));
}
//# sourceMappingURL=IconTemplate.js.map