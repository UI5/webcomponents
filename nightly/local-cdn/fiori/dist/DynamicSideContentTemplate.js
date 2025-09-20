import { Fragment as _Fragment, jsxs as _jsxs, jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
export default function DynamicSideContentTemplate() {
    return (_jsx("div", { class: this.classes.root, style: this.styles.root, children: this._isSideContentFirst ?
            _jsxs(_Fragment, { children: [sideContent.call(this), mainContent.call(this)] })
            :
                _jsxs(_Fragment, { children: [mainContent.call(this), sideContent.call(this)] }) }));
}
function mainContent() {
    return (_jsx("div", { role: "main", "aria-label": this.accInfo.mainContent?.ariaLabel, class: this.classes.main, style: this.styles.main, children: _jsx("slot", {}) }));
}
function sideContent() {
    return (_jsx("aside", { role: "complementary", "aria-label": this.accInfo.sideContent?.ariaLabel, class: this.classes.side, style: this.styles.side, children: _jsx("slot", { name: "sideContent" }) }));
}
//# sourceMappingURL=DynamicSideContentTemplate.js.map