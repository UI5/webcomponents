import CheckBox from "./CheckBox.js";
import TableHeaderCell from "./TableHeaderCell.js";
import Icon from "./Icon.js";
import IconMode from "./types/IconMode.js";
import ClearAll from "@ui5/webcomponents-icons/dist/clear-all.js";
import IconDesign from "./types/IconDesign.js";
import type TableHeaderRow from "./TableHeaderRow.js";

export default function TableHeaderRowTemplate(this: TableHeaderRow, ariaColIndex: number = 1) {
	return (
		<>
			{ this._hasSelector &&
				<TableHeaderCell id="selection-cell"
					aria-selected={this._isSelected}
					aria-label={this._i18nSelection}
					aria-description={this._selectionCellAriaDescription}
					aria-colindex={ariaColIndex++}
					data-ui5-table-selection-cell
					data-ui5-table-cell-fixed
					data-ui5-acc-text=""
				>
					{ !this._isMultiSelect ?
						<></>
						:
						this._shouldRenderClearAll ?
							<Icon
								name={ClearAll}
								mode={IconMode.Decorative}
								showTooltip={true}
								accessibleName={this._i18nDeselectAllRows}
								design={this._hasSelectedRows ? IconDesign.Default : IconDesign.NonInteractive}
								onClick={this._onSelectionChange}
							></Icon>
							:
							<CheckBox id="selection-component"
								tabindex={-1}
								checked={this._isSelected}
								onChange={this._onSelectionChange}
								accessibleName={this._i18nRowSelector}
								title={this._isSelected ? this._i18nDeselectAllRows : this._i18nSelectAllRows}
							></CheckBox>
					}
				</TableHeaderCell>
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
				<TableHeaderCell id="actions-cell" aria-colindex={ariaColIndex++}>
					<div id="actions-cell-content">{this._i18nRowActions}</div>
				</TableHeaderCell>
			}

			{ this._popinCells.length > 0 &&
				<TableHeaderCell id="popin-cell" aria-colindex={ariaColIndex++} data-excluded-from-navigation>
					<div id="popin-cell-content">{this._i18nRowPopin}</div>
				</TableHeaderCell>
			}
		</>
	);
}
