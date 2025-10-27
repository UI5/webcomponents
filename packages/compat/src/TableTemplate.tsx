import type Table from "./Table.js";
import CheckBox from "@ui5/webcomponents/dist/CheckBox.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";

export default function TableTemplate(this: Table) {
	return (
		<div
			class="ui5-table-root"
			onui5-selection-requested={this._handleSelect}
			onui5-forward-after={this._onForwardAfter}
			onui5-forward-before={this._onForwardBefore}
			onFocusIn={this._onfocusin}
		>
			<BusyIndicator
				id={`${this._id}-busyIndicator`}
				delay={this.busyDelay}
				active={this.busy}
				class="ui5-table-busy-indicator"
			>
				<div id={`${this._id}-before`} tabindex={0} class="ui5-table-focusarea"></div>

				<table
					role="table"
					cellSpacing="0"
					cellPadding="0"
					aria-label={this.tableAriaLabelText}
					onKeyDown={this._onkeydown}
				>
					<thead>
						 <tr
							id={this._columnHeader.id}
							class="ui5-table-header-row"
							aria-label={this.ariaLabelText}
							tabindex={this._columnHeader.forcedTabIndex ? parseInt(this._columnHeader.forcedTabIndex) : undefined}
							onClick={this._onColumnHeaderClick}
							onFocusIn={this._onColumnHeaderFocused}
							onKeyDown={this._onColumnHeaderKeydown}
						>
							{this.isMultiSelect &&
								<th class="ui5-table-select-all-column" role="presentation" aria-hidden="true">
									{this.rows.length > 0 &&
										<CheckBox
											class="ui5-table-select-all-checkbox"
											tabindex={-1}
											checked={this._allRowsSelected}
											accessibleName={this.ariaLabelSelectAllText}
											onChange={this._selectAll}
										>
										</CheckBox>
									}
								</th>
							}

							{this.visibleColumns.map(col =>
								<slot name={col._individualSlot}></slot>
							)}

							<th class="ui5-table-header-row-navigated" aria-hidden="true"></th>
						</tr>
					</thead>

					<tbody>
						{
							this.rows.map(row =>
								<slot name={row._individualSlot} onKeyDown={this.onRowKeyDown}></slot>
							)}

						{!this.rows.length && !this.hideNoData &&
							<tr class="ui5-table-no-data-row-root">
								<td colspan={this.visibleColumnsCount} role="cell" style="width: 100%">

									<div class="ui5-table-no-data-row">
										<span>{this.noDataText}</span>
									</div>
								</td>
							</tr>
						}

						{ this.growsWithButton && moreRow.call(this) }

						{ this.growsOnScroll && endRow.call(this) }
					</tbody>
				</table>

				<div id={`${this._id}-after`} tabindex={0} class="ui5-table-focusarea"></div>
			</BusyIndicator>
		</div>
	);
}

function moreRow(this: Table) {
	return (
		<tr>
			<td colspan={this.visibleColumnsCount}>
				<div class="ui5-table-growing-row">
					<div
						id={`${this._id}-growingButton`}
						class={{
							"ui5-table-growing-row-inner": true,
							"ui5-table-growing-row-inner--active": this._loadMoreActive
						}}
						role="button"
						tabindex={0}
						aria-labelledby={this.loadMoreAriaLabelledBy}
						onClick={this._onLoadMoreClick}
						onKeyUp={this._onLoadMoreKeyup}
						onKeyDown={this._onLoadMoreKeydown}
					>
						<span id={`${this._id}-growingButton-text`} class="ui5-table-growing-row-text">{this._growingButtonText}</span>

						{this.growingButtonSubtext &&
							<span id={`${this._id}-growingButton-subtext`} class="ui5-table-growing-row-subtext">{this.growingButtonSubtext}</span>
						}
					</div>
				</div>
			</td>
		</tr>
	);
}

function endRow(this: Table) {
	return (
		<tr tabindex={-1} aria-hidden="true" class="ui5-table-end-row">
			<td tabindex={-1}>
				<span tabindex={-1} aria-hidden="true" class="ui5-table-end-marker"></span>
			</td>
		</tr>
	);
}
