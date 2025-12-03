import type { JsxTemplateResult } from "@ui5/webcomponents-base/dist/index.js";
import Input from "../Input.js";
import Icon from "../Icon.js";

import List from "../List.js";
import ResponsivePopover from "../ResponsivePopover.js";
import Button from "../Button.js";
import ListAccessibleRole from "../types/ListAccessibleRole.js";

const tableSuggestionList = function(this: Input) {
	return (
		<slot name="table"></slot>
	);
};

export default function InputSuggestionsTemplate(this: Input, hooks?: { suggestionsList?: (this: Input) => JsxTemplateResult, valueStateMessage: (this: Input) => JsxTemplateResult, valueStateMessageInputIcon: (this: Input) => string }) {
	const suggestionsList = hooks?.suggestionsList || defaultSuggestionsList;
	const valueStateMessage = hooks?.valueStateMessage;
	const valueStateMessageInputIcon = hooks?.valueStateMessageInputIcon;

	return (
		<ResponsivePopover
			class={this.classes.popover}
			hideArrow={true}
			preventFocusRestore={true}
			preventInitialFocus={true}
			placement="Bottom"
			horizontalAlign="Start"
			tabindex={-1}
			style={this.styles.suggestionsPopover}
			onOpen={this._afterOpenPicker}
			onClose={this._afterClosePicker}
			onScroll={this._scroll}
			open={true}
			opener={this}
			accessibleName={this._popupLabel}
		>
			{this._isPhone &&
				<>
					<div slot="header" class="ui5-responsive-popover-header">
						<div class="row">
							<span>{this._headerTitleText}</span>
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

					{this.hasValueStateMessage &&
					<div class={this.classes.popoverValueState} style={this.styles.suggestionPopoverHeader}>
						<Icon class="ui5-input-value-state-message-icon" name={valueStateMessageInputIcon?.call(this)} />
						{ this.open && valueStateMessage?.call(this) }
					</div>
					}
				</>
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
						<Icon class="ui5-input-value-state-message-icon" name={valueStateMessageInputIcon?.call(this)} />
						{ this.open && valueStateMessage?.call(this) }
					</div>
			}

			{ this.table ? tableSuggestionList.call(this) : (this.showSuggestions && suggestionsList.call(this))}

			{this._isPhone &&
				<div slot="footer" class="ui5-responsive-popover-footer">
					<Button
						design="Emphasized"
						onClick={this._confirmMobileValue}
					>
						{this._suggestionsOkButtonText}
					</Button>
					<Button
						class="ui5-responsive-popover-close-btn"
						design="Transparent"
						onClick={this._cancelMobileValue}
					>
						{this._suggestionsCancelButtonText}
					</Button>
				</div>
			}
		</ResponsivePopover>
	);
}



function defaultSuggestionsList(this: Input) {
	return (
		<List
			accessibleRole={ListAccessibleRole.ListBox}
			separators={this.suggestionSeparators}
			selectionMode="Single"
			onMouseDown={this.onItemMouseDown}
			onItemClick={this._handleSuggestionItemPress}
			onSelectionChange={this._handleSelectionChange}
		>
			<slot></slot>
		</List>
	);
}
