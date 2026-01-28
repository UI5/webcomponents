import type Search from "./Search.js";
import SearchFieldTemplate from "./SearchFieldTemplate.js";
import SearchPopoverTemplate from "./SearchPopoverTemplate.js";

export default function SearchTemplate(this: Search) {
	return (
		<>
			{ SearchFieldTemplate.call(this) }
			{ SearchPopoverTemplate.call(this) }
		</>
	);
}
