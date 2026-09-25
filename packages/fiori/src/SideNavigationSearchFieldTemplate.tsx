import Input from "@ui5/webcomponents/dist/Input.js";
import InputIcon from "@ui5/webcomponents/dist/InputIcon.js";
import search from "@ui5/webcomponents-icons/dist/search.js";
import type SideNavigationSearchField from "./SideNavigationSearchField.js";

export default function SideNavigationSearchFieldTemplate(this: SideNavigationSearchField) {
	return (
		<div class="ui5-side-navigation-search-field-root">
			<Input
				id={`${this._id}-inner`}
				class="ui5-side-navigation-search-field-input"
				value={this.value}
				type="Search"
				placeholder={this._effectivePlaceholder}
				showClearIcon={!this.hideClearIcon}
				noTypeahead={true}
				_inputAccInfo={this._inputAccInfo}
				data-sap-focus-ref
				onInput={this._handleInput}
				onKeyDown={this._onkeydown}>
				<InputIcon
					slot="icon"
					class="ui5-side-navigation-search-field-search-icon"
					name={search}
					accessibleName={this._translations.searchIcon}
					hideTooltip={true}
					onClick={this._handleSearchIconPress}
				/>
			</Input>
		</div>
	);
}
