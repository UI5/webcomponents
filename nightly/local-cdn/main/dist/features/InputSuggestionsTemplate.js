import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Input from "../Input.js";
import Icon from "../Icon.js";
import List from "../List.js";
import ResponsivePopover from "../ResponsivePopover.js";
import Button from "../Button.js";
import ListAccessibleRole from "../types/ListAccessibleRole.js";
import Title from "../Title.js";
export default function InputSuggestionsTemplate(hooks) {
    const suggestionsList = hooks?.suggestionsList || defaultSuggestionsList;
    // Mobile header hook - intended only for MultiInput design scenario
    const mobileHeader = hooks?.mobileHeader;
    const valueStateMessage = hooks?.valueStateMessage;
    const valueStateMessageInputIcon = hooks?.valueStateMessageInputIcon;
    return (_jsxs(ResponsivePopover, { class: this.classes.popover, hideArrow: true, preventFocusRestore: true, preventInitialFocus: true, placement: "Bottom", horizontalAlign: "Start", tabindex: -1, style: this.styles.suggestionsPopover, onOpen: this._afterOpenPicker, onClose: this._afterClosePicker, onScroll: this._scroll, open: this.open, opener: this, accessibleName: this._popupLabel, children: [this._isPhone &&
                _jsx(_Fragment, { children: _jsxs("div", { slot: "header", class: "ui5-responsive-popover-header", children: [_jsx("div", { class: "row", children: _jsx(Title, { level: "H1", wrappingType: "None", class: "ui5-responsive-popover-header-text", children: this._headerTitleText }) }), _jsx("div", { class: "row", children: _jsxs("div", { class: "input-root-phone native-input-wrapper", children: [_jsx(Input, { class: "ui5-input-inner-phone", type: this.inputType, value: this.value, showClearIcon: this.showClearIcon, placeholder: this.placeholder, onInput: this._handleInput }), mobileHeader?.call(this)] }) }), this.hasValueStateMessage &&
                                _jsxs("div", { class: this.classes.popoverValueState, style: this.styles.suggestionPopoverHeader, children: [_jsx(Icon, { class: "ui5-input-value-state-message-icon", name: valueStateMessageInputIcon?.call(this) }), this.open && valueStateMessage?.call(this)] })] }) }), !this._isPhone && this.hasValueStateMessage &&
                _jsxs("div", { slot: "header", class: {
                        "ui5-responsive-popover-header": true,
                        ...this.classes.popoverValueState,
                    }, style: this.styles.suggestionPopoverHeader, children: [_jsx(Icon, { class: "ui5-input-value-state-message-icon", name: valueStateMessageInputIcon?.call(this) }), this.open && valueStateMessage?.call(this)] }), this.showSuggestions && suggestionsList.call(this), this._isPhone &&
                _jsxs("div", { slot: "footer", class: "ui5-responsive-popover-footer", children: [_jsx(Button, { design: "Emphasized", onClick: this._confirmMobileValue, children: this._suggestionsOkButtonText }), _jsx(Button, { class: "ui5-responsive-popover-close-btn", design: "Transparent", onClick: this._cancelMobileValue, children: this._suggestionsCancelButtonText })] })] }));
}
function defaultSuggestionsList() {
    return (_jsx(List, { accessibleRole: ListAccessibleRole.ListBox, separators: this.suggestionSeparators, selectionMode: "Single", onMouseDown: this.onItemMouseDown, onItemClick: this._handleSuggestionItemPress, onSelectionChange: this._handleSelectionChange, children: _jsx("slot", {}) }));
}
//# sourceMappingURL=InputSuggestionsTemplate.js.map