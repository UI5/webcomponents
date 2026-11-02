import Label from "@ui5/webcomponents/dist/Label.js";
import type FilterBarItem from "./FilterBarItem.js";

export default function FilterBarItemTemplate(this: FilterBarItem) {
	return (
		<div class="ui5-filterbar-item-root" part="root">
			<Label
				class="ui5-filterbar-item-label"
				part="label"
				showColon={!!this.label}
				required={this.required}
				title={this._effectiveLabelTooltip}
			>
				{this.label}
			</Label>
			<div class="ui5-filterbar-item-control" part="control">
				<slot></slot>
			</div>
		</div>
	);
}
