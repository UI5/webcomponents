import type ListItemGroup from "./ListItemGroup.js";
import ListItemGroupHeader from "./ListItemGroupHeader.js";
import DropIndicator from "./DropIndicator.js";

export default function ListItemGroupTemplate(this: ListItemGroup) {
	return (
		<>
			{this.hasHeader &&
				<ListItemGroupHeader wrappingType={this.wrappingType} focused={this.focused} part="header" accessibleRole={"ListItem"}>
					{ this.hasFormattedHeader ? <slot name="header"></slot> : this.headerText }
					<div
						role="list"
						slot="subItems"
						aria-owns={`${this._id}-content`}
						aria-label={this.headerText}
					></div>
				</ListItemGroupHeader>
			}
			<div class="ui5-group-li-root"
				onDragEnter={this._ondragenter}
				onDragOver={this._ondragover}
				onDrop={this._ondrop}
				onDragLeave={this._ondragleave}
				id={`${this._id}-content`}>

				<slot></slot>

				<DropIndicator orientation="Horizontal" ownerReference={this}/>
			</div>
		</>

	);
}
