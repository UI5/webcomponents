import type UserSettingsDialog from "./UserSettingsDialog.js";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Text from "@ui5/webcomponents/dist/Text.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import ToolbarButton from "@ui5/webcomponents/dist/ToolbarButton.js";
import Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import search from "@ui5/webcomponents-icons/dist/search.js";
import type UserSettingsItem from "./UserSettingsItem.js";

export default function UserSettingsDialogTemplate(this: UserSettingsDialog) {
	return (

		<Dialog class="ui5-user-settings-dialog"
			open={this.open}
			stretch
			accessibleName={this.accessibleNameText}
			onui5-_collapse={this._handleCollapseClick}
			onOpen={this._handleDialogAfterOpen}
			onBeforeClose={this._handleDialogBeforeClose}
			onClose={this._handleDialogAfterClose}
			initialFocus={`setting-${this._selectedSetting?._id}`}
		>
			<div class="ui5-user-settings-root">
				<div class="ui5-user-settings-side" aria-orientation="vertical" aria-roledescription={this.ariaRoleDescList}>
					<div class="ui5-user-settings-side-header">
						{this.headerText &&
							<Title level="H1" size="H4">{this.headerText}</Title>
						}
						{this.showSearchField &&
							<Input placeholder="Search" type="Search" class="ui5-user-settings-side-search"
								   onInput={this._handleInput}>
								<Icon id="searchFieldIcon" slot="icon" name={search} showTooltip></Icon>
							</Input>
						}
					</div>
					{this._showNoSearchResult ?
						<div class="ui5-user-settings-side-search">
							<Text>{this.noSearchResultsText}</Text>
						</div>
						:
						renderList.call(this, this._filteredItems, "ui5-user-settings-side-items")}

					{this._filteredFixedItems.length > 0 && renderList.call(this, this._filteredFixedItems, "ui5-user-settings-side-fixedItems")}
				</div>

				<div class="ui5-user-settings-content">
					<slot name={this._selectedItemSlotName}></slot>
				</div>
			</div>

			<Toolbar slot="footer" design="Transparent">
				<ToolbarButton design="Transparent" text={this.closeButtonText} tooltip={this.closeButtonText} onClick={this._handleCloseButtonClick} />
			</Toolbar>
		</Dialog>
	);
}

function renderList(this: UserSettingsDialog, items: Array<UserSettingsItem> = [], classes: string) {
	return <List accessibleRole="Menu" onItemClick={this._handleItemClick} class={classes} separators="None">
		{items.map(item => (
			<ListItemStandard
				class={!item._icon && item._siblingsWithIcon ? "ui5-user-settings-item-no-icon" : ""}
				id={`setting-${item._id}`}
				icon={!item._icon && item._siblingsWithIcon ? undefined : item._icon}
				tooltip={item._tooltip}
				ref={this.captureRef.bind(item)}
				selected={item.selected}
				disabled={item.disabled}
				accessibleName={item.ariaLabelledByText}
				type={this._showSettingWithNavigation ? "Navigation" : "Active"}
			>
				{item.text}
			</ListItemStandard>
		))}
	</List>;
}
