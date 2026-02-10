import type ToolbarItem from "./ToolbarItem.js";

export default function ToolbarItemTemplate(this: ToolbarItem) {
	return (
		<slot></slot>
	);
}
