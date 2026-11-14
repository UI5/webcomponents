import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Title from "@ui5/webcomponents/dist/Title.js";
import TitleLevel from "@ui5/webcomponents/dist/types/TitleLevel.js";
import Text from "@ui5/webcomponents/dist/Text.js";
export default function SearchMessageAreaTemplate() {
    return (_jsx(_Fragment, { children: _jsxs("div", { class: "ui5-search-message-area-wrapper", children: [_jsx(Title, { size: TitleLevel.H6, children: this.text }), _jsx(Text, { class: "ui5-search-message-area-description", children: this.description })] }) }));
}
//# sourceMappingURL=SearchMessageAreaTemplate.js.map