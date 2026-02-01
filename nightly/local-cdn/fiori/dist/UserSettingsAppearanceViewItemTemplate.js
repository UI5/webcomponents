import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import ListItemCustomTemplate from "@ui5/webcomponents/dist/ListItemCustomTemplate.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import AvatarSize from "@ui5/webcomponents/dist/types/AvatarSize.js";
export default function UserSettingsAppearanceViewItemTemplate() {
    return ListItemCustomTemplate.call(this, {
        listItemContent: listItemContent.bind(this),
    });
}
function listItemContent() {
    return (_jsx("div", { class: "list-item", children: _jsxs("div", { class: "item-left", children: [_jsx(Avatar, { class: "avatar-cozy", shape: "Square", icon: this.icon, "color-scheme": this.colorScheme, size: AvatarSize.S }), _jsx(Avatar, { class: "avatar-compact", shape: "Square", icon: this.icon, "color-scheme": this.colorScheme, size: AvatarSize.XS }), _jsx("div", { class: "item-texts", children: _jsx("span", { class: "item-title", children: this.text }) })] }) }));
}
//# sourceMappingURL=UserSettingsAppearanceViewItemTemplate.js.map