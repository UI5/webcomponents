import TableCell from "./TableCell.js";
import type TableGroupRow from "./TableGroupRow.js";

export default function TableGroupRowTemplate(this: TableGroupRow) {
	return (
		<TableCell id="group-cell"
			aria-colindex={1}
			aria-colspan={this._ariaColSpan}
		>
			<slot></slot>
		</TableCell>
	);
}
