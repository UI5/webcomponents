import type InputTableSuggest from "./InputTableSuggest.js";
import type { JsxTemplateResult } from "@ui5/webcomponents-base/dist/index.js";

import Icon from "./Icon.js";

import { ValueStatePopover, valueStateMessageInputIcon } from "./InputFieldTemplate.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Button from "./Button.js";
import Title from "./Title.js";
import Input from "./Input.js";
import Table from "./Table.js";

export default function InputTableSuggestPopoverTemplate(this: InputTableSuggest): JsxTemplateResult {
	return (
		<>
			{this._useTableSuggestions &&
			<ResponsivePopover
				class="ui5-suggestions-popover"
				id={this._suggestionsPopoverId}
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
			}

			{ValueStatePopover.call(this)}
		</>
	);
}

function valueStateMessage(this: InputTableSuggest, open: boolean) {
	const iconName = valueStateMessageInputIcon.call(this);

	return (
		<>
			<Icon class="ui5-input-value-state-message-icon" name={iconName} />
			{open && (this.shouldDisplayDefaultValueStateMessage ? this.valueStateText : <slot name="valueStateMessage"></slot>)}
		</>
	);
}

function tabularSuggestionsList(this: InputTableSuggest): JsxTemplateResult {
	return (
		<div class="ui5-input-table-suggest-wrapper" onClick={this._onTableRowClick} onScroll={this._onTableScroll}>
			<Table
				class="ui5-input-table-suggest-table"
				overflowMode={this._overflowMode}
				accessibleName={this.suggestionsText}
			>
				<slot name="headerRow" slot="headerRow"></slot>
				<slot></slot>
			</Table>
		</div>
	);
}
