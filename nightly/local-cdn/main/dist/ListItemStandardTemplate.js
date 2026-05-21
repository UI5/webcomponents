import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import ListItemTemplate from "./ListItemTemplate.js";
import WrappingType from "./types/WrappingType.js";
const predefinedHooks = {
    imageBegin,
    iconBegin,
    iconEnd,
    listItemContent
};
export default function ListItemStandardTemplate(hooks) {
    const currentHooks = { ...predefinedHooks, ...hooks };
    return ListItemTemplate.call(this, currentHooks);
}
function listItemContent() {
    return _jsxs(_Fragment, { children: [_jsxs("div", { class: "ui5-li-text-wrapper", children: [renderTitle.call(this), renderDescription.call(this), !this.typeActive && _jsx("span", { class: "ui5-hidden-text", children: this.type })] }), !this.description && renderAdditionalText.call(this)] });
}
function renderTitle() {
    if (this.wrappingType === WrappingType.Normal) {
        return this.expandableTextTemplate?.call(this, {
            className: "ui5-li-title",
            text: this._textContent,
            maxCharacters: this._maxCharacters,
            part: "title",
        });
    }
    return (_jsx("span", { part: "title", class: "ui5-li-title", children: this.text ? this.text : _jsx("slot", {}) }));
}
function renderDescription() {
    if (!this.description) {
        return null;
    }
    if (this.wrappingType === WrappingType.Normal) {
        return (_jsxs("div", { class: "ui5-li-description-info-wrapper", children: [this.expandableTextTemplate?.call(this, {
                    className: "ui5-li-desc",
                    text: this.description,
                    maxCharacters: this._maxCharacters,
                    part: "description",
                }), renderAdditionalText.call(this)] }));
    }
    return (_jsxs("div", { class: "ui5-li-description-info-wrapper", children: [_jsx("span", { part: "description", class: "ui5-li-desc", children: this.description }), renderAdditionalText.call(this)] }));
}
function renderAdditionalText() {
    if (!this.additionalText) {
        return null;
    }
    return _jsx("span", { part: "additional-text", class: "ui5-li-additional-text", children: this.additionalText });
}
function imageBegin() {
    if (this.hasImage) {
        return _jsx("div", { class: "ui5-li-image", children: _jsx("slot", { name: "image" }) });
    }
}
function iconBegin() {
    if (this.displayIconBegin) {
        return _jsx(Icon, { part: "icon", name: this.icon, class: "ui5-li-icon", mode: "Decorative" });
    }
}
function iconEnd() {
    if (this.displayIconEnd) {
        return _jsx(Icon, { part: "icon", name: this.icon, class: "ui5-li-icon", mode: "Decorative" });
    }
}
//# sourceMappingURL=ListItemStandardTemplate.js.map