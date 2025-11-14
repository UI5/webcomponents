import type ToolbarItem from "./ToolbarItem.js";

export default function ToolbarItemTemplate(this: ToolbarItem) {
	return (
		<div onClick={this.onClick}>
			<slot></slot>
		</div>
	);
}
