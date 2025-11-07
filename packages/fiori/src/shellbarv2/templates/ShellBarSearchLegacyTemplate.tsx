import Button from "@ui5/webcomponents/dist/Button.js";
import type ShellBarV2 from "../../ShellBarV2.js";

function ShellBarV2SearchField(this: ShellBarV2) {
	return (
		// .ui5-shellbar-search-field-area is used to measure the width of
		// the search field. It must be present even if the search is in full-width mode.
		<div class="ui5-shellbar-search-field-area ui5-shellbar-gap-start">
			{this.showSearchField && !this.showFullWidthSearch && (
				<div class="ui5-shellbar-search-field">
					<slot name="searchField"></slot>
				</div>
			)}
		</div>
	);
}

function ShellBarV2SearchFieldFullWidth(this: ShellBarV2) {
	return (
		<div class="ui5-shellbar-search-full-width-wrapper">
			<div class="ui5-shellbar-search-full-field">
				<slot name="searchField"></slot>
			</div>
			<Button
				class="ui5-shellbar-cancel-button ui5-shellbar-gap-start"
				onClick={this.handleCancelButtonClick}
			>
				Cancel
			</Button>
		</div>
	);
}

function ShellBarV2SearchButton(this: ShellBarV2) {
	return (
		<>
			{!this.hideSearchButton && (
				<Button
					data-ui5-stable="toggle-search"
					class="ui5-shellbar-search-button ui5-shellbar-action-button ui5-shellbar-gap-start ui5-shellbar-search-toggle"
					icon="sap-icon://search"
					design="Transparent"
					onClick={this.handleSearchButtonClick}
					tooltip={this.getActionText("search")}
					aria-label={this.getActionText("search")}
					aria-expanded={this.showSearchField}
					accessibilityAttributes={this.accInfo.search.accessibilityAttributes}
				/>
			)}
		</>

	);
}

export {
	ShellBarV2SearchField,
	ShellBarV2SearchButton,
	ShellBarV2SearchFieldFullWidth,
};
