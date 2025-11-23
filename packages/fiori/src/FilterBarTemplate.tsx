import type FilterBar from "./FilterBar.js";

export default function FilterBarTemplate(this: FilterBar) {
	return (
		<div class="ui5-filterbar-root">
			<slot></slot>
		</div>
	);
}
