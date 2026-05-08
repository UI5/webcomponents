import TableCell from "./TableCell.js";
import type TableGroupRow from "./TableGroupRow.js";

export default function TableGroupRowTemplate(this: TableGroupRow) {
	return (
		<>
			<TableCell id="group-cell"
				role="gridcell"
				aria-colspan={this._ariaColSpan}
				data-excluded-from-navigation
			>
				<slot></slot>
			</TableCell>
			{ this._renderDummyCell &&
				<TableCell id="dummy-cell" role="none" aria-hidden={true}
					data-excluded-from-navigation="nofocus">
				</TableCell>
			}
		</>
	);
}
