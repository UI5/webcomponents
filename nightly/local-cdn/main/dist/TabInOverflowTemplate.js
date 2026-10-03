import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import ListItemCustom from "./ListItemCustom.js";
export default function TabInOverflowTemplate() {
    return (_jsx(ListItemCustom, { id: `${this._id}-li`, class: this.overflowClasses, style: this._forcedStyleInOverflow, type: this.overflowState, disabled: this.effectiveDisabled, selected: this.selected, movable: this.movable, ref: this.captureRef.bind(this), children: _jsx("div", { class: "ui5-tab-overflow-itemContent-wrapper", children: _jsxs("div", { class: "ui5-tab-overflow-itemContent", children: [this.semanticIconName && (_jsx(Icon, { class: this.semanticIconClasses, name: this.semanticIconName })), this.icon && (_jsx(Icon, { name: this.icon })), this.text, this.additionalText && (_jsxs(_Fragment, { children: ["\u00A0(", this.additionalText, ")"] })), this._designDescription && (_jsx("div", { id: `${this._id}-designDescription`, class: "ui5-hidden-text", children: this._designDescription }))] }) }) }));
}
//# sourceMappingURL=TabInOverflowTemplate.js.map