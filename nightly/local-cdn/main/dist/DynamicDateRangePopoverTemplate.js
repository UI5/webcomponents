import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import ListItemStandard from "./ListItemStandard.js";
import Button from "./Button.js";
import Title from "./Title.js";
import slimArrowLeft from "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import ListItemType from "./types/ListItemType.js";
export default function DynamicDateRangePopoverTemplate() {
    return (_jsxs(ResponsivePopover, { id: `${this._id}-responsive-popover`, opener: this, open: this.open, allowTargetOverlap: true, placement: "Bottom", horizontalAlign: "Start", hideArrow: true, _hideHeader: true, onClose: this.onPopoverClose, onBeforeOpen: this.onPopoverBeforeOpen, onKeyDown: this.onKeyDownPopover, accessibleName: this.popoverAccessibleName, children: [this._hasCurrentOptionTemplate &&
                _jsxs("div", { slot: "header", class: "ui5-ddr-header", children: [_jsx(Button, { iconOnly: true, icon: slimArrowLeft, design: "Transparent", onClick: this.onButtonBackClick, tooltip: this.tooltipNavigationIcon }), _jsx(Title, { children: this._currentOption?.text })] }), !this._hasCurrentOptionTemplate ? _jsx("div", { class: "ui5-dynamic-date-range-options", children: _jsx(List, { class: "ui5-dynamic-date-range-options-list", separators: "None", selectionMode: "Single", onItemClick: this._selectOption, children: this.optionsObjects.map(option => (_jsx(ListItemStandard, { selected: option.operator === this.value?.operator, iconEnd: true, icon: option.icon, wrappingType: "Normal", type: option.template ? ListItemType.Navigation : ListItemType.Active, children: option.text }))) }) })
                :
                    _jsxs("div", { class: "ui5-dynamic-date-range-option-container", children: [this._currentOption?.template?.call(this), _jsx("div", { class: "ui5-ddr-current-value", children: this.currentValueText })] }), this._hasCurrentOptionTemplate &&
                _jsxs("div", { slot: "footer", children: [_jsx(Button, { design: "Emphasized", onClick: this._submitValue, children: "Submit" }), _jsx(Button, { design: "Transparent", onClick: this._close, children: "Close" })] })] }));
}
//# sourceMappingURL=DynamicDateRangePopoverTemplate.js.map