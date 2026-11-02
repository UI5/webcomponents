import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents-icons/dist/search.js";
import type FilterBar from "./FilterBar.js";

export default function FilterBarTemplate(this: FilterBar) {
	return (
		<div
			class="ui5-filterbar-root"
			role="search"
			aria-label={this._filtersButtonText}
			style={{ "--_ui5-filterbar-item-width": this.filterContainerWidth }}
		>
			{this.header.length > 0 && <div class="ui5-filterbar-header">
				<slot name="header"></slot>
			</div>}
			<div class="ui5-filterbar-items">
				{
					this.search.length > 0
						? <div class="ui5-filterbar-basic-search">
							<slot name="search"></slot>
						</div>
						: this.showBasicSearch && <div class="ui5-filterbar-basic-search">
							<Input placeholder={this._searchPlaceholder} onInput={this._handleSearch}>
								<Icon name="search" slot="icon" />
							</Input>
						</div>
				}
				{ this.items.filter(item => !item.hidden && !item.hiddenInFilterBar).map(item => <div class="ui5-filterbar-item">
					<slot name={item._individualSlot}></slot>
				</div>)}
				{!this.hideToolbar && <div class="ui5-filterbar-buttons">
					{this.showGoOnFB && <Button design="Emphasized" onClick={this._handleGoPress}>{this._goButtonText}</Button>}
					{this.showClearOnFB && <Button design="Transparent" onClick={this._handleClearPress}>{this._clearButtonText}</Button>}
					{this.showRestoreOnFB && <Button design="Transparent" onClick={this._handleRestorePress}>{this._restoreButtonText}</Button>}
					{this.showResetButton && <Button design="Transparent" onClick={this._handleResetPress}>{this._resetButtonText}</Button>}
					{!this.hideFilterConfiguration && !this.hideToggleFiltersButton && <Button design="Transparent" onClick={this._handleToggleFilters}>{this._filtersButtonText}{this._activeFilterCount > 0 ? ` (${this._activeFilterCount})` : ""}</Button>}
				</div>}
			</div>
		</div>
	);
}
