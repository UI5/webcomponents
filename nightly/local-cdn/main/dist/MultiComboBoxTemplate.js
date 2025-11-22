import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import MultiComboboxPopoverTemplate from "./MultiComboBoxPopoverTemplate.js";
import Tokenizer from "./Tokenizer.js";
import Token from "./Token.js";
import Icon from "./Icon.js";
export default function MultiComboBoxTemplate() {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { class: "ui5-multi-combobox-root ui5-input-focusable-element", children: [_jsx("span", { id: "ui5-multi-combobox-hiddenText-nMore", class: "ui5-hidden-text", children: this._tokensCountText }), this.hasValueState &&
                        _jsx("span", { id: "ui5-multi-combobox-valueStateDesc", class: "ui5-hidden-text", children: this.ariaValueStateHiddenText }), this.linksInAriaValueStateHiddenText.length > 0 &&
                        _jsx("span", { id: "hiddenText-value-state-link-shortcut", class: "ui5-hidden-text", children: this.getValueStateLinksShortcutsTextAcc }), _jsx(Tokenizer, { slot: "_beginContent", preventPopoverOpen: true, hidePopoverArrow: true, readonly: this.readonly, class: "ui5-multi-combobox-tokenizer", disabled: this.disabled, onShowMoreItemsPress: this._showFilteredItems, opener: this.morePopoverOpener, popoverMinWidth: this._inputWidth, onTokenDelete: this._tokenDelete, onBeforeMorePopoverOpen: this.handleBeforeTokenizerPopoverOpen, onFocusOut: this._tokenizerFocusOut, onFocusIn: this._tokenizerFocusIn, onClick: this._click, onPaste: this._handlePaste, onKeyDown: this._onTokenizerKeydown, expanded: this._tokenizerExpanded, open: this.tokenizerOpen, children: this.items.map((item, index) => {
                            if (item.isGroupItem) {
                                return item.items?.map((groupItem, groupItemIndex) => {
                                    return groupItem.selected && _jsx(Token, { readonly: this.readonly, class: "ui5-multi-combobox-token", "data-ui5-id": groupItem._id, part: `token-${groupItemIndex}`, text: groupItem.text });
                                });
                            }
                            return item.selected && _jsx(Token, { readonly: this.readonly, class: "ui5-multi-combobox-token", "data-ui5-id": item._id, part: `token-${index}`, text: item.text });
                        }) }), _jsx("input", { id: "ui5-multi-combobox-input", value: this.value, "inner-input": true, placeholder: this._getPlaceholder, disabled: this.disabled, readonly: this.readonly, "value-state": this.valueState, onInput: this._inputLiveChange, onChange: this._inputChange, onKeyDown: this._onkeydown, onClick: this._click, onFocusIn: this.inputFocusIn, onFocusOut: this.inputFocusOut, onPaste: this._handlePaste, role: "combobox", "aria-haspopup": "dialog", "aria-expanded": this.open, "aria-autocomplete": "both", "aria-describedby": this.ariaDescribedByText, "aria-required": this.required, "aria-label": this.ariaLabelText, "aria-controls": this.responsivePopoverId, autocomplete: "off", "data-sap-focus-ref": true }), this._effectiveShowClearIcon &&
                        _jsx("div", { onClick: this._clear, class: "ui5-input-clear-icon-wrapper inputIcon", tabIndex: -1, onMouseDown: this._iconMouseDown, children: _jsx(Icon, { tabIndex: -1, class: "ui5-input-clear-icon", name: decline, "accessible-name": this.clearIconAccessibleName }) }), this.icon &&
                        _jsx("slot", { name: "icon" }), !this.readonly &&
                        _jsx(Icon, { name: "slim-arrow-down", class: {
                                "inputIcon": true,
                                "inputIcon--pressed": this._iconPressed,
                            }, slot: "icon", tabIndex: -1, onClick: this.togglePopoverByDropdownIcon, onMouseDown: this._onIconMousedown, onFocusIn: this._forwardFocusToInner, 
                            // pressed={this.open}
                            accessibleName: this._iconAccessibleNameText })] }), MultiComboboxPopoverTemplate.call(this)] }));
}
//# sourceMappingURL=MultiComboBoxTemplate.js.map