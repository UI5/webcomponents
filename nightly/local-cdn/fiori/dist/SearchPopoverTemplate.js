import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListSeparator from "@ui5/webcomponents/dist/types/ListSeparator.js";
import PopoverHorizontalAlign from "@ui5/webcomponents/dist/types/PopoverHorizontalAlign.js";
import PopoverPlacement from "@ui5/webcomponents/dist/types/PopoverPlacement.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import SuggestionItem from "@ui5/webcomponents/dist/SuggestionItem.js";
import InputKeyHint from "@ui5/webcomponents/dist/types/InputKeyHint.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import ListAccessibleRole from "@ui5/webcomponents/dist/types/ListAccessibleRole.js";
export default function SearchPopoverTemplate(headerTemplate) {
    return (_jsxs(ResponsivePopover, { id: "ui5-search-list", hideArrow: true, preventFocusRestore: true, preventInitialFocus: !isPhone(), accessibleNameRef: "suggestions-speech-output message-area-text message-area-description", placement: PopoverPlacement.Bottom, horizontalAlign: PopoverHorizontalAlign.Start, open: this.open, opener: this, onOpen: this._handleOpen, onClose: this._handleClose, onBeforeClose: this._handleBeforeClose, onBeforeOpen: this._handleBeforeOpen, class: {
            "ui5-search-popover": true,
            "ui5-search-popover-phone": isPhone(),
        }, children: [isPhone() ? (headerTemplate ? headerTemplate.call(this) : (_jsx(_Fragment, { children: _jsxs("header", { slot: "header", class: "ui5-search-popup-searching-header", children: [_jsx(Input, { class: "ui5-search-popover-search-field", onInput: this._handleMobileInput, showClearIcon: this.showClearIcon, noTypeahead: this.noTypeahead, hint: InputKeyHint.Search, onKeyDown: this._onMobileInputKeydown, children: this._flattenItems.map(item => {
                                return (_jsx(SuggestionItem, { text: item.text }));
                            }) }), _jsx(Button, { design: ButtonDesign.Transparent, onClick: this._handleCancel, children: this.cancelButtonText })] }) }))) : null, _jsxs("main", { class: "ui5-search-popover-content", children: [_jsx("slot", { name: "messageArea" }), _jsx("div", { class: "search-popover-busy-wrapper", children: _jsx(BusyIndicator, { active: true }) }), this.items.length ?
                        _jsx(List, { class: "ui5-search-list", separators: ListSeparator.None, onKeyDown: this._onItemKeydown, accessibleRole: ListAccessibleRole.ListBox, onItemClick: this._onItemClick, children: _jsx("slot", {}) })
                        : (_jsx("slot", { name: "illustration" })), _jsx("span", { class: "ui5-hidden-text", id: "suggestions-speech-output", children: this.suggestionsText }), this.messageArea[0]?.text ? (_jsx("span", { class: "ui5-hidden-text", id: "message-area-text", children: this.messageArea[0].text })) : null, this.messageArea[0]?.description ? (_jsx("span", { class: "ui5-hidden-text", id: "message-area-description", children: this.messageArea[0].description })) : null] }), this.action.length ? (_jsx("slot", { onKeyDown: this._handleActionKeydown, name: "action", slot: "footer" })) : null] }));
}
//# sourceMappingURL=SearchPopoverTemplate.js.map