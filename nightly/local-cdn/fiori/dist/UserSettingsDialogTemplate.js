import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Text from "@ui5/webcomponents/dist/Text.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import ToolbarButton from "@ui5/webcomponents/dist/ToolbarButton.js";
import Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import search from "@ui5/webcomponents-icons/dist/search.js";
export default function UserSettingsDialogTemplate() {
    return (_jsxs(Dialog, { class: "ui5-user-settings-dialog", open: this.open, stretch: true, accessibleName: this.accessibleNameText, "onui5-_collapse": this._handleCollapseClick, onOpen: this._handleDialogAfterOpen, onBeforeClose: this._handleDialogBeforeClose, onClose: this._handleDialogAfterClose, initialFocus: `setting-${this._selectedSetting?._id}`, children: [_jsxs("div", { class: "ui5-user-settings-root", children: [_jsxs("div", { class: "ui5-user-settings-side", "aria-orientation": "vertical", "aria-roledescription": this.ariaRoleDescList, children: [_jsxs("div", { class: "ui5-user-settings-side-header", children: [this.headerText &&
                                        _jsx(Title, { level: "H1", size: "H4", children: this.headerText }), this.showSearchField &&
                                        _jsx(Input, { placeholder: "Search", type: "Search", class: "ui5-user-settings-side-search", onInput: this._handleInput, children: _jsx(Icon, { id: "searchFieldIcon", slot: "icon", name: search, showTooltip: true }) })] }), this._showNoSearchResult ?
                                _jsx("div", { class: "ui5-user-settings-side-search", children: _jsx(Text, { children: this.noSearchResultsText }) })
                                :
                                    renderList.call(this, this._filteredItems, "ui5-user-settings-side-items"), this._filteredFixedItems.length > 0 && renderList.call(this, this._filteredFixedItems, "ui5-user-settings-side-fixedItems")] }), _jsx("div", { class: "ui5-user-settings-content", children: _jsx("slot", { name: this._selectedItemSlotName }) })] }), _jsx(Toolbar, { slot: "footer", design: "Transparent", children: _jsx(ToolbarButton, { design: "Transparent", text: this.closeButtonText, tooltip: this.closeButtonText, onClick: this._handleCloseButtonClick }) })] }));
}
function renderList(items = [], classes) {
    return _jsx(List, { accessibleRole: "Menu", onItemClick: this._handleItemClick, class: classes, separators: "None", children: items.map(item => (_jsx(ListItemStandard, { class: !item._icon && item._siblingsWithIcon ? "ui5-user-settings-item-no-icon" : "", id: `setting-${item._id}`, icon: !item._icon && item._siblingsWithIcon ? undefined : item._icon, tooltip: item._tooltip, ref: this.captureRef.bind(item), selected: item.selected, disabled: item.disabled, accessibleName: item.ariaLabelledByText, type: this._showSettingWithNavigation ? "Navigation" : "Active", children: item.text }))) });
}
//# sourceMappingURL=UserSettingsDialogTemplate.js.map