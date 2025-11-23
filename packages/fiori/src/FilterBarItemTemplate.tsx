import type FilterBarItem from "./FilterBarItem.js";

export default function FilterBarItemTemplate(this: FilterBarItem) {
	return (
		<div class="ui5-filterbar-item-root">
			<div class="ui5-filterbar-item-label">
				<slot name="label"></slot>
			</div>
			<div class="ui5-filterbar-item-control">
				<slot></slot>
			</div>
		</div>
	);
}
