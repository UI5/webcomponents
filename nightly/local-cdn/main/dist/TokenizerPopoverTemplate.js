import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "./Button.js";
import List from "./List.js";
import ListItemStandard from "./ListItemStandard.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Title from "./Title.js";
export default function TokenizerPopoverTemplate() {
    return (_jsxs(ResponsivePopover, { "tokenizer-popover": "true", open: this.open, opener: this.morePopoverOpener, style: { "min-width": this.popoverMinWidth ? `${this.popoverMinWidth}px` : `${this.getBoundingClientRect().width}px` }, contentOnlyOnDesktop: true, preventFocusRestore: true, hideArrow: this.hidePopoverArrow, placement: "Bottom", horizontalAlign: "Start", onClose: this.handleAfterClose, onBeforeClose: this.handleBeforeClose, onBeforeOpen: this.handleBeforeOpen, children: [this._isPhone &&
                _jsx("div", { slot: "header", class: "ui5-responsive-popover-header", children: _jsx("div", { class: "row", children: _jsx(Title, { level: "H1", wrappingType: "None", class: "ui5-responsive-popover-header-text", children: this.morePopoverTitle }) }) }), _jsx(List, { class: "ui5-tokenizer-list", selectionMode: this._nMoreListMode, separators: "None", onKeyDown: this._onPopoverListKeydown, onItemDelete: this.itemDelete, children: this._tokens
                    .map(token => _jsx(ListItemStandard, { "data-ui5-token-ref-id": token._id, wrappingType: "Normal", text: token.text }, String(token._id))) }), this._isPhone &&
                _jsxs("div", { slot: "footer", class: "ui5-responsive-popover-footer", children: [_jsx(Button, { design: "Emphasized", "data-ui5-tokenizer-dialog-ok-button": true, onClick: this.handleDialogButtonPress, children: this._okButtonText }), _jsx(Button, { design: "Transparent", class: "ui5-responsive-popover-close-btn", onClick: this.handleDialogButtonPress, children: this._cancelButtonText })] })] }));
}
//# sourceMappingURL=TokenizerPopoverTemplate.js.map