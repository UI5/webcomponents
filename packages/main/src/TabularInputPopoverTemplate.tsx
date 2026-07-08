import type TabularInput from "./TabularInput.js";
import type { JsxTemplateResult } from "@ui5/webcomponents-base/dist/index.js";

import ResponsivePopover from "./ResponsivePopover.js";
import Button from "./Button.js";
import Title from "./Title.js";
import Input from "./Input.js";
import Table from "./Table.js";
import TableHeaderRow from "./TableHeaderRow.js";
import TableHeaderCell from "./TableHeaderCell.js";
import TableRow from "./TableRow.js";
import TableCell from "./TableCell.js";

/**
 * Renders the tabular suggestions popover for TabularInput.
 * Uses ui5-table for rendering tabular suggestions.
 */
export default function TabularInputPopoverTemplate(this: TabularInput): JsxTemplateResult {
	return (
		<ResponsivePopover
			class="ui5-suggestions-popover"
			hideArrow={true}
			preventFocusRestore={true}
			preventInitialFocus={true}
			placement="Bottom"
			horizontalAlign="Start"
			tabindex={-1}
			style={this.styles.suggestionsPopover}
			onOpen={this._afterOpenPicker}
			onClose={this._afterClosePicker}
			open={this.open}
			opener={this}
			accessibleName={this._tabularSuggestionsAccessibleName}
		>
			{this._isPhone &&
				<div slot="header" class="ui5-responsive-popover-header">
					<div class="row">
						<Title level="H1" wrappingType="None" class="ui5-responsive-popover-header-text">
							{this._headerTitleText}
						</Title>
					</div>
					<div class="row">
						<div class="input-root-phone native-input-wrapper">
							<Input
								class="ui5-input-inner-phone"
								type={this.inputType}
								value={this.value}
								showClearIcon={this.showClearIcon}
								placeholder={this.placeholder}
								onInput={this._handleInput}
							/>
						</div>
					</div>
				</div>
			}

			{tabularSuggestionsList.call(this)}

			{this._isPhone &&
				<div slot="footer" class="ui5-responsive-popover-footer">
					<Button design="Emphasized" onClick={this._confirmMobileValue}>
						{this._suggestionsOkButtonText}
					</Button>
					<Button class="ui5-responsive-popover-close-btn" design="Transparent" onClick={this._cancelMobileValue}>
						{this._suggestionsCancelButtonText}
					</Button>
				</div>
			}
		</ResponsivePopover>
	);
}

/**
 * Renders the tabular suggestions list using ui5-table.
 */
function tabularSuggestionsList(this: TabularInput): JsxTemplateResult {
	const isScrollMode = this.overflowMode === "Scroll";
	const lastColumnIndex = this.suggestionColumns.length - 1;

	return (
		<div class="ui5-tabular-input-suggestions-wrapper">
			<Table
				class="ui5-tabular-suggestions-table"
				overflowMode={this.overflowMode}
				accessibleName={this._tabularSuggestionsAccessibleName}
				onRowClick={this._onTableRowClick}
			>
				<TableHeaderRow slot="headerRow" sticky>
					{this.suggestionColumns.map((col, index) => {
						// In Scroll mode, make last column flexible to prevent dummy cell
						const width = (isScrollMode && index === lastColumnIndex) ? undefined : col.width;
						return (
							<TableHeaderCell
								key={`col-${index}`}
								width={width}
								minWidth={col.minWidth || col.width}
								importance={col.importance}
								popinText={col.popinText}
							>
								{col.textContent}
							</TableHeaderCell>
						);
					})}
				</TableHeaderRow>

				{this._visibleProcessedRows.map((processedRow, rowIndex) => (
					<TableRow
						key={`row-${rowIndex}`}
						id={`${this._id}-row-${rowIndex}`}
						class={{
							"ui5-tabular-suggestions-row--focused": processedRow.row.focused,
							"ui5-tabular-suggestions-row--selected": processedRow.row.selected,
						}}
						data-row-index={rowIndex}
						interactive
					>
						{processedRow.cells.map((cell, cellIndex) => (
							<TableCell
								key={`cell-${rowIndex}-${cellIndex}`}
								dangerouslySetInnerHTML={{ __html: cell.highlightedMarkup }}
							>
							</TableCell>
						))}
					</TableRow>
				))}
			</Table>
		</div>
	);
}
