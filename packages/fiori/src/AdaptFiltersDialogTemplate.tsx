import type AdaptFiltersDialog from "./AdaptFiltersDialog.js";
import type FilterBarItem from "./FilterBarItem.js";

// Components are imported in the main component file for side effects
// Using them as JSX elements will render their tag names
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Select from "@ui5/webcomponents/dist/Select.js";
import Option from "@ui5/webcomponents/dist/Option.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import TabContainer from "@ui5/webcomponents/dist/TabContainer.js";
import Tab from "@ui5/webcomponents/dist/Tab.js";
import Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarSpacer from "@ui5/webcomponents/dist/ToolbarSpacer.js";
import SegmentedButton from "@ui5/webcomponents/dist/SegmentedButton.js";
import SegmentedButtonItem from "@ui5/webcomponents/dist/SegmentedButtonItem.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Bar from "@ui5/webcomponents/dist/Bar.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemCustom from "@ui5/webcomponents/dist/ListItemCustom.js";

export default function AdaptFiltersDialogTemplate(this: Readonly<AdaptFiltersDialog>) {
	return (
		<Dialog
			open={this.open}
			class="ui5-adapt-filters-dialog"
		>
			{/* Header with title and reset button */}
			<Bar slot="header" class="ui5-adapt-filters-header">
				<Title slot="startContent" level="H5">{this._dialogTitle}</Title>
				<Button slot="endContent" design="Transparent" onClick={this._handleReset}>
					{this._resetText}
				</Button>
			</Bar>

			{/* Content */}
			<TabContainer
				class="ui5-adapt-filters-content"
				onTabSelect={this._handleTabSelect}
				collapsed={false}
			>
				{/* List View Tab */}
				<Tab
					text={this._listTabText}
					selected={this.viewMode === "list"}
				>
					{/* Toolbar with Title, Search, and Action Buttons */}
					<Toolbar>
						<Title level="H5">{this._filterValuesVisibilityText}</Title>
						<ToolbarSpacer />
						<Input
							class="ui5-adapt-filters-search-input"
							value={this._searchValue}
							placeholder={this._searchPlaceholder}
							onInput={this._handleSearch}
						>
							<Icon slot="icon" name="search" />
						</Input>
						<SegmentedButton>
							<SegmentedButtonItem onClick={this._handleEdit}>
								{this._editText}
							</SegmentedButtonItem>
							<SegmentedButtonItem onClick={this._handleSort}>
								{this._sortText}
							</SegmentedButtonItem>
						</SegmentedButton>
					</Toolbar>

					{/* Filter Items */}
					<List class="ui5-adapt-filters-list">
						{this._filteredItems.map((item: FilterBarItem) => (
							<ListItemCustom
								class="ui5-adapt-filter-item"
								key={this._getFilterKey(item)}
							>
								{/* Filter Bar Item with label and control */}
								<div class="ui5-adapt-filter-item-content">
									<slot name={this._getListSlotName(item)}></slot>
								</div>

								{/* Actions */}
								<div class="ui5-adapt-filter-actions">
									<Button
										icon={this._isVisible(item) ? "show" : "hide"}
										design="Transparent"
										tooltip={this._visibilityTooltip}
										disabled={this._isVisibilityToggleDisabled(item)}
										onClick={() => this._handleVisibilityToggle(item)}
									/>
									<Button
										icon="decline"
										design="Transparent"
										tooltip={this._reorderTooltip}
									/>
								</div>
							</ListItemCustom>
						))}
					</List>

					{/* Add Filter */}
					{this._availableFiltersToAdd.length > 0 && (
						<div class="ui5-adapt-filters-add-section">
							<Label class="ui5-adapt-filters-add-label">
								{this._addFilterText}
							</Label>
							<Select
								class="ui5-adapt-filters-add-select"
								onChange={this._handleAddFilter}
							>
								<Option value="">Select or Type Name</Option>
								{this._availableFiltersToAdd.map((filter: FilterBarItem) => (
									<Option value={this._getFilterKey(filter)} key={this._getFilterKey(filter)}>
										{this._getFilterText(filter)}
									</Option>
								))}
							</Select>
						</div>
					)}
				</Tab>

				{/* Groups View Tab */}
				<Tab
					text={this._groupsTabText}
					selected={this.viewMode === "groups"}
				>
					{/* Toolbar with Search */}
					<Toolbar>
						<Input
							class="ui5-adapt-filters-search-input-fullwidth"
							value={this._searchValue}
							placeholder={this._searchPlaceholder}
							onInput={this._handleSearch}
						>
							<Icon slot="icon" name="search" />
						</Input>
					</Toolbar>

					{/* Filter Groups */}
					<List class="ui5-adapt-filters-list">
						{Array.from(this._groupedFilters.entries()).map(([groupName, items]) => (
							<>
								{/* Group Header */}
								<ListItemCustom
									class="ui5-adapt-filter-group-header"
									key={`group-${groupName}`}
									onClick={() => this._toggleGroup(groupName)}
								>
									<Icon
										name={
											this._isGroupExpanded(groupName)
												? "navigation-down-arrow"
												: "navigation-right-arrow"
										}
										class="ui5-adapt-filter-group-icon"
									/>
									<span class="ui5-adapt-filter-group-title">
										{groupName}
									</span>
								</ListItemCustom>

								{/* Group Items */}
								{this._isGroupExpanded(groupName) && items.map((item: FilterBarItem) => (
									<ListItemCustom
										class="ui5-adapt-filter-item ui5-adapt-filter-item-grouped"
										key={this._getFilterKey(item)}
									>
										{/* Filter Bar Item with label and control */}
										<div class="ui5-adapt-filter-item-content">
											<slot name={this._getGroupsSlotName(item)}></slot>
										</div>

										{/* Actions */}
										<div class="ui5-adapt-filter-actions">
											<Button
												icon={this._isVisible(item) ? "show" : "hide"}
												design="Transparent"
												tooltip={this._visibilityTooltip}
												disabled={this._isVisibilityToggleDisabled(item)}
												onClick={() => this._handleVisibilityToggle(item)}
											/>
											<Button
												icon="overflow"
												design="Transparent"
												tooltip={this._reorderTooltip}
											/>
										</div>
									</ListItemCustom>
								))}
							</>
						))}
					</List>

					{/* Add Filter */}
					{this._availableFiltersToAdd.length > 0 && (
						<div class="ui5-adapt-filters-add-section">
							<Label class="ui5-adapt-filters-add-label">
								{this._addFilterText}
							</Label>
							<Select
								class="ui5-adapt-filters-add-select"
								onChange={this._handleAddFilter}
							>
								<Option value="">Select or Type Name</Option>
								{this._availableFiltersToAdd.map((filter: FilterBarItem) => (
									<Option value={this._getFilterKey(filter)} key={this._getFilterKey(filter)}>
										{this._getFilterText(filter)}
									</Option>
								))}
							</Select>
						</div>
					)}
				</Tab>
			</TabContainer>

			{/* Footer */}
			<div slot="footer" class="ui5-adapt-filters-footer">
				<Button design="Emphasized" onClick={this._handleOK}>
					{this._okButtonText}
				</Button>
				<Button design="Transparent" onClick={this._handleFilter}>
					{this._filterButtonText}
				</Button>
				<Button design="Transparent" onClick={this._handleCancel}>
					{this._cancelButtonText}
				</Button>
			</div>
		</Dialog>
	);
}
