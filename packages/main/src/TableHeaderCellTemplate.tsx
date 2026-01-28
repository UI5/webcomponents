import Icon from "./Icon.js";
import SortOrder from "@ui5/webcomponents-base/dist/types/SortOrder.js";
import SortAscending from "@ui5/webcomponents-icons/dist/sort-ascending.js";
import SortDescending from "@ui5/webcomponents-icons/dist/sort-descending.js";
import type TableHeaderCell from "./TableHeaderCell.js";

export default function TableHeaderCellTemplate(this: TableHeaderCell) {
	return (
		<>
			<slot name="action"></slot>
			<slot></slot>
			{ sortIcon.call(this) }
		</>
	);
}

function sortIcon(this: TableHeaderCell) {
	switch (this.sortIndicator) {
	case SortOrder.Ascending:
		return <Icon name={SortAscending}></Icon>;
	case SortOrder.Descending:
		return <Icon name={SortDescending}></Icon>;
	default:
		return <></>;
	}
}
