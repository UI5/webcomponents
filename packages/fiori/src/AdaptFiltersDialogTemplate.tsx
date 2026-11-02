import type AdaptFiltersDialog from "./AdaptFiltersDialog.js";
import type FilterBarItem from "./FilterBarItem.js";

import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import ComboBox from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItem from "@ui5/webcomponents/dist/ComboBoxItem.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import TabContainer from "@ui5/webcomponents/dist/TabContainer.js";
import Tab from "@ui5/webcomponents/dist/Tab.js";
import Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarSpacer from "@ui5/webcomponents/dist/ToolbarSpacer.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Bar from "@ui5/webcomponents/dist/Bar.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemCustom from "@ui5/webcomponents/dist/ListItemCustom.js";

export default function AdaptFiltersDialogTemplate(this: Readonly<AdaptFiltersDialog>) {
	const addFilterRow = this._editMode && (
		<div class="ui5-adapt-filters-add-row">
			<Label class="ui5-adapt-filters-add-label">{this._addFilterText}</Label>
			<ComboBox
				class="ui5-adapt-filters-add-combobox"
				placeholder={this._addFilterPlaceholder}
				onSelectionChange={this._handleAddFilter}
			>
				{this._availableFiltersToAdd.map((filter: FilterBarItem) => (
					<ComboBoxItem
						text={this._getFilterText(filter)}
						data-key={this._getFilterKey(filter)}
						key={this._getFilterKey(filter)}
					/>
				))}
			</ComboBox>
		</div>
	);

	const filterItemActions = (item: FilterBarItem) => (
		<div class="ui5-adapt-filter-actions">
			<Button
				icon={this._isVisible(item) ? "show" : "hide"}
				design="Transparent"
				tooltip={this._visibilityTooltip}
				disabled={this._isVisibilityToggleDisabled(item) || this._sortMode}
				onClick={() => this._handleVisibilityToggle(item)}
			/>
			{this._editMode && !this._sortMode && (
				<Button
					icon="decline"
					design="Transparent"
					disabled={this._isRequired(item)}
					onClick={() => this._handleRemove(item)}
				/>
			)}
			{this._sortMode && (
				<Button icon="grid" design="Transparent" class="ui5-adapt-filter-drag-handle" />
			)}
			{!this._editMode && !this._sortMode && (
				<div class="ui5-adapt-filter-action-placeholder" />
			)}
		</div>
	);

	return (
		<Dialog
			open={this.open}
			class="ui5-adapt-filters-dialog"
			onBeforeClose={this._handleDialogBeforeClose}
			onOpen={this._handleDialogOpen}
		>
			<Bar slot="header" class="ui5-adapt-filters-header">
				<Title slot="startContent" level="H5">{this._dialogTitle}</Title>
				<Button slot="endContent" design="Transparent" onClick={this._handleReset}>
					{this._resetText}
				</Button>
			</Bar>

			<TabContainer
				class="ui5-adapt-filters-content"
				onTabSelect={this._handleTabSelect}
				collapsed={false}
			>
				<Tab text={this._listTabText} selected={this.viewMode === "list"}>
					<Toolbar class="ui5-adapt-filters-list-toolbar">
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
						<Button
							design={this._editMode ? "Emphasized" : "Default"}
							onClick={this._handleEdit}
						>
							{this._editText}
						</Button>
						<Button
							design={this._sortMode ? "Emphasized" : "Default"}
							onClick={this._handleSort}
						>
							{this._sortText}
						</Button>
					</Toolbar>

					<div class="ui5-adapt-filters-tab-body">
						<List
							class="ui5-adapt-filters-list"
							data-sorting={this._sortMode ? "true" : undefined}
							onMoveOver={this._handleMoveOver}
							onMove={this._handleMove}
						>
							{this._filteredItems.map((item: FilterBarItem) => (
								<ListItemCustom
									class="ui5-adapt-filter-item"
									key={this._getFilterKey(item)}
									data-key={this._getFilterKey(item)}
									data-active={this._isActive(item) ? "true" : undefined}
									movable={this._sortMode}
								>
									<div class="ui5-adapt-filter-item-content">
										<slot name={this._getListSlotName(item)}></slot>
									</div>
									{filterItemActions(item)}
								</ListItemCustom>
							))}
						</List>

						{/* Add Filter pinned below scrollable list */}
						{addFilterRow}
					</div>
				</Tab>

				<Tab text={this._groupsTabText} selected={this.viewMode === "groups"}>
					<Toolbar class="ui5-adapt-filters-list-toolbar">
						<Input
							class="ui5-adapt-filters-search-input-fullwidth"
							value={this._searchValue}
							placeholder={this._searchPlaceholder}
							onInput={this._handleSearch}
						>
							<Icon slot="icon" name="search" />
						</Input>
					</Toolbar>

					<div class="ui5-adapt-filters-tab-body">
						<List
							class="ui5-adapt-filters-list"
							onMoveOver={this._handleMoveOver}
							onMove={this._handleMove}
						>
							{Array.from(this._groupedFilters.entries()).map(([groupName, items]) => (
								<>
									<ListItemCustom
										class="ui5-adapt-filter-group-header"
										key={`group-${groupName}`}
										onClick={() => this._toggleGroup(groupName)}
										onKeyDown={(e: KeyboardEvent) => this._handleGroupHeaderKeyDown(e, groupName)}
									>
										<Icon
											name={this._isGroupExpanded(groupName) ? "navigation-down-arrow" : "navigation-right-arrow"}
											class="ui5-adapt-filter-group-icon"
										/>
										<span class="ui5-adapt-filter-group-title">{groupName}</span>
									</ListItemCustom>

									{this._isGroupExpanded(groupName) && items.map((item: FilterBarItem) => (
										<ListItemCustom
											class="ui5-adapt-filter-item ui5-adapt-filter-item-grouped"
											key={this._getFilterKey(item)}
											data-key={this._getFilterKey(item)}
											movable={this._sortMode}
										>
											<div class="ui5-adapt-filter-item-content">
												<slot name={this._getGroupsSlotName(item)}></slot>
											</div>
											{filterItemActions(item)}
										</ListItemCustom>
									))}
								</>
							))}
						</List>

						{/* Add Filter pinned below scrollable list */}
						{addFilterRow}
					</div>
				</Tab>
			</TabContainer>

			{/* Footer — rendered inside content to avoid Dialog's border-top on the footer slot wrapper */}
			<div slot="footer" class="ui5-adapt-filters-footer">
				<Button design="Emphasized" onClick={this._handleOK}>
					{this._okButtonText}
				</Button>
				<Button design="Transparent" onClick={this._handleFilter}>
					{this._filterButtonText}
				</Button>
				<Button design="Transparent" onClick={() => this._handleCancel(false)}>
					{this._cancelButtonText}
				</Button>
			</div>
		</Dialog>
	);
}
