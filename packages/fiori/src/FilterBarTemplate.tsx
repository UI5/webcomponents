import Button from "@ui5/webcomponents/dist/Button.js";
import type FilterBar from "./FilterBar.js";


export default function FilterBarTemplate(this: FilterBar) {
	const spacerCount = Math.max(4, this.items.length - 1);

	return (
		<div class="ui5-filterbar-root">
			<div class="ui5-filterbar-items">
				{ this.items.map(item => <div class="ui5-filterbar-item">
					<slot name={item._individualSlot}></slot>
				</div>)}
				{ Array.from({ length: spacerCount }).map(() => <div class="ui5-filterbar-spacer"></div>) }
				<div className="ui5-filterbar-buttons">
					<Button design="Emphasized">Go</Button>
					<Button design="Transparent">Restore</Button>
					<Button design="Transparent">Adapt Filters</Button>
				</div>
			</div>
		</div>
	);
}
