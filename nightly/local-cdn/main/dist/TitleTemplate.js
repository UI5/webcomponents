import { Fragment as _Fragment, jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
export default function TitleTemplate() {
    return (_jsx(_Fragment, { children: title.call(this, this.level) }));
}
function title(titleLevel) {
    switch (titleLevel) {
        case "H1":
            return (_jsx("h1", { class: "ui5-title-root", children: titleInner.call(this) }));
        case "H2":
            return (_jsx("h2", { class: "ui5-title-root", children: titleInner.call(this) }));
        case "H3":
            return (_jsx("h3", { class: "ui5-title-root", children: titleInner.call(this) }));
        case "H4":
            return (_jsx("h4", { class: "ui5-title-root", children: titleInner.call(this) }));
        case "H5":
            return (_jsx("h5", { class: "ui5-title-root", children: titleInner.call(this) }));
        case "H6":
            return (_jsx("h6", { id: `${this._id}-inner`, class: "ui5-title-root", children: titleInner.call(this) }));
        default:
            return (_jsx("h2", { class: "ui5-title-root", children: titleInner.call(this) }));
    }
}
function titleInner() {
    return (_jsx("span", { id: `${this._id}-inner`, children: _jsx("slot", {}) }));
}
//# sourceMappingURL=TitleTemplate.js.map