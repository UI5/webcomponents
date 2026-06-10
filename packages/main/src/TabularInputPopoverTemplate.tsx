import type TabularInput from "./TabularInput.js";
import type { JsxTemplateResult } from "@ui5/webcomponents-base/dist/index.js";

import ResponsivePopover from "./ResponsivePopover.js";
import Button from "./Button.js";
import Title from "./Title.js";
import Input from "./Input.js";

/**
 * Renders the tabular suggestions popover for TabularInput.
 * Follows the same pattern as ComboBoxPopoverTemplate.
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
 * Renders the tabular suggestions list (table with header and body).
 */
function tabularSuggestionsList(this: TabularInput): JsxTemplateResult {
	return (
		<div class="ui5-tabular-input-suggestions-table">
			<table class="ui5-tabular-suggestions-table" role="listbox">
				<thead class="ui5-tabular-suggestions-header">
					<tr>
						{this.suggestionColumns.map((col, index) => (
							<th
								key={`col-${index}`}
								class="ui5-tabular-suggestions-header-cell"
								scope="col"
								style={col.width ? `width: ${col.width}` : ""}
							>
								{col.textContent}
							</th>
						))}
					</tr>
				</thead>
				<tbody class="ui5-tabular-suggestions-body">
					{this._visibleProcessedRows.map((processedRow, rowIndex) => (
						<tr
							key={`row-${rowIndex}`}
							id={`${this._id}-row-${rowIndex}`}
							class={{
								"ui5-tabular-suggestions-row": true,
								"ui5-tabular-suggestions-row--focused": processedRow.row.focused,
								"ui5-tabular-suggestions-row--selected": processedRow.row.selected,
							}}
							role="option"
							aria-selected={processedRow.row.selected || processedRow.row.focused}
							tabindex={-1}
							onClick={() => this._onSuggestionRowClick(processedRow.row)}
						>
							{processedRow.cells.map((cell, cellIndex) => (
								<td
									key={`cell-${rowIndex}-${cellIndex}`}
									class="ui5-tabular-suggestions-cell"
									dangerouslySetInnerHTML={{ __html: cell.highlightedMarkup }}
								>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
