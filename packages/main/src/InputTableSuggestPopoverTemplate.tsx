import type InputTableSuggest from "./InputTableSuggest.js";
import type { JsxTemplateResult } from "@ui5/webcomponents-base/dist/index.js";

import Icon from "./Icon.js";
import error from "@ui5/webcomponents-icons/dist/error.js";
import alert from "@ui5/webcomponents-icons/dist/alert.js";
import sysEnter2 from "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import information from "@ui5/webcomponents-icons/dist/information.js";

import PopoverHorizontalAlign from "./types/PopoverHorizontalAlign.js";
import Popover from "./Popover.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Button from "./Button.js";
import Title from "./Title.js";
import Input from "./Input.js";
import Table from "./Table.js";
import TableHeaderRow from "./TableHeaderRow.js";
import TableHeaderCell from "./TableHeaderCell.js";
import TableRow from "./TableRow.js";
import TableCell from "./TableCell.js";

export default function InputTableSuggestPopoverTemplate(this: InputTableSuggest): JsxTemplateResult {
	return (
		<>
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
				accessibleName={this.suggestionsText}
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
						{this.hasValueStateMessage &&
						<div class={this.classes.popoverValueState} style={this.styles.suggestionPopoverHeader}>
							{valueStateMessage.call(this, this.open)}
						</div>
						}
					</div>
				}

				{!this._isPhone && this.hasValueStateMessage &&
					<div
						slot="header"
						class={{
							"ui5-responsive-popover-header": true,
							...this.classes.popoverValueState,
						}}
						style={this.styles.suggestionPopoverHeader}
					>
						{valueStateMessage.call(this, this.open)}
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

			{this.hasValueStateMessage && (
				<Popover
					preventInitialFocus={true}
					preventFocusRestore={true}
					hideArrow={true}
					class="ui5-valuestatemessage-popover"
					placement="Bottom"
					tabindex={-1}
					horizontalAlign={PopoverHorizontalAlign.Start}
					opener={this}
					open={this.valueStateOpen}
					onClose={this._handleValueStatePopoverAfterClose}
				>
					<div slot="header" class={this.classes.popoverValueState}>
						{valueStateMessage.call(this, this.valueStateOpen)}
					</div>
				</Popover>
			)}
		</>
	);
}

function valueStateMessage(this: InputTableSuggest, open: boolean) {
	const iconPerValueState = {
		Negative: error,
		Critical: alert,
		Positive: sysEnter2,
		Information: information,
	};

	const iconName = this.valueState !== ValueState.None ? iconPerValueState[this.valueState as keyof typeof iconPerValueState] : "";

	return (
		<>
			<Icon class="ui5-input-value-state-message-icon" name={iconName} />
			{open && (this.shouldDisplayDefaultValueStateMessage ? this.valueStateText : <slot name="valueStateMessage"></slot>)}
		</>
	);
}

function tabularSuggestionsList(this: InputTableSuggest): JsxTemplateResult {
	const isScrollMode = this._overflowMode === "Scroll";
	const lastColumnIndex = this.suggestionColumns.length - 1;

	return (
		<div class="ui5-input-table-suggest-suggestions-wrapper">
			<Table
				class="ui5-tabular-suggestions-table"
				overflowMode={this._overflowMode}
				accessibleName={this.suggestionsText}
				onRowClick={this._onTableRowClick}
			>
				<TableHeaderRow slot="headerRow" sticky>
					{this.suggestionColumns.map((col, index) => {
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
							<TableCell key={`cell-${rowIndex}-${cellIndex}`}>
								<span dangerouslySetInnerHTML={{ __html: cell.highlightedMarkup }}></span>
							</TableCell>
						))}
					</TableRow>
				))}
			</Table>
		</div>
	);
}
