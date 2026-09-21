import Icon from "@ui5/webcomponents/dist/Icon.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import search from "@ui5/webcomponents-icons/dist/search.js";
import type SideNavigationSearchField from "./SideNavigationSearchField.js";

export default function SideNavigationSearchFieldTemplate(this: SideNavigationSearchField) {
	return (
		<div class="ui5-side-navigation-search-field-root" role="search">
			<input
				id={`${this._id}-inner`}
				class="ui5-side-navigation-search-field-inner-input"
				type="search"
				aria-label={this._ariaLabelText}
				aria-description={this._ariaDescriptionText}
				aria-controls={this.ariaControls}
				value={this.value}
				placeholder={this._effectivePlaceholder}
				data-sap-focus-ref
				onInput={this._handleInput}
				onKeyDown={this._onkeydown} />

			{this._effectiveShowClearIcon &&
				<Icon
					class="ui5-side-navigation-search-field-icon ui5-side-navigation-search-field-clear-icon"
					name={decline}
					showTooltip={true}
					accessibleName={this._translations.clearIcon}
					onClick={this._handleClear}
				></Icon>
			}

			<Icon
				class="ui5-side-navigation-search-field-icon ui5-side-navigation-search-field-search-icon"
				name={search}
				showTooltip={true}
				accessibleName={this._translations.searchIcon}
				onClick={this._handleSearchIconPress}
			></Icon>
		</div>
	);
}
