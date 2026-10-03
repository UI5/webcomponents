import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import ListSeparator from "@ui5/webcomponents/dist/types/ListSeparator.js";
import PopoverPlacement from "@ui5/webcomponents/dist/types/PopoverPlacement.js";
import PopoverHorizontalAlign from "@ui5/webcomponents/dist/types/PopoverHorizontalAlign.js";
export default function SearchFieldScopePopoverTemplate() {
    return (_jsx(ResponsivePopover, { id: `${this._id}-scope-popover`, class: "ui5-search-field-scope-popover", hideArrow: true, modal: false, placement: PopoverPlacement.Bottom, horizontalAlign: PopoverHorizontalAlign.Start, open: this._scopePopoverOpen, opener: this._scopeIconButton || this, onClose: this._handleScopePopoverClose, children: _jsx(List, { separators: ListSeparator.None, onItemClick: this._handleScopeItemClick.bind(this), children: this.scopes.map(scopeOption => (_jsx(ListItemStandard, { "data-scope-value": scopeOption.value, selected: scopeOption.value === this.scopeValue, children: scopeOption.text }))) }) }));
}
//# sourceMappingURL=SearchFieldScopePopoverTemplate.js.map