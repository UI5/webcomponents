import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import Button from "./Button.js";
import List from "./List.js";
import Input from "./Input.js";
import Title from "./Title.js";
import PopoverHorizontalAlign from "./types/PopoverHorizontalAlign.js";
import Popover from "./Popover.js";
import ResponsivePopover from "./ResponsivePopover.js";
import BusyIndicator from "./BusyIndicator.js";
import SuggestionItem from "./SuggestionItem.js";
import generateHighlightedMarkupFirstMatch from "@ui5/webcomponents-base/dist/util/generateHighlightedMarkupFirstMatch.js";
import { LOADING_DELAY } from "./features/ComboBoxLazyLoading.js";
export default function ComboBoxPopoverTemplate() {
    return (_jsxs(_Fragment, { children: [_jsxs(ResponsivePopover, { id: this.responsivePopoverId, class: this.classes.popover, style: this.styles.suggestionsPopover, tabindex: -1, open: this.open, opener: this, hideArrow: true, preventFocusRestore: true, preventInitialFocus: true, placement: "Bottom", horizontalAlign: "Start", accessibleName: this._popupLabel, onBeforeOpen: this._beforeOpenPopover, onOpen: this._afterOpenPopover, onClose: this._afterClosePopover, onKeyDown: this._handlePopoverKeydown, onFocusOut: this._handlePopoverFocusout, children: [this._isPhone && dialogHeader.call(this), valueStateHeader.call(this), content.call(this), this._isPhone && dialogFooter.call(this)] }), this.shouldOpenValueStateMessagePopover &&
                _jsx(Popover, { preventFocusRestore: true, preventInitialFocus: true, hideArrow: true, tabindex: -1, class: "ui5-valuestatemessage-popover", horizontalAlign: PopoverHorizontalAlign.Start, placement: "Bottom", opener: this, open: this.valueStateOpen, onClose: this._handleValueStatePopoverAfterClose, onFocusOut: this._handleValueStatePopoverFocusout, children: _jsxs("div", { slot: "header", class: this.classes.popoverValueState, children: [_jsx(Icon, { class: "ui5-input-value-state-message-icon", name: this._valueStateMessageIcon }), valueStateMessage.call(this)] }) })] }));
}
function valueStateMessage() {
    return (_jsx(_Fragment, { children: this.shouldDisplayDefaultValueStateMessage ? this.valueStateDefaultText : _jsx("slot", { name: "valueStateMessage" }) }));
}
function valueStateHeader() {
    if (!this.hasValueStateText) {
        return;
    }
    if (this._isPhone) {
        return (_jsxs("div", { class: this.classes.popoverValueState, style: this.styles.suggestionPopoverHeader, children: [_jsx(Icon, { class: "ui5-input-value-state-message-icon", name: this._valueStateMessageIcon }), this.open && valueStateMessage.call(this)] }));
    }
    return (_jsxs("div", { slot: "header", class: {
            "ui5-responsive-popover-header": true,
            ...this.classes.popoverValueState,
        }, style: this.styles.suggestionPopoverHeader, children: [_jsx(Icon, { class: "ui5-input-value-state-message-icon", name: this._valueStateMessageIcon }), this.open && valueStateMessage.call(this)] }));
}
function content() {
    if (this.loading && (this._isPhone || !this.hasValueState)) {
        return _jsx(BusyIndicator, { active: true, class: "ui5-combobox-busy", delay: LOADING_DELAY });
    }
    const loadingOnDesktopWithValueState = this.loading && !this._isPhone && this.hasValueState;
    const hasFilteredItems = !this.loading && !!this._filteredItems?.length;
    if (!loadingOnDesktopWithValueState && !hasFilteredItems) {
        return;
    }
    return (_jsxs(_Fragment, { children: [loadingOnDesktopWithValueState &&
                _jsx("div", { class: "ui5-combobox-busy-container", children: _jsx(BusyIndicator, { active: true, class: "ui5-combobox-busy", delay: LOADING_DELAY }) }), hasFilteredItems &&
                _jsx(List, { class: "ui5-combobox-items-list", separators: "None", accessibleRole: "ListBox", selectionMode: "Single", onItemClick: this._selectItem, onItemFocused: this._onItemFocus, onMouseDown: this._itemMousedown, children: this._filteredItems.map(item => _jsx("slot", { name: item._individualSlot })) })] }));
}
function dialogFooter() {
    return (_jsxs("div", { slot: "footer", class: "ui5-responsive-popover-footer", children: [_jsx(Button, { design: "Emphasized", onClick: this._closeRespPopover, children: this._dialogOkButtonText }), _jsx(Button, { class: "ui5-responsive-popover-close-btn", design: "Transparent", onClick: this._closeRespPopover, children: this._dialogCancelButtonText })] }));
}
function dialogHeader() {
    return _jsx(_Fragment, { children: _jsxs("div", { slot: "header", class: "ui5-responsive-popover-header", children: [_jsx("div", { class: "row", children: _jsx(Title, { level: "H1", wrappingType: "None", class: "ui5-responsive-popover-header-text", children: this._headerTitleText }) }), _jsx("div", { class: "row", children: _jsx(Input, { open: this.openOnMobile, placeholder: this.placeholder, valueState: this.valueState, showClearIcon: this.showClearIcon, noTypeahead: this.noTypeahead, onKeyDown: this._handleMobileKeydown, onInput: this._handleMobileInput, onChange: this._inputChange, children: !this.loading && this._filteredItems.flatMap(item => {
                            if (item.isGroupItem && item.items) {
                                // For group items, return all nested items
                                return item.items
                                    .filter(nestedItem => !!nestedItem)
                                    .map(nestedItem => _jsx(SuggestionItem, { text: nestedItem.text, additionalText: nestedItem.additionalText, markupText: generateHighlightedMarkupFirstMatch(nestedItem.text || "", this.filterValue) }));
                            }
                            // For regular items
                            return _jsx(SuggestionItem, { text: item.text, additionalText: item.additionalText, markupText: generateHighlightedMarkupFirstMatch(item.text || "", this.filterValue) });
                        }) }) })] }) });
}
//# sourceMappingURL=ComboBoxPopoverTemplate.js.map