import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "@ui5/webcomponents/dist/Button.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
function ShellBarSearchField() {
    return (
    // .ui5-shellbar-search-field-area is used to measure the width of
    // the search field. It must be present even if the search is in full-width mode.
    _jsx("div", { class: {
            "ui5-shellbar-search-field-area ui5-shellbar-gap-start ui5-shellbar-search-toggle": true,
            "ui5-shellbar-hidden": this.isHidden("search")
        }, children: !this.showFullWidthSearch && (_jsx("slot", { name: "searchField" })) }));
}
function ShellBarSearchFieldFullWidth() {
    return (_jsxs("div", { class: "ui5-shellbar-search-full-width-wrapper", children: [_jsx("div", { class: "ui5-shellbar-search-full-field", children: _jsx("slot", { name: "searchField" }) }), _jsx(Button, { class: "ui5-shellbar-cancel-button ui5-shellbar-gap-start", design: ButtonDesign.Transparent, onClick: this.handleCancelButtonClick, children: "Cancel" })] }));
}
export { ShellBarSearchField, ShellBarSearchFieldFullWidth, };
//# sourceMappingURL=ShellBarSearchTemplate.js.map