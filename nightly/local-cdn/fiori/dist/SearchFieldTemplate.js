import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Option from "@ui5/webcomponents/dist/Option.js";
import Select from "@ui5/webcomponents/dist/Select.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import search from "@ui5/webcomponents-icons/dist/search.js";
import slimArrowDown from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import SearchFieldScopePopoverTemplate from "./SearchFieldScopePopoverTemplate.js";
export default function SearchFieldTemplate(options) {
    return (!options?.forceExpanded && this.collapsed ? (_jsx(Button, { class: "ui5-shell-search-field-button", icon: search, design: ButtonDesign.Transparent, "data-sap-focus-ref": true, loading: this.fieldLoading, onClick: this._handleSearchIconPress, tooltip: this._effectiveIconTooltip, accessibleName: this._effectiveIconTooltip, accessibilityAttributes: this._searchButtonAccessibilityAttributes })) : (_jsxs(BusyIndicator, { class: "ui5-search-field-busy-indicator", active: this.fieldLoading, children: [_jsx("div", { class: "ui5-search-field-root", role: "search", onFocusOut: this._onFocusOutSearch, children: _jsxs("div", { class: "ui5-search-field-content", children: [this.scopes?.length ? (_jsx(_Fragment, { children: !this._isMobileView ? (
                            // Desktop/Tablet: Show full Select component
                            _jsxs(_Fragment, { children: [_jsx(Select, { onChange: this._handleScopeChange, class: "ui5-search-field-select", accessibleName: this._translations.scope, tooltip: this._translations.scope, value: this.scopeValue, exportparts: "label:scope-label", children: this.scopes.map(scopeOption => (_jsx(Option, { value: scopeOption.value, "data-ui5-stable": scopeOption.stableDomRef, ref: this.captureRef.bind(scopeOption), children: scopeOption.text }))) }), _jsx("div", { class: "ui5-search-field-separator" })] })) : (
                            // Mobile/Phone: Show icon button only
                            _jsxs(_Fragment, { children: [_jsx(Button, { ref: this.captureScopeIconRef.bind(this), class: "ui5-search-field-scope-button", icon: slimArrowDown, design: ButtonDesign.Transparent, onClick: this._handleScopeIconPress, tooltip: this._scopeIconAccessibleName, accessibleName: this._scopeIconAccessibleName, accessibilityAttributes: {
                                            hasPopup: "dialog",
                                            expanded: this._scopePopoverOpen,
                                        } }), _jsx("div", { class: "ui5-search-field-separator" })] })) })) : this.filterButton?.length ? (_jsxs(_Fragment, { children: [_jsx("div", { class: "ui5-filter-wrapper", style: "display: contents", children: _jsx("slot", { name: "filterButton" }) }), _jsx("div", { class: "ui5-search-field-separator" })] })) : null, _jsx("input", { class: "ui5-search-field-inner-input", role: "searchbox", "aria-description": this.accessibleDescription, "aria-label": this.accessibleName || this._translations.searchFieldAriaLabel, "aria-autocomplete": "both", "aria-controls": "ui5-search-list", value: this.value, placeholder: this._effectivePlaceholder, "data-sap-focus-ref": true, onInput: this._handleInput, onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, onKeyDown: this._onkeydown, onClick: this._handleInnerClick }), this._effectiveShowClearIcon &&
                            _jsx(Icon, { class: "ui5-shell-search-field-icon", name: decline, showTooltip: true, accessibleName: this._translations.clearIcon, onClick: this._handleClear }), _jsx(Icon, { class: {
                                "ui5-shell-search-field-icon": true,
                                "ui5-shell-search-field-search-icon": this._isSearchIcon,
                            }, name: search, showTooltip: true, accessibleName: this._effectiveIconTooltip, onClick: this._handleSearchIconPress })] }) }), SearchFieldScopePopoverTemplate.call(this)] })));
}
//# sourceMappingURL=SearchFieldTemplate.js.map