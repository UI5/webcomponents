import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import TabContainer from "@ui5/webcomponents/dist/TabContainer.js";
import Tab from "@ui5/webcomponents/dist/Tab.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents-icons/dist/globe.js";
import "@ui5/webcomponents-icons/dist/nav-back.js";
export default function UserSettingsItemTemplate() {
    const content = this.tabs.length > 0 && !this._hasSelectedPageView ?
        _jsx(TabContainer, { contentBackgroundDesign: "Transparent", class: "ui5-user-settings-item-tabs", onTabSelect: this._handleTabSelect, children: this.tabs.map(view => _jsx(Tab, { text: view.text, selected: view.selected, ref: this.captureRef.bind(view), children: _jsx("slot", { name: view._individualSlot }) })) })
        :
            _jsx(_Fragment, { children: this._selectedPageView ?
                    _jsx("div", { class: "ui5-user-settings-item-view-container", children: _jsx("slot", { name: this._selectedPageView._individualSlot }) })
                    :
                        null });
    const loadingState = _jsx("div", { class: "ui5-user-settings-item-loading-container", children: _jsx(BusyIndicator, { active: this.loading, class: "ui5-user-settings-item-busy", delay: 0, "aria-description": this.loadingReason }) });
    return (_jsxs("div", { class: "ui5-user-settings-item", children: [_jsx("header", { class: "ui5-user-settings-item-header-container", children: _jsxs("div", { class: "ui5-user-settings-item-header", children: [_jsx(Button, { icon: "nav-back", design: "Transparent", onClick: this._handleBackButtonClick, class: "ui5-user-settings-item-collapse-btn", style: { display: this._shouldShowBackButton ? "block" : "" } }), _jsx(Title, { level: "H2", size: "H4", children: this._hasSelectedPageView ? this._selectedPageView.text : this.headerText })] }) }), this.loading ? loadingState : content] }));
}
//# sourceMappingURL=UserSettingsItemTemplate.js.map