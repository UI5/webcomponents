import SearchFieldTemplate from "./SearchFieldTemplate.js";
import type ShellBarSearch from "./ShellBarSearch.js";
import ShellBarSearchPopoverTemplate from "./ShellBarSearchPopoverTemplate.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";

export default function ShellBarSearchTemplate(this: ShellBarSearch) {
	return (
		<>
			<BusyIndicator active={this.busy} delay={0} style="width: 100%;">
				{ SearchFieldTemplate.call(this) }
			</BusyIndicator>
			{ ShellBarSearchPopoverTemplate.call(this) }
		</>
	);
}
