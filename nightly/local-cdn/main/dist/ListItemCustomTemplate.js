import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import ListItemTemplate from "./ListItemTemplate.js";
const predefinedHooks = {
    listItemContent,
};
export default function ListItemCustomTemplate(hooks) {
    const currentHooks = { ...predefinedHooks, ...hooks };
    return ListItemTemplate.call(this, currentHooks);
}
function listItemContent() {
    return _jsx("slot", {});
}
//# sourceMappingURL=ListItemCustomTemplate.js.map