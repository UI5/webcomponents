import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import multiSelectAll from "@ui5/webcomponents-icons/dist/multiselect-all.js";
import InputTemplate from "./InputTemplate.js";
import Tokenizer from "./Tokenizer.js";
import ToggleButton from "./ToggleButton.js";
import List from "./List.js";
import ListItemStandard from "./ListItemStandard.js";
import ListAccessibleRole from "./types/ListAccessibleRole.js";
import valueHelp from "@ui5/webcomponents-icons/dist/value-help.js";
export default function MultiInputTemplate() {
    return [
        InputTemplate.call(this, {
            preContent,
            postContent,
            suggestionsList: multiInputSuggestionsList,
            mobileHeader: multiInputMobileHeader,
        }),
    ];
}
function preContent() {
    return (_jsxs(_Fragment, { children: [_jsx("span", { id: "hiddenText-nMore", class: "ui5-hidden-text", children: this._tokensCountText }), this.showValueHelpIcon &&
                _jsx("span", { id: "hiddenText-value-help", class: "ui5-hidden-text", children: this._valueHelpText }), _jsx(Tokenizer, { class: "ui5-multi-input-tokenizer", opener: this.morePopoverOpener, popoverMinWidth: this._inputWidth, hidePopoverArrow: true, expanded: this.tokenizerExpanded, onKeyDown: this._onTokenizerKeydown, onTokenDelete: this.tokenDelete, onFocusOut: this._tokenizerFocusOut, onShowMoreItemsPress: this._showMoreItemsPress, children: this.tokens.map(token => _jsx("slot", { name: token._individualSlot })) })] }));
}
function postContent() {
    return (_jsx(_Fragment, { children: this.showValueHelpIcon &&
            _jsx(Icon, { class: "inputIcon", name: valueHelp, accessibleName: this.valueHelpLabel, onMouseUp: this.valueHelpMouseUp, onMouseDown: this.valueHelpMouseDown, onClick: this.valueHelpPress }) }));
}
function multiInputSuggestionsList() {
    if (this._effectiveShowTokensInSuggestions) {
        return (_jsx(List, { class: "ui5-tokenizer-list", accessibleRole: ListAccessibleRole.ListBox, separators: this.suggestionSeparators, selectionMode: "Delete", onMouseDown: this.onItemMouseDown, onItemClick: this._handleSuggestionItemPress, onSelectionChange: this._handleSelectionChange, onItemDelete: (e) => {
                const listItem = e.detail.item;
                const tokenId = listItem.getAttribute("data-ui5-token-ref-id");
                const token = this.tokens.find((t) => t._id === tokenId);
                if (token) {
                    this.tokenDelete({ detail: { tokens: [token] } });
                }
            }, children: this.tokens?.map((token, index) => (_jsx(ListItemStandard, { class: "ui5-suggestion-token-item", "data-ui5-token-ref-id": token._id, wrappingType: "Normal", text: token.text }, index))) }));
    }
    return (_jsx(List, { accessibleRole: ListAccessibleRole.ListBox, separators: this.suggestionSeparators, selectionMode: "Single", onMouseDown: this.onItemMouseDown, onItemClick: this._handleSuggestionItemPress, onSelectionChange: this._handleSelectionChange, children: _jsx("slot", {}) }));
}
function multiInputMobileHeader() {
    return (_jsx(ToggleButton, { class: "ui5-multi-input-mobile-dialog-button", design: "Transparent", icon: multiSelectAll, accessibleName: this._filterButtonAccessibleName, disabled: !this.tokens?.length, pressed: this._effectiveShowTokensInSuggestions, onClick: () => {
            this._userToggledShowTokens = true;
            this._showTokensInSuggestions = !this._effectiveShowTokensInSuggestions;
        } }));
}
//# sourceMappingURL=MultiInputTemplate.js.map