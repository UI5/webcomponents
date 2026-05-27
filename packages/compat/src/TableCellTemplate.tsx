import type TableCell from "./TableCell.js";

export default function TableCellTemplate(this: TableCell) {
	return (
		<td
			tabindex={-1}
			part="cell"
			role="cell"
		>
			<div class="ui5-table-cell-content">
				<slot></slot>
			</div>
		</td>
	);
}
