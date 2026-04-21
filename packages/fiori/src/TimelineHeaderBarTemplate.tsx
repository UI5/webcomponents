import Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButton from "@ui5/webcomponents/dist/ToolbarButton.js";
import ToolbarSpacer from "@ui5/webcomponents/dist/ToolbarSpacer.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import Bar from "@ui5/webcomponents/dist/Bar.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import type TimelineHeaderBar from "./TimelineHeaderBar.js";
import searchIcon from "@ui5/webcomponents-icons/dist/search.js";
import sortDescending from "@ui5/webcomponents-icons/dist/sort-descending.js";
import addFilter from "@ui5/webcomponents-icons/dist/add-filter.js";

export default function TimelineHeaderBarTemplate(this: TimelineHeaderBar) {
	return (<>
		<Toolbar
			class="ui5-timeline-header-bar-toolbar"
			accessibleName={this._headerBarAccessibleName}
		>
			{/* Spacer pushes all controls to the end */}
			<ToolbarSpacer />

			{/* Search Input */}
			{this.showSearch && (
				<Input
					class="ui5-timeline-header-bar-search"
					placeholder={this._searchPlaceholder}
					value={this.searchValue}
					showClearIcon={true}
					accessibleName={this._searchAccessibleName}
					onInput={this._onSearchInput}
				>
					<Icon slot="icon" name={searchIcon} />
				</Input>
			)}

			{/* Sort Button */}
			{this.showSort && (
				<ToolbarButton
					icon={sortDescending}
					design="Transparent"
					tooltip={this._sortTooltip}
					accessibleName={this._sortAccessibleName}
					onClick={this._onSortClick}
				/>
			)}

			{/* Filter Button */}
			{this.showFilter && (
				<ToolbarButton
					icon={addFilter}
					design="Transparent"
					tooltip={this._filterAccessibleName}
					accessibleName={this._filterAccessibleName}
					onClick={this._onFilterClick}
				/>
			)}
		</Toolbar>

		{this._hasFilterInfoBar && (
			<div class="ui5-timeline-filter-info-bar">
				<slot name="filterInfoBar"></slot>
			</div>
		)}

		{/* Filter Dialog */}
		{this.showFilter && (
			<Dialog
				class="ui5-timeline-filter-dialog"
				headerText={this._filterDialogTitle}
				open={this._filterDialogOpen}
				onClose={this._onFilterDialogClose}
			>
				<List
					selectionMode="Multiple"
					class="ui5-timeline-filter-list"
				>
					{this.filterOptions.map(option => (
						<ListItemStandard
							key={option.text}
							selected={option.selected}
							data-filter-text={option.text}
						>
							{option.text}
						</ListItemStandard>
					))}
				</List>

				<Bar slot="footer" design="Footer">
					<Button
						slot="endContent"
						design="Emphasized"
						onClick={this._onFilterDialogConfirm}
					>
						{this._filterDialogOkText}
					</Button>
					<Button
						slot="endContent"
						design="Transparent"
						onClick={this._onFilterDialogCancel}
					>
						{this._filterDialogCancelText}
					</Button>
				</Bar>
			</Dialog>
		)}
	</>);
}
