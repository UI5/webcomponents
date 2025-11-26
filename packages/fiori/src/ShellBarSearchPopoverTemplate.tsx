import Button from "@ui5/webcomponents/dist/Button.js";
import type ShellBarSearch from "./ShellBarSearch.js";
import SearchPopoverTemplate from "./SearchPopoverTemplate.js";
import SearchFieldTemplate from "./SearchFieldTemplate.js";

export default function ShellBarSearchPopoverTemplate(this: ShellBarSearch) {
	return (
		SearchPopoverTemplate.call(this, ShellBarSearchDialogHeader)
	);
}

function ShellBarSearchDialogHeader(this: ShellBarSearch) {
	return (<>
		<header slot="header" class="ui5-search-popup-searching-header">

			<div class="ui5-shellbar-search-field-wrapper">
				{ SearchFieldTemplate.call(this, { forceExpanded: true }) }
			</div>

			<Button design={"Transparent"} onClick={this._handleCancel}>{this.cancelButtonText}</Button>
		</header>
	</>);
}
