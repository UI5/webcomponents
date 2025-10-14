import SearchFieldTemplate from "./SearchFieldTemplate.js";
import type ShellBarSearch from "./ShellBarSearch.js";
import ShellBarSearchPopoverTemplate from "./ShellBarSearchPopoverTemplate.js";

export default function ShellBarSearchTemplate(this: ShellBarSearch) {
	return (
		<>
			<div class="ui5-shellbar-search-busy-wrapper">
				{ SearchFieldTemplate.call(this) }
				<slot name="busyIndicator"></slot>
			</div>
			{ ShellBarSearchPopoverTemplate.call(this) }
		</>
	);
}
