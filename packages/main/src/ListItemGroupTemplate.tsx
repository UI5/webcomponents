import type ListItemGroup from "./ListItemGroup.js";
import ListItemGroupHeader from "./ListItemGroupHeader.js";
import DropIndicator from "./DropIndicator.js";

export default function ListItemGroupTemplate(this: ListItemGroup) {
	// Under a listbox the items must stay options directly inside the single
	// role="group": a heading header or an intervening role="list" would detach
	// them from the listbox and the browser would downgrade them to list items.
	// Under a list (and every other role) the header is a heading and the items
	// live in an inner role="list" so the list announces the real item count
	// while the header is read as structural rather than as a counted item.
	return (
		<div role="group" aria-label={this.groupLabel}>
			{this.hasHeader &&
				<ListItemGroupHeader
					wrappingType={this.wrappingType}
					focused={this.focused}
					part="header"
					exportparts="title"
					accessibleRole={this.isListBox ? "None" : "Heading"}
				>
					{this.hasFormattedHeader ? <slot name="header"></slot> : this.headerText}
				</ListItemGroupHeader>
			}
			<div class="ui5-group-li-root"
				role={this.isListBox ? "none" : "list"}
				aria-label={this.isListBox ? undefined : this.groupLabel}
				onDragEnter={this._ondragenter}
				onDragOver={this._ondragover}
				onDrop={this._ondrop}
				onDragLeave={this._ondragleave}
				id={`${this._id}-content`}>

				<slot></slot>

				<DropIndicator orientation="Horizontal" ownerReference={this} />
			</div>
		</div>
	);
}
