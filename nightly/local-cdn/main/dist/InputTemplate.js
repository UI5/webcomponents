import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import InputPopoverTemplate from "./InputPopoverTemplate.js";
export default function InputTemplate(hooks) {
    const suggestionsList = hooks?.suggestionsList;
    const mobileHeader = hooks?.mobileHeader;
    const preContent = hooks?.preContent || defaultPreContent;
    const postContent = hooks?.postContent || defaultPostContent;
    return (_jsxs(_Fragment, { children: [_jsx("div", { class: "ui5-input-root ui5-input-focusable-element", part: "root", onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, children: _jsxs("div", { class: "ui5-input-content", children: [preContent.call(this), _jsx("input", { id: "inner", part: "input", class: "ui5-input-inner", style: this.styles.innerInput, type: this.inputNativeType, "inner-input": true, "inner-input-with-icon": !!this.icon.length, disabled: this.disabled, readonly: this._readonly, value: this.value, required: this.required, placeholder: this._placeholder, maxlength: this.maxlength, role: this.accInfo.role, enterkeyhint: this.hint, "aria-controls": this.accInfo.ariaControls, "aria-invalid": this.accInfo.ariaInvalid, "aria-haspopup": this.accInfo.ariaHasPopup, "aria-describedby": this.accInfo.ariaDescribedBy, "aria-roledescription": this.accInfo.ariaRoledescription, "aria-autocomplete": this.accInfo.ariaAutoComplete, "aria-expanded": this.accInfo.ariaExpanded, "aria-label": this.accInfo.ariaLabel, "aria-required": this.required, autocomplete: "off", "data-sap-focus-ref": true, step: this.nativeInputAttributes.step, min: this.nativeInputAttributes.min, max: this.nativeInputAttributes.max, onInput: this._handleNativeInput, onChange: this._handleChange, onSelect: this._handleSelect, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onClick: this._click, onFocusIn: this.innerFocusIn }), this._effectiveShowClearIcon &&
                            _jsx("div", { tabindex: -1, class: "ui5-input-clear-icon-wrapper inputIcon", part: "clear-icon-wrapper", onClick: this._clear, onMouseDown: this._iconMouseDown, children: _jsx(Icon, { part: "clear-icon", class: "ui5-input-clear-icon", name: decline, tabindex: -1, accessibleName: this.clearIconAccessibleName }) }), this.icon.length > 0 &&
                            _jsx("div", { class: "ui5-input-icon-root", tabindex: -1, children: _jsx("slot", { name: "icon" }) }), _jsx("div", { class: "ui5-input-value-state-icon", children: this._valueStateInputIcon }), postContent.call(this), this._effectiveShowSuggestions &&
                            _jsxs(_Fragment, { children: [_jsx("span", { id: "suggestionsText", class: "ui5-hidden-text", children: this.suggestionsText }), _jsx("span", { id: "selectionText", class: "ui5-hidden-text", "aria-live": "polite", role: "status" }), _jsx("span", { id: "suggestionsCount", class: "ui5-hidden-text", "aria-live": "polite", children: this.availableSuggestionsCount })] }), this.accInfo.ariaDescription &&
                            _jsx("span", { id: "descr", class: "ui5-hidden-text", children: this.accInfo.ariaDescription }), this.accInfo.accessibleDescription &&
                            _jsx("span", { id: "accessibleDescription", class: "ui5-hidden-text", children: this.accInfo.accessibleDescription }), this.linksInAriaValueStateHiddenText.length > 0 &&
                            _jsx("span", { id: "hiddenText-value-state-link-shortcut", class: "ui5-hidden-text", children: this.valueStateLinksShortcutsTextAcc }), this.hasValueState &&
                            _jsx("span", { id: "valueStateDesc", class: "ui5-hidden-text", children: this.ariaValueStateHiddenText })] }) }), InputPopoverTemplate.call(this, { suggestionsList, mobileHeader })] }));
}
function defaultPreContent() { }
function defaultPostContent() { }
//# sourceMappingURL=InputTemplate.js.map