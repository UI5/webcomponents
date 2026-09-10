import TableHeaderCell from "./TableHeaderCell.js";
import type TableHeaderRow from "./TableHeaderRow.js";

export default function TableHeaderRowTemplate(this: TableHeaderRow, ariaColIndex: number = 1) {
	const SelectionComponent = this._selectionComponent;
	const ClearAllComponent = this._clearAllComponent;
	return (
		<>
			{ this._hasSelector &&
				<TableHeaderCell id="selection-cell"
					aria-selected={this._isSelected}
					aria-label={this._i18nSelection}
					aria-description={this._selectionCellAriaDescription}
					aria-colindex={ariaColIndex++}
					data-ui5-table-selection-cell
					data-ui5-acc-text=""
				>
					{ !this._isMultiSelect ?
						<></>
						:
						this._shouldRenderClearAll ?
							(ClearAllComponent &&
								<ClearAllComponent
									name={this._clearAllIcon}
									mode="Decorative"
									showTooltip={true}
									accessibleName={this._i18nDeselectAllRows}
									design={this._hasSelectedRows ? "Default" : "NonInteractive"}
									onClick={this._onSelectionChange}
								></ClearAllComponent>
							)
							:
							SelectionComponent &&
							<SelectionComponent id="selection-component"
								tabindex={-1}
								checked={this._isSelected}
								onChange={this._onSelectionChange}
								accessibleName={this._i18nRowSelector}
								title={this._isSelected ? this._i18nDeselectAllRows : this._i18nSelectAllRows}
							></SelectionComponent>
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

			{ this._renderDummyCell && this._hasPopin &&
				<TableHeaderCell id="dummy-cell" role="none" aria-hidden={true}
					data-excluded-from-navigation="">
				</TableHeaderCell>
			}

			{ this._rowActionCount > 0 &&
				<TableHeaderCell id="actions-cell" aria-colindex={ariaColIndex++}>
					<div id="actions-cell-content">{this._i18nRowActions}</div>
				</TableHeaderCell>
			}

			{ this._renderNavigated &&
				<TableHeaderCell id="navigated-cell"
					data-excluded-from-navigation
					aria-hidden={true}
					role="none"
				>
					<div id="navigated"></div>
				</TableHeaderCell>
			}

			{ this._renderDummyCell && !this._hasPopin &&
				<TableHeaderCell id="dummy-cell" role="none" aria-hidden={true}
					data-excluded-from-navigation="nofocus">
				</TableHeaderCell>
			}

			{ this._hasPopin &&
				<TableHeaderCell id="popin-cell" aria-colindex={ariaColIndex++} data-excluded-from-navigation>
					<div id="popin-cell-content">{this._i18nRowPopin}</div>
				</TableHeaderCell>
			}
		</>
	);
}
