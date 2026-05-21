import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "@ui5/webcomponents/dist/Button.js";
import ButtonBadge from "@ui5/webcomponents/dist/ButtonBadge.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import List from "@ui5/webcomponents/dist/List.js";
import ShellBarItem from "./ShellBarItem.js";
import { ShellBarSearchField, ShellBarSearchFieldFullWidth } from "./shellbar/templates/ShellBarSearchTemplate.js";
import { ShellBarSearchField as ShellBarSearchFieldLegacy, ShellBarSearchButton as ShellBarSearchButtonLegacy, ShellBarSearchFieldFullWidth as ShellBarSearchFieldFullWidthLegacy, } from "./shellbar/templates/ShellBarSearchLegacyTemplate.js";
import { ShellBarLegacyBrandingArea, } from "./shellbar/templates/ShellBarLegacyTemplate.js";
export default function ShellBarTemplate() {
    const isLegacySearch = !this.isSelfCollapsibleSearch;
    const SearchInBarTemplate = isLegacySearch ? ShellBarSearchFieldLegacy : ShellBarSearchField;
    const SearchFullWidthTemplate = isLegacySearch ? ShellBarSearchFieldFullWidthLegacy : ShellBarSearchFieldFullWidth;
    const profileAction = this.getAction("profile");
    const overflowAction = this.getAction("overflow");
    const assistantAction = this.getAction("assistant");
    const notificationsAction = this.getAction("notifications");
    const productSwitchAction = this.getAction("products");
    const actionsAccInfo = this.actionsAccessibilityInfo;
    return (_jsxs(_Fragment, { children: [_jsxs("header", { class: "ui5-shellbar-root", part: "root", onKeyDown: this._onKeyDown, "aria-label": this.texts.shellbar, children: [this.showFullWidthSearch && SearchFullWidthTemplate.call(this), this.enabledFeatures.startButton && (_jsx("div", { class: "ui5-shellbar-start-button ui5-shellbar-gap-end", children: _jsx("slot", { name: "startButton" }) })), this.enabledFeatures.branding && (_jsx("div", { class: "ui5-shellbar-branding-area", children: _jsx("slot", { name: "branding" }) })), !this.enabledFeatures.branding && ShellBarLegacyBrandingArea.call(this), _jsx("div", { class: "ui5-shellbar-overflow-container", children: _jsxs("div", { class: "ui5-shellbar-overflow-container-inner", children: [this.enabledFeatures.content && (_jsxs("div", { class: "ui5-shellbar-content-area ui5-shellbar-content-items", role: this.contentRole, "aria-label": this.texts.contentItems, children: [this.separatorConfig.showStartSeparator && (_jsx("div", { class: "ui5-shellbar-separator ui5-shellbar-separator-start" })), this.startContent.map(item => {
                                            const itemId = item._individualSlot;
                                            const packedSep = this.getPackedSeparatorInfo(item, true);
                                            return (_jsxs("div", { id: itemId, class: {
                                                    "ui5-shellbar-content-item ui5-shellbar-gap-start": true,
                                                    "ui5-shellbar-hidden": this.isHidden(itemId),
                                                }, children: [packedSep.shouldPack && (_jsx("div", { class: "ui5-shellbar-separator ui5-shellbar-separator-start" })), _jsx("slot", { name: item._individualSlot })] }, itemId));
                                        }), _jsx("div", { class: "ui5-shellbar-spacer" }), this.endContent.map(item => {
                                            const itemId = item._individualSlot;
                                            const packedSep = this.getPackedSeparatorInfo(item, false);
                                            return (_jsxs("div", { id: itemId, class: {
                                                    "ui5-shellbar-content-item ui5-shellbar-gap-start": true,
                                                    "ui5-shellbar-hidden": this.isHidden(itemId),
                                                }, children: [_jsx("slot", { name: itemId }), packedSep.shouldPack && (_jsx("div", { class: "ui5-shellbar-separator ui5-shellbar-separator-end ui5-shellbar-gap-start" }))] }, itemId));
                                        }), this.separatorConfig.showEndSeparator && (_jsx("div", { class: "ui5-shellbar-separator ui5-shellbar-separator-end ui5-shellbar-gap-start" }))] })), this.enabledFeatures.search && SearchInBarTemplate.call(this), this.enabledFeatures.search && isLegacySearch && ShellBarSearchButtonLegacy.call(this), assistantAction && (_jsx("div", { class: {
                                        "ui5-shellbar-assistant-button ui5-shellbar-gap-start": true,
                                        "ui5-shellbar-hidden": this.isHidden("assistant")
                                    }, children: _jsx("slot", { name: "assistant" }) })), notificationsAction && (_jsx(Button, { "data-ui5-stable": notificationsAction.stableDomRef, class: {
                                        "ui5-shellbar-bell-button ui5-shellbar-action-button ui5-shellbar-gap-start": true,
                                        "ui5-shellbar-hidden": this.isHidden("notifications")
                                    }, icon: notificationsAction.icon, design: "Transparent", onClick: this.handleNotificationsClick, tooltip: actionsAccInfo.notifications.title, accessibilityAttributes: actionsAccInfo.notifications.accessibilityAttributes, children: notificationsAction?.count && (_jsx(ButtonBadge, { slot: "badge", design: "OverlayText", text: notificationsAction?.count })) })), this.sortItems(this.items).map(item => (_jsx("div", { class: {
                                        "ui5-shellbar-custom-item ui5-shellbar-gap-start": true,
                                        "ui5-shellbar-hidden": this.isHidden(item._id),
                                    }, "data-ui5-stable": item.stableDomRef, children: !item.inOverflow ? _jsx("slot", { name: item._individualSlot }) : null }, item._id))), overflowAction && (_jsx(Button, { "data-ui5-stable": overflowAction.stableDomRef, id: "ui5-shellbar-overflow-button", class: {
                                        "ui5-shellbar-overflow-button ui5-shellbar-action-button ui5-shellbar-gap-start": true,
                                        "ui5-shellbar-hidden": this.isHidden("overflow")
                                    }, icon: overflowAction.icon, design: "Transparent", onClick: this.handleOverflowClick, tooltip: actionsAccInfo.overflow.title, accessibilityAttributes: actionsAccInfo.overflow.accessibilityAttributes, children: this.overflowBadge && (_jsx(ButtonBadge, { slot: "badge", design: this.overflowBadge === " " ? "AttentionDot" : "OverlayText", text: this.overflowBadge === " " ? "" : this.overflowBadge })) })), profileAction && (_jsx(Button, { "data-profile-btn": true, "data-ui5-stable": profileAction.stableDomRef, class: {
                                        "ui5-shellbar-image-button ui5-shellbar-action-button ui5-shellbar-gap-start": true,
                                        "ui5-shellbar-hidden": this.isHidden("profile")
                                    }, design: "Transparent", onClick: this.handleProfileClick, tooltip: actionsAccInfo.profile.title, accessibilityAttributes: actionsAccInfo.profile.accessibilityAttributes, children: _jsx("slot", { name: "profile" }) })), productSwitchAction && (_jsx(Button, { "data-ui5-stable": productSwitchAction.stableDomRef, class: {
                                        "ui5-shellbar-button-product-switch ui5-shellbar-action-button ui5-shellbar-gap-start": true,
                                        "ui5-shellbar-hidden": this.isHidden("products")
                                    }, icon: productSwitchAction.icon, design: "Transparent", onClick: this.handleProductSwitchClick, tooltip: actionsAccInfo.products.title, accessibilityAttributes: actionsAccInfo.products.accessibilityAttributes }))] }) })] }), _jsx(Popover, { class: "ui5-shellbar-overflow-popover", open: this.overflowPopoverOpen, onClose: this.onPopoverClose, opener: "ui5-shellbar-overflow-button", placement: "Bottom", hideArrow: true, horizontalAlign: this.popoverHorizontalAlign, children: _jsx(List, { separators: "None", onClick: this.handleOverflowItemClick, children: this.overflowItems.map(item => {
                        if (item.type === "action") {
                            const actionData = item.data;
                            return (_jsx(ShellBarItem, { icon: actionData.icon ? `sap-icon://${actionData.icon}` : "", "data-action-id": item.id, count: actionData.count, inOverflow: true, text: this.getActionOverflowText(item.id) }, item.id));
                        }
                        return _jsx("slot", { name: item.data._individualSlot }, item.id);
                    }) }) })] }));
}
//# sourceMappingURL=ShellBarTemplate.js.map