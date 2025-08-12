import TableCell from "./TableCell.js";
import CheckBox from "./CheckBox.js";
import RadioButton from "./RadioButton.js";
import Button from "./Button.js";
import ButtonDesign from "./types/ButtonDesign.js";
import type TableRow from "./TableRow.js";

export default function TableRowTemplate(this: TableRow, ariaColIndex: number = 1) {
	return (
		<>
			{ this._hasSelector &&
				<TableCell id="selection-cell"
					aria-selected={this._isSelected}
					aria-colindex={ariaColIndex++}
					data-ui5-table-cell-fixed
					data-ui5-table-selection-component
				>
					{ this._isMultiSelect ?
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

			{ this._visibleCells.map(cell => {
				cell.ariaColIndex = `${ariaColIndex++}`;
				return <slot name={cell._individualSlot}></slot>;
			})}

			{ this._rowActionCount > 0 &&
				<TableCell id="actions-cell" aria-colindex={ariaColIndex++}>
					{ this._flexibleActions.map(action => (
						<slot name={action._individualSlot}></slot>
					))}

					{ this._hasOverflowActions &&
						<Button
							id="overflow"
							icon="overflow"
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
				<TableCell id="navigated-cell" data-excluded-from-navigation aria-hidden={true}>
					<div id="navigated"></div>
				</TableCell>
			}

			{ this._popinCells.length > 0 &&
				<TableCell id="popin-cell" aria-colindex={ariaColIndex++}>
					{ this._popinCells.map(cell => (
						<slot name={cell._individualSlot}></slot>
					))}
				</TableCell>
			}
		</>
	);
}
