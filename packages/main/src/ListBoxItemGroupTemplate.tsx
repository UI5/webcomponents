import type ListItemGroup from "./ListItemGroup.js";
import ListItemGroupHeader from "./ListItemGroupHeader.js";
import DropIndicator from "./DropIndicator.js";
import ListItemAccessibleRole from "./types/ListItemAccessibleRole.js";

export default function ListItemGroupTemplate(this: ListItemGroup, hooks?: { items: () => void }) {
	const items = hooks?.items || defaultItems;

	return (
		<ul
			role="group"
			class="ui5-group-li-root"
			onDragEnter={this._ondragenter}
			onDragOver={this._ondragover}
			onDrop={this._ondrop}
			onDragLeave={this._ondragleave}
		>
			{this.hasHeader &&
				<ListItemGroupHeader focused={this.focused} part="header" accessibleRole={ListItemAccessibleRole.Group} wrappingType={this.getGroupHeaderWrapping()} >
					{ this.hasFormattedHeader ? <slot name="header"></slot> : this.headerText }
				</ListItemGroupHeader>
			}

			{ items.call(this) }

			<DropIndicator orientation="Horizontal" ownerReference={this}/>
		</ul>
	);
}

function defaultItems(this: ListItemGroup) {
	return <slot></slot>;
}
