import Button from "@ui5/webcomponents/dist/Button.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import type ShellBarV2 from "../../ShellBarV2.js";

function ShellBarV2SearchField(this: ShellBarV2) {
	return (
		// .ui5-shellbar-search-field-area is used to measure the width of
		// the search field. It must be present even if the search is in full-width mode.
		<div class="ui5-shellbar-search-field-area ui5-shellbar-gap-start ui5-shellbar-search-toggle">
			{!this.showFullWidthSearch && (
				<slot name="searchField"></slot>
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
				design={ButtonDesign.Transparent}
				onClick={this.handleCancelButtonClick}
			>
				Cancel
			</Button>
		</div>
	);
}

export {
	ShellBarV2SearchField,
	ShellBarV2SearchFieldFullWidth,
};
