import type { JsxTemplateResult } from "@ui5/webcomponents-base/dist/index.js";
import Input from "../Input.js";
import Icon from "../Icon.js";

import List from "../List.js";
import ResponsivePopover from "../ResponsivePopover.js";
import Button from "../Button.js";
import ListAccessibleRole from "../types/ListAccessibleRole.js";
import Title from "../Title.js";

export default function InputSuggestionsTemplate(this: Input, hooks?: { suggestionsList?: (this: Input) => JsxTemplateResult, mobileHeader?: (this: Input) => JsxTemplateResult, valueStateMessage: (this: Input) => JsxTemplateResult, valueStateMessageInputIcon: (this: Input) => string }) {
	const suggestionsList = hooks?.suggestionsList || defaultSuggestionsList;
	// Mobile header hook - intended only for MultiInput design scenario
	const mobileHeader = hooks?.mobileHeader;
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
			open={this.open}
			opener={this}
			accessibleName={this._popupLabel}
		>
			{this._isPhone &&
				<>
					<div slot="header" class="ui5-responsive-popover-header">
						<div class="row">
							<Title
								level="H1"
								wrappingType="None"
								class="ui5-responsive-popover-header-text"
							>
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
								{mobileHeader?.call(this)}
							</div>
						</div>

						{this.hasValueStateMessage &&
							<div class={this.classes.popoverValueState} style={this.styles.suggestionPopoverHeader}>
								<Icon class="ui5-input-value-state-message-icon" name={valueStateMessageInputIcon?.call(this)} />
								{this.open && valueStateMessage?.call(this)}
							</div>
						}
					</div>
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
					{this.open && valueStateMessage?.call(this)}
				</div>
			}

			{this.showSuggestions && suggestionsList.call(this)}

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
