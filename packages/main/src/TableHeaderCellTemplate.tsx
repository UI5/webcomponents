import type TableHeaderCell from "./TableHeaderCell.js";

export default function TableHeaderCellTemplate(this: TableHeaderCell) {
	const SortIconComponent = this._sortIconComponent;
	return (
		<>
			<slot name="action"></slot>
			<slot></slot>
			{ SortIconComponent &&
				<SortIconComponent name={this._sortIcon}></SortIconComponent>
			}
		</>
	);
}
