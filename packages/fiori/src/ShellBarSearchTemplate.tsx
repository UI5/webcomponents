import SearchFieldTemplate from "./SearchFieldTemplate.js";
import type ShellBarSearch from "./ShellBarSearch.js";
import ShellBarSearchPopoverTemplate from "./ShellBarSearchPopoverTemplate.js";

export default function ShellBarSearchTemplate(this: ShellBarSearch) {
	return (
		<>
			{ SearchFieldTemplate.call(this) }
			{ ShellBarSearchPopoverTemplate.call(this) }
		</>
	);
}
