import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import { isFirefox } from "@ui5/webcomponents-base/dist/Device.js";
export default function CardHeaderTemplate() {
    return (_jsxs("div", { id: `${this._id}--header`, class: {
            "ui5-card-header": true,
            "ui5-card-header--interactive": this.interactive,
            "ui5-card-header--active": this.interactive && this._headerActive,
            "ui5-card-header-ff": isFirefox(),
        }, part: "root", onClick: this._click, onKeyDown: this._keydown, onKeyUp: this._keyup, children: [_jsxs("div", { class: "ui5-card-header-focusable-element", "aria-labelledby": this.ariaLabelledBy, "aria-roledescription": this.ariaRoleDescription, role: this.ariaRoleFocusableElement, "data-sap-focus-ref": true, tabindex: 0, children: [this.hasAvatar &&
                        _jsx("div", { id: `${this._id}-avatar`, class: "ui5-card-header-avatar", "aria-label": this.ariaCardAvatarLabel, children: _jsx("slot", { name: "avatar" }) }), _jsxs("div", { class: "ui5-card-header-text", children: [_jsxs("div", { class: "ui5-card-header-first-line", children: [this.titleText &&
                                        _jsx("div", { id: `${this._id}-title`, class: "ui5-card-header-title", part: "title", role: "heading", "aria-level": 3, children: this.titleText }), this.additionalText &&
                                        _jsx("div", { class: "ui5-card-header-additionalText", children: _jsx("span", { id: `${this._id}-additionalText`, part: "additional-text", dir: "auto", children: this.additionalText }) })] }), this.subtitleText &&
                                _jsx("div", { id: `${this._id}-subtitle`, class: "ui5-card-header-subtitle", part: "subtitle", children: this.subtitleText })] })] }), this.hasAction &&
                _jsx("div", { class: "ui5-card-header-action", onFocusIn: this._actionsFocusin, onFocusOut: this._actionsFocusout, children: _jsx("slot", { name: "action" }) })] }));
}
//# sourceMappingURL=CardHeaderTemplate.js.map