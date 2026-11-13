import type ListItemGroup from "./ListItemGroup.js";
import ListItemGroupHeader from "./ListItemGroupHeader.js";
import DropIndicator from "./DropIndicator.js";

export default function ListItemGroupTemplate(this: ListItemGroup) {
	// Only the default list role exposes the header as a heading and nests the
	// items in an inner role="list". For listbox/menu/tree the items must stay
	// direct members of the role="group", so header and wrapper are role="none".
	return (
		<div
			role={this.exposeGroupRole ? "group" : undefined}
			aria-label={this.exposeGroupRole ? this.groupLabel : undefined}
		>
			{this.hasHeader &&
				<ListItemGroupHeader
					wrappingType={this.wrappingType}
					focused={this.focused}
					part="header"
					exportparts="title"
					accessibleRole={this.isDefaultListRole ? "Heading" : "None"}
				>
					{this.hasFormattedHeader ? <slot name="header"></slot> : this.headerText}
				</ListItemGroupHeader>
			}
			<div class="ui5-group-li-root"
				role={this.isDefaultListRole && this.exposeGroupRole ? "list" : "none"}
				aria-label={this.isDefaultListRole && this.exposeGroupRole ? this.groupLabel : undefined}
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
