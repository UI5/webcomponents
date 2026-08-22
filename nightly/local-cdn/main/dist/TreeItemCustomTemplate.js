import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import TreeItemBaseTemplate from "./TreeItemBaseTemplate.js";
const predefinedHooks = {
    listItemContent,
};
export default function TreeItemCustomTemplate(hooks) {
    const currentHooks = { ...predefinedHooks, ...hooks };
    return TreeItemBaseTemplate.call(this, currentHooks);
}
function listItemContent() {
    return (_jsx("div", { class: "ui5-li-tree-text-wrapper", children: _jsx("slot", { name: "content", slot: "content" }) }));
}
//# sourceMappingURL=TreeItemCustomTemplate.js.map