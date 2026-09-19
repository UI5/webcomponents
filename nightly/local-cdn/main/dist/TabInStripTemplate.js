import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "./Button.js";
import Icon from "./Icon.js";
import slimArrowDownIcon from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
function additionalText() {
    return (_jsx("span", { class: this.stripClasses.additionalTextClasses, id: `${this._id}-additionalText`, children: this.additionalText }));
}
export default function TabInStripTemplate() {
    return (_jsxs("div", { id: this._id, class: this.stripClasses.itemClasses, tabindex: -1, role: "tab", "aria-roledescription": this._roleDescription, "aria-haspopup": this._ariaHasPopup, "aria-posinset": this._forcedPosinset, "aria-setsize": this._forcedSetsize, "aria-controls": "ui5-tc-content", "aria-selected": this.effectiveSelected, "aria-disabled": this.effectiveDisabled, "aria-labelledby": this.ariaLabelledBy, draggable: this.movable, onDragStart: this._ondragstart, onDragEnd: this._ondragend, ref: this.captureRef.bind(this), children: [this.icon &&
                _jsx("div", { class: "ui5-tab-strip-item-icon-outer", children: _jsx(Icon, { id: `${this._id}-icon`, name: this.icon, class: "ui5-tab-strip-item-icon" }) }), this._designDescription &&
                _jsx("div", { id: `${this._id}-designDescription`, class: "ui5-tab-strip-design-description", children: this._designDescription }), _jsxs("div", { class: "ui5-tab-strip-itemContent", children: [!this._isInline &&
                        additionalText.call(this), this.text &&
                        _jsxs("span", { class: "ui5-tab-strip-itemText", id: `${this._id}-text`, children: [this.semanticIconName && (_jsx(Icon, { class: this.semanticIconClasses, name: this.semanticIconName })), this.displayText, this.isSingleClickArea &&
                                    _jsx("span", { class: "ui5-tab-single-click-icon", children: _jsx(Icon, { name: slimArrowDownIcon }) })] })] }), this.requiresExpandButton &&
                _jsxs(_Fragment, { children: [_jsx("div", { class: "ui5-tab-expand-button-separator" }), _jsx("div", { class: "ui5-tab-expand-button", children: _jsx(Button, { ref: this.captureButtonRef.bind(this), icon: slimArrowDownIcon, design: "Transparent", tabindex: -1, disabled: this.disabled, tooltip: this.expandButtonTitle, accessibilityAttributes: this.expandBtnAccessibilityAttributes }) })] })] }));
}
//# sourceMappingURL=TabInStripTemplate.js.map