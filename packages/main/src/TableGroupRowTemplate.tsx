import type TableGroupRow from "./TableGroupRow.js";

export default function TableGroupRowTemplate(this: TableGroupRow) {
	return (
		<div id="group-cell"
			role="gridcell"
			aria-colindex={1}
			aria-colspan={this._ariaColSpan}
		>
			<slot></slot>
		</div>
	);
}
