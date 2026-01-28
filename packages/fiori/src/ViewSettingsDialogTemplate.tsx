import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import SegmentedButton from "@ui5/webcomponents/dist/SegmentedButton.js";
import SegmentedButtonItem from "@ui5/webcomponents/dist/SegmentedButtonItem.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemGroup from "@ui5/webcomponents/dist/ListItemGroup.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import navBackIcon from "@ui5/webcomponents-icons/dist/nav-back.js";
import sortIcon from "@ui5/webcomponents-icons/dist/sort.js";
import filterIcon from "@ui5/webcomponents-icons/dist/filter.js";
import groupIcon from "@ui5/webcomponents-icons/dist/group-2.js";

import type ViewSettingsDialog from "./ViewSettingsDialog.js";

function ViewSettingsDialogTemplateHeader(this: ViewSettingsDialog) {
	return (
		<div slot="header" class="ui5-vsd-header">
			<div class="ui5-vsd-header-container" part="header">
				<div class="ui5-vsd-header-start">
					{this.showBackButton && (
						<Button
							design="Transparent"
							icon={navBackIcon}
							class="ui5-vsd-back-button"
							onClick={this._navigateToFilters}
						/>
					)}
					<Title
						wrappingType="None"
						level="H1"
						class="ui5-vsd-title"
						id={`${this._id}-label`}
					>{this._title}</Title>
				</div>
				<div class="ui5-vsd-header-end">
					<Button
						design="Transparent"
						onClick={this._resetSettings}
						disabled={this._disableResetButton}
					>{this._resetButtonLabel}</Button>
				</div>
			</div>
			{!this.showBackButton && this.hasPagination && (
				<div class="ui5-vsd-sub-header-container">
					<div class="ui5-vsd-sub-header">
						<SegmentedButton
							onSelectionChange={this._handleModeChange}
						>
							{_getSplitButtonItems.call(this)}
						</SegmentedButton>
					</div>
				</div>
			)}
		</div>
	);
}

function _getSplitButtonItems(this: ViewSettingsDialog) {
	const buttonItems = [];

	if (this.shouldBuildSort) {
		buttonItems.push(
			<SegmentedButtonItem
				selected={this.isModeSort}
				icon={sortIcon}
				data-mode="Sort"
				tooltip={this._sortButtonTooltip}
			/>
		);
	}

	if (this.shouldBuildFilter) {
		buttonItems.push(
			<SegmentedButtonItem
				selected={this.isModeFilter}
				icon={filterIcon}
				data-mode="Filter"
				tooltip={this._filterButtonTooltip}
			/>
		);
	}

	if (this.shouldBuildGroup) {
		buttonItems.push(
			<SegmentedButtonItem
				selected={this.isModeGroup}
				icon={groupIcon}
				data-mode="Group"
				tooltip={this._groupButtonTooltip}
			/>
		);
	}

	return buttonItems;
}

function ViewSettingsDialogTemplateContent(this: ViewSettingsDialog) {
	return (
		<div
			class={{
				"ui5-vsd-content": true,
				"ui5-vsd-content-expand": this.expandContent,
			}}
		>
			{this.shouldBuildSort && this.isModeSort && (
				ViewSettingsDialogSortAndGroupTemplate.call(this, true)
			)}

			{this.shouldBuildFilter && this.isModeFilter && (
				ViewSettingsDialogFilterTemplate.call(this)
			)}

			{this.shouldBuildGroup && this.isModeGroup && (
				ViewSettingsDialogSortAndGroupTemplate.call(this, false)
			)}

		</div>
	);
}

function ViewSettingsDialogSortAndGroupTemplate(this: ViewSettingsDialog, isSortTemplate: boolean) {
	const currentSettingsOrder = isSortTemplate ? this._currentSettings.sortOrder : this._currentSettings.groupOrder;
	const currentSettingsBy = isSortTemplate ? this._currentSettings.sortBy : this._currentSettings.groupBy;

	return (
		<div class={isSortTemplate ? "ui5-vsd-sort" : "ui5-vsd-group"}>
			<List
				selectionMode="SingleStart"
				onSelectionChange={isSortTemplate ? this._onSortOrderChange : this._onGroupOrderChange} // radio button - use selectionChange
				{...(isSortTemplate ? { "sort-order": "" } : { "group-order": "" })}
				accessibleNameRef={`${this._id}-label`}
			>
				<ListItemGroup headerText={isSortTemplate ? this._sortOrderLabel : this._groupOrderLabel}>
					{currentSettingsOrder.map(item => (
						<ListItemStandard
							selected={item.selected}
						>{item.text}</ListItemStandard>
					))}
				</ListItemGroup>
			</List>
			<List
				selectionMode="SingleStart"
				onSelectionChange={isSortTemplate ? this._onSortByChange : this._onGroupByChange} // radio button - use selectionChange
				{...(isSortTemplate ? { "sort-by": "" } : { "group-by": "" })}
			>
				<ListItemGroup headerText={ isSortTemplate ? this._sortByLabel : this._groupByLabel}>
					{currentSettingsBy.map((item, index) => (
						<ListItemStandard
							data-ui5-external-action-item-index={index}
							selected={item.selected}
						>{item.text}</ListItemStandard>
					))}
				</ListItemGroup>
			</List>
		</div>
	);
}

function ViewSettingsDialogFilterTemplate(this: ViewSettingsDialog) {
	return (
		<>
			{this._filterStepTwo ? (
				<List
					selectionMode="Multiple"
					onSelectionChange={this._handleFilterValueItemClick} // checkboxes to select/deselect - use selectionChange
					accessibleNameRef={`${this._id}-label`}
				>
					{this._currentSettings.filters.filter(item => item.selected).map(item => (<>
						{item.filterOptions.map(option => (
							<ListItemStandard
								selected={option.selected}
							>{option.text}</ListItemStandard>
						))}
					</>))}
				</List>
			) : ( // else
				<List
					onItemClick={this._changeCurrentFilter} // list item to drill down into the second-level menu - use click
					accessibleNameRef={`${this._id}-label`}
				>
					<ListItemGroup headerText={this._filterByLabel}>
						{this.filterItems.map(item => (
							<ListItemStandard
								class="ui5-vsd-filterItemList"
								// selected={item.selected} TODO
								additionalText={item.additionalText}
								accessibleName={this._selectedFiltersLabel(item)}
							>{item.text}</ListItemStandard>
						))}
					</ListItemGroup>
				</List>
			)}
		</>
	);
}

function ViewSettingsDialogTemplateFooter(this: ViewSettingsDialog) {
	return (
		<div slot="footer" class="ui5-vsd-footer">
			<Button
				design="Emphasized"
				onClick={this._confirmSettings}
			>{this._okButtonLabel}</Button>
			<Button
				design="Transparent"
				onClick={this._cancelSettings}
			>{this._cancelButtonLabel}</Button>
		</div>
	);
}

export default function ViewSettingsDialogTemplate(this: ViewSettingsDialog) {
	return (
		<Dialog
			preventInitialFocus={true}
			accessibleName={this._dialogTitle}
			onBeforeClose={this._restoreConfirmedOnEscape}
			stretch={this._isPhone}
			open={this.open}
			onBeforeOpen={this.beforeDialogOpen}
			onOpen={this.afterDialogOpen}
			onClose={this.afterDialogClose}
		>
			{ViewSettingsDialogTemplateHeader.call(this)}
			{ViewSettingsDialogTemplateContent.call(this)}
			{ViewSettingsDialogTemplateFooter.call(this)}
		</Dialog>
	);
}
