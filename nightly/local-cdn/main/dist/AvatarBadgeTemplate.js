import { jsx as _jsx, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
export default function AvatarBadgeTemplate() {
    return (_jsx(_Fragment, { children: !this.invalid && (_jsx(Icon, { name: this.icon, class: "ui5-avatar-badge-icon", mode: "Decorative" })) }));
}
//# sourceMappingURL=AvatarBadgeTemplate.js.map