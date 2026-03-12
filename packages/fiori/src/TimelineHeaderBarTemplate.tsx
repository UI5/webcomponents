import Input from "@ui5/webcomponents/dist/Input.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Select from "@ui5/webcomponents/dist/Select.js";
import Option from "@ui5/webcomponents/dist/Option.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import type TimelineHeaderBar from "./TimelineHeaderBar.js";
import search from "@ui5/webcomponents-icons/dist/search.js";

export default function TimelineHeaderBarTemplate(this: TimelineHeaderBar) {
	return (
		<div
			class="ui5-timeline-header-bar"
			role="toolbar"
			aria-label={this._headerBarAccessibleName}
		>
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
					<Icon slot="icon" name={search} />
				</Input>
			)}

			{/* Spacer */}
			<div class="ui5-timeline-header-bar-spacer"></div>

			{/* Filter Dropdown */}
			{this.showFilter && this.filterOptions.length > 0 && (
				<div class="ui5-timeline-header-bar-filter">
					<Select
						class="ui5-timeline-header-bar-filter-select"
						accessibleName={this._filterAccessibleName}
						onChange={this._onFilterChange}
					>
						{this.filterOptions.map(option => (
							<Option
								key={option.text}
								selected={option.selected}
							>
								{option.text}
							</Option>
						))}
					</Select>
				</div>
			)}

			{/* Sort Button */}
			{this.showSort && (
				<Button
					class="ui5-timeline-header-bar-sort"
					icon={this._sortIcon}
					design="Transparent"
					tooltip={this._sortTooltip}
					accessibleName={this._sortAccessibleName}
					onClick={this._onSortClick}
				/>
			)}
		</div>
	);
}
