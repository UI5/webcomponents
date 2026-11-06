import type ListItemGroup from "./ListItemGroup.js";
import ListItemGroupHeader from "./ListItemGroupHeader.js";
import DropIndicator from "./DropIndicator.js";

export default function ListItemGroupTemplate(this: ListItemGroup) {
	return (
		<div role="group" aria-label={this.headerText}>
			{this.hasHeader &&
				<ListItemGroupHeader
					wrappingType={this.wrappingType}
					focused={this.focused}
					part="header"
					exportparts="title"
					accessibleRole="Heading"
				>
					{this.hasFormattedHeader ? <slot name="header"></slot> : this.headerText}
				</ListItemGroupHeader>
			}
			<div class="ui5-group-li-root"
				role="list"
				aria-label={this.headerText}
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
