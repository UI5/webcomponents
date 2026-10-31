import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import NotificationListInternal from "./NotificationListInternal.js";
export default function NotificationListTemplate() {
    return (_jsx(NotificationListInternal, { accessibleName: this._accessibleName, noDataText: this.noDataText, onItemClick: this._onItemClick, onItemClose: this._onItemClose, onItemToggle: this._onItemToggle, onLoadMore: this._onLoadMore, children: _jsx("slot", {}) }));
}
//# sourceMappingURL=NotificationListTemplate.js.map