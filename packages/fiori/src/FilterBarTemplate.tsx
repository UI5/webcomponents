import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents-icons/dist/search.js";
import type FilterBar from "./FilterBar.js";

export default function FilterBarTemplate(this: FilterBar) {
	const spacerCount = Math.max(4, this.items.length - 1);

	return (
		<div class="ui5-filterbar-root">
			<div class="ui5-filterbar-items">
				{
					this.showBasicSearch && <div class="ui5-filterbar-basic-search">
						<Input>
							<Icon name="search" slot="icon" />
						</Input>
					</div>
				}
				{ this.items.map(item => <div class="ui5-filterbar-item">
					<slot name={item._individualSlot}></slot>
				</div>)}
				{ Array.from({ length: spacerCount }).map(() => <div class="ui5-filterbar-spacer"></div>) }
				<div class="ui5-filterbar-buttons">
					{!this.hideGoOnFB && <Button design="Emphasized" onClick={this._handleGoPress}>{this._goButtonText}</Button>}
					{this.showClearOnFB && <Button design="Transparent" onClick={this._handleClearPress}>{this._clearButtonText}</Button>}
					{this.showRestoreOnFB && <Button design="Transparent" onClick={this._handleRestorePress}>{this._restoreButtonText}</Button>}
					{!this.hideFiltersOnFB && <Button design="Transparent" onClick={this._handleFiltersPress}>{this._filtersButtonText}</Button>}
				</div>
			</div>
		</div>
	);
}
