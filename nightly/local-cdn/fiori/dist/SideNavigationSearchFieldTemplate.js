import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import Input from "@ui5/webcomponents/dist/Input.js";
import InputIcon from "@ui5/webcomponents/dist/InputIcon.js";
import search from "@ui5/webcomponents-icons/dist/search.js";
export default function SideNavigationSearchFieldTemplate() {
    return (_jsx("div", { class: "ui5-side-navigation-search-field-root", children: _jsx(Input, { id: `${this._id}-inner`, class: "ui5-side-navigation-search-field-input", value: this.value, type: "Search", placeholder: this._effectivePlaceholder, showClearIcon: !this.hideClearIcon, noTypeahead: true, _inputAccInfo: this._inputAccInfo, "data-sap-focus-ref": true, onInput: this._handleInput, onKeyDown: this._onkeydown, children: _jsx(InputIcon, { slot: "icon", class: "ui5-side-navigation-search-field-search-icon", name: search, accessibleName: this._translations.searchIcon, onClick: this._handleSearchIconPress }) }) }));
}
//# sourceMappingURL=SideNavigationSearchFieldTemplate.js.map