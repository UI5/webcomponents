import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import Button from "./Button.js";
import List from "./List.js";
import ListItemStandard from "./ListItemStandard.js";
import ResponsivePopover from "./ResponsivePopover.js";
export default function BreadcrumbsPopoverTemplate() {
    const itemsToDisplay = isPhone()
        ? this._mobilePopoverItems
        : this._overflowItemsData;
    return (_jsxs(ResponsivePopover, { class: "ui5-breadcrumbs-popover", hideArrow: true, _hideHeader: true, contentOnlyOnDesktop: true, placement: "Bottom", horizontalAlign: "Start", accessibleName: this._accessibleNamePopover, onKeyDown: this._onkeydown, children: [_jsx(List, { selectionMode: "Single", separators: "None", onSelectionChange: this._onOverflowListItemSelect, children: itemsToDisplay.map(item => _jsx(ListItemStandard, { id: `${item._id}-li`, accessibleName: item.accessibleName, "data-ui5-stable": item.stableDomRef, children: item.textContent })) }), _jsx("div", { slot: "footer", class: "ui5-breadcrumbs-popover-footer", children: _jsx(Button, { design: "Transparent", onClick: this._closeRespPopover, children: this._cancelButtonText }) })] }));
}
//# sourceMappingURL=BreadcrumbsPopoverTemplate.js.map