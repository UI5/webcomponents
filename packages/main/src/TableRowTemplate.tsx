import TableCell from "./TableCell.js";
import RadioButton from "./RadioButton.js";
import Button from "./Button.js";
import ButtonDesign from "./types/ButtonDesign.js";
import iconOverflow from "@ui5/webcomponents-icons/dist/overflow.js";
import type TableRow from "./TableRow.js";
import type TableSelectionMulti from "./TableSelectionMulti.js";
import type CheckBoxT from "./CheckBox.js";

const instanceOfMulti = (object: any): object is TableSelectionMulti => {
	return "isMultiSelectable" in object && object.isMultiSelectable();
};

const exctractCheckBox = (object: any) => {
	if (instanceOfMulti(object)) {
		return object.CheckBox;
	}
};

export default function TableRowTemplate(this: TableRow, ariaColIndex: number = 1) {
	const selection = this._table?._getSelection();
	let CheckBox = exctractCheckBox(selection);
	return (
		<>
			{ this._hasSelector &&
				<TableCell id="selection-cell"
					aria-selected={this._isSelected}
					aria-colindex={ariaColIndex++}
					data-ui5-table-selection-cell
					data-ui5-table-cell-fixed
					data-ui5-table-acc-text=""
				>
					{ this._isMultiSelect && CheckBox ?
						<CheckBox id="selection-component"
							tabindex={-1}
							checked={this._isSelected}
							onChange={this._onSelectionChange}
							accessibleName={this._i18nRowSelector}
						></CheckBox>
						:
						<RadioButton id="selection-component"
							tabindex={-1}
							name={this._tableId}
							checked={this._isSelected}
							onChange={this._onSelectionChange}
							accessibleName={this._i18nRowSelector}
						></RadioButton>
					}
				</TableCell>
			}

			{ this.cells.flatMap(cell => {
				if (cell._popin) {
					cell.role = null;
					cell.ariaColIndex = null;
					return [];
				}

				cell.role ??= cell.ariaRole;
				cell.ariaColIndex = (cell.role === cell.ariaRole) ? `${ariaColIndex++}` : null;
				return [<slot name={cell._individualSlot}></slot>];
			})}

			{ this._rowActionCount > 0 &&
				<TableCell id="actions-cell"
					aria-colindex={ariaColIndex++}
					data-ui5-table-acc-text={this._actionCellAccText}
				>
					{ this._flexibleActions.map(action => (
						<slot name={action._individualSlot}></slot>
					))}

					{ this._hasOverflowActions &&
						<Button id="overflow"
							icon={iconOverflow}
							design={ButtonDesign.Transparent}
							onClick={this._onOverflowButtonClick}
						></Button>
					}

					{ this._fixedActions.map(action => (
						<slot name={action._individualSlot}></slot>
					))}
				</TableCell>
			}

			{ this._renderNavigated &&
				<TableCell id="navigated-cell"
					data-excluded-from-navigation
					aria-hidden={true}
					role="none"
				>
					<div id="navigated"></div>
				</TableCell>
			}

			{ this._popinCells.length > 0 &&
				<TableCell id="popin-cell"
					data-ui5-table-popin-cell
					aria-colindex={ariaColIndex++}
				>
					{ this._popinCells.map(cell => (
						<slot name={cell._individualSlot}></slot>
					))}
				</TableCell>
			}
		</>
	);
}
