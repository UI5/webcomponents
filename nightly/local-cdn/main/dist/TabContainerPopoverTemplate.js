import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import Button from "./Button.js";
export default function TabContainerPopoverTemplate() {
    return (_jsxs(ResponsivePopover, { id: `${this._id}-overflowMenu`, horizontalAlign: "End", placement: "Bottom", contentOnlyOnDesktop: true, hideArrow: true, _hideHeader: true, class: "ui5-tab-container-responsive-popover", onDragStart: this._onDragStart, children: [_jsx(List, { selectionMode: "Single", separators: "None", onItemClick: this._onOverflowListItemClick, onMoveOver: this._onPopoverListMoveOver, onMove: this._onPopoverListMove, onKeyDown: this._onPopoverListKeyDown, children: this._popoverItemsFlat.map(item => item.overflowPresentation) }), _jsx("div", { slot: "footer", class: "ui5-responsive-popover-footer", children: _jsx(Button, { design: "Transparent", onClick: this._closePopover, children: this.popoverCancelButtonText }) })] }));
}
//# sourceMappingURL=TabContainerPopoverTemplate.js.map