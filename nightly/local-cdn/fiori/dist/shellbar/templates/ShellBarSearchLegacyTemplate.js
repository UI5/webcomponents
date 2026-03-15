import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "@ui5/webcomponents/dist/Button.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
function ShellBarSearchField() {
    return (
    // .ui5-shellbar-search-field-area is used to measure the width of
    // the search field. It must be present even if the search is in full-width mode.
    _jsx("div", { class: "ui5-shellbar-search-field-area", children: this.showSearchField && !this.showFullWidthSearch && (_jsx("div", { class: "ui5-shellbar-search-field ui5-shellbar-gap-start", children: _jsx("slot", { name: "searchField" }) })) }));
}
function ShellBarSearchFieldFullWidth() {
    return (_jsxs("div", { class: "ui5-shellbar-search-full-width-wrapper", children: [_jsx("div", { class: "ui5-shellbar-search-full-field", children: _jsx("slot", { name: "searchField" }) }), _jsx(Button, { class: "ui5-shellbar-cancel-button ui5-shellbar-gap-start", design: ButtonDesign.Transparent, onClick: this.handleCancelButtonClick, children: "Cancel" })] }));
}
function ShellBarSearchButton() {
    const searchAction = this.getAction("search");
    return (_jsx(_Fragment, { children: !this.hideSearchButton && (_jsx(Button, { "data-ui5-stable": searchAction?.stableDomRef, class: "ui5-shellbar-search-button ui5-shellbar-action-button ui5-shellbar-gap-start ui5-shellbar-search-toggle", icon: searchAction?.icon, design: "Transparent", onClick: this.handleSearchButtonClick, tooltip: this.actionsAccessibilityInfo.search.title, "aria-expanded": this.showSearchField, accessibilityAttributes: this.actionsAccessibilityInfo.search.accessibilityAttributes })) }));
}
export { ShellBarSearchField, ShellBarSearchButton, ShellBarSearchFieldFullWidth, };
//# sourceMappingURL=ShellBarSearchLegacyTemplate.js.map