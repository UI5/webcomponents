import TableCell from "./TableCell.js";
import type TableGroupRow from "./TableGroupRow.js";

export default function TableGroupRowTemplate(this: TableGroupRow) {
	return (
		<>
			{ this._hasSelectionSpacer &&
				<TableCell id="selection-spacer"
					role="none"
					aria-hidden={true}
					data-excluded-from-navigation="nofocus"
				></TableCell>
			}
			<TableCell id="group-cell"
				aria-colindex={this._hasSelectionSpacer ? 2 : 1}
				aria-colspan={this._ariaColSpan}
				data-selection-spacer={this._hasSelectionSpacer ? "" : undefined}
				data-excluded-from-navigation={true}
			>
				{ this.hierarchyState !== "Leaf" && this._tableHierarchy?.renderToggle(this) }
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
