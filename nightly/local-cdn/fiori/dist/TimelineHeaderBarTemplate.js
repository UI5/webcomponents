import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButton from "@ui5/webcomponents/dist/ToolbarButton.js";
import ToolbarSpacer from "@ui5/webcomponents/dist/ToolbarSpacer.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import Bar from "@ui5/webcomponents/dist/Bar.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import searchIcon from "@ui5/webcomponents-icons/dist/search.js";
import sortDescending from "@ui5/webcomponents-icons/dist/sort-descending.js";
import addFilter from "@ui5/webcomponents-icons/dist/add-filter.js";
export default function TimelineHeaderBarTemplate() {
    return (_jsxs(_Fragment, { children: [_jsxs(Toolbar, { class: "ui5-timeline-header-bar-toolbar", accessibleName: this._headerBarAccessibleName, children: [_jsx(ToolbarSpacer, {}), this.showSearch && (_jsx(Input, { class: "ui5-timeline-header-bar-search", placeholder: this._searchPlaceholder, value: this.searchValue, showClearIcon: true, accessibleName: this._searchAccessibleName, onInput: this._onSearchInput, children: _jsx(Icon, { slot: "icon", name: searchIcon }) })), this.showSort && (_jsx(ToolbarButton, { icon: sortDescending, design: "Transparent", tooltip: this._sortTooltip, accessibleName: this._sortAccessibleName, onClick: this._onSortClick })), this.showFilter && (_jsx(ToolbarButton, { icon: addFilter, design: "Transparent", tooltip: this._filterAccessibleName, accessibleName: this._filterAccessibleName, onClick: this._onFilterClick }))] }), this.showFilter && (_jsxs(Dialog, { class: "ui5-timeline-filter-dialog", headerText: this._filterDialogTitle, open: this._filterDialogOpen, onClose: this._onFilterDialogClose, children: [_jsx(List, { selectionMode: "Multiple", class: "ui5-timeline-filter-list", children: this.filterOptions.map(option => (_jsx(ListItemStandard, { selected: option.selected, "data-filter-text": option.text, children: option.text }, option.text))) }), _jsxs(Bar, { slot: "footer", design: "Footer", children: [_jsx(Button, { slot: "endContent", design: "Emphasized", onClick: this._onFilterDialogConfirm, children: this._filterDialogOkText }), _jsx(Button, { slot: "endContent", design: "Transparent", onClick: this._onFilterDialogCancel, children: this._filterDialogCancelText })] })] }))] }));
}
//# sourceMappingURL=TimelineHeaderBarTemplate.js.map