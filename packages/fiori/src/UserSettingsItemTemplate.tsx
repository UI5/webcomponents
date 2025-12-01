import type UserSettingsItem from "./UserSettingsItem.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import TabContainer from "@ui5/webcomponents/dist/TabContainer.js";
import Tab from "@ui5/webcomponents/dist/Tab.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents-icons/dist/globe.js";
import "@ui5/webcomponents-icons/dist/nav-back.js";

export default function UserSettingsItemTemplate(this: UserSettingsItem) {
	const content = this.tabs.length > 0 && !this._hasSelectedPageView ?
		<TabContainer contentBackgroundDesign="Transparent" class="ui5-user-settings-item-tabs" onTabSelect={this._handleTabSelect}>
			{this.tabs.map(view =>
				<Tab text={view.text} selected={view.selected} ref={this.captureRef.bind(view)}>
					<slot name={view._individualSlot} />
				</Tab>
			)}
		</TabContainer>
		:
		<>
			{this._selectedPageView ?
				<div class="ui5-user-settings-item-view-container">
					<slot name={this._selectedPageView._individualSlot} />
				</div>
				:
				null
			}
		</>;

	const loadingState = <div class="ui5-user-settings-item-loading-container">
		<BusyIndicator
			active={this.loading}
			class="ui5-user-settings-item-busy"
			delay={0}
			aria-description={this.loadingReason}>
		</BusyIndicator>
	</div>;

	return (
		<div class="ui5-user-settings-item">
			<header class="ui5-user-settings-item-header-container">
				<div class="ui5-user-settings-item-header">
					<Button icon="nav-back" design="Transparent" onClick={this._handleBackButtonClick} class="ui5-user-settings-item-collapse-btn" style={{ display: this._shouldShowBackButton ? "block" : "" }}></Button>

					<Title level="H2" size="H4">{this._hasSelectedPageView ? this._selectedPageView.text : this.headerText}</Title>
				</div>
			</header>

			{this.loading ? loadingState : content}
		</div>
	);
}
