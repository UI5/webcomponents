import Button from "@ui5/webcomponents/dist/Button.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import type ShellBar from "../../ShellBar.js";

function ShellBarSearchField(this: ShellBar) {
	return (
		// .ui5-shellbar-search-field-area is used to measure the width of
		// the search field. It must be present even if the search is in full-width mode.
		// The `ui5-shellbar-gap-start` lives on the area (always rendered) rather than on the
		// inner field (rendered only in-bar), so the measured width stays identical whether the
		// search is in the bar or in full-width mode - otherwise the 8px gap would be counted
		// only in-bar, shifting the overflow measurement and causing a render loop.
		<div class="ui5-shellbar-search-field-area ui5-shellbar-gap-start">
			{this.showSearchField && !this.showFullWidthSearch && (
				<div class="ui5-shellbar-search-field">
					<slot name="searchField"></slot>
				</div>
			)}
		</div>
	);
}

function ShellBarSearchFieldFullWidth(this: ShellBar) {
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

function ShellBarSearchButton(this: ShellBar) {
	const searchAction = this.getAction("search");
	return (
		<>
			{!this.hideSearchButton && (
				<Button
					data-ui5-stable={searchAction?.stableDomRef}
					class="ui5-shellbar-search-button ui5-shellbar-action-button ui5-shellbar-gap-start ui5-shellbar-search-toggle"
					icon={searchAction?.icon}
					design="Transparent"
					onClick={this.handleSearchButtonClick}
					tooltip={this.actionsAccessibilityInfo.search.title}
					accessibilityAttributes={this.actionsAccessibilityInfo.search.accessibilityAttributes}
				/>
			)}
		</>

	);
}

export {
	ShellBarSearchField,
	ShellBarSearchButton,
	ShellBarSearchFieldFullWidth,
};
