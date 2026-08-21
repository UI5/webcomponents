import TableCell from "./TableCell.js";
import type TableGroupRow from "./TableGroupRow.js";

export default function TableGroupRowTemplate(this: TableGroupRow) {
	return (
		<>
			<TableCell id="group-cell"
				aria-colindex={1}
				aria-colspan={this._ariaColSpan}
				data-excluded-from-navigation={true}
			>
				<slot></slot>
			</TableCell>

			{ this._renderDummyCell &&
				<TableCell id="dummy-cell"
					role="none"
					aria-hidden={true}
					data-excluded-from-navigation="nofocus"
				></TableCell>
			}
		</>
	);
}
