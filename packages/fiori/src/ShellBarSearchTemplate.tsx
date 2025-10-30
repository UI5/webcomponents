import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import SearchFieldTemplate from "./SearchFieldTemplate.js";
import type ShellBarSearch from "./ShellBarSearch.js";
import ShellBarSearchPopoverTemplate from "./ShellBarSearchPopoverTemplate.js";

export default function ShellBarSearchTemplate(this: ShellBarSearch) {
	return (
		<>
			<BusyIndicator
				size={this.busyStateConfig.size}
				active={this.busyStateConfig.active}
				style={{
					width: this.collapsed ? "" : "100%",
				}}
			>
				{ SearchFieldTemplate.call(this) }
			</BusyIndicator>
			{ ShellBarSearchPopoverTemplate.call(this) }
		</>
	);
}
