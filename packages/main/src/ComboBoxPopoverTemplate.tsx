import Icon from "./Icon.js";
import Button from "./Button.js";
import List from "./List.js";
import Input from "./Input.js";
import Popover from "./Popover.js";
import ResponsivePopover from "./ResponsivePopover.js";
import BusyIndicator from "./BusyIndicator.js";
import SuggestionItem from "./SuggestionItem.js";
import type ComboBox from "./ComboBox.js";

export default function ComboBoxPopoverTemplate(this: ComboBox) {
	return (
		<>
			<ResponsivePopover
				id={this.responsivePopoverId}
				class={this.classes.popover}
				style={this.styles.suggestionsPopover}
				tabindex={-1}
				open={this.open}
				opener={this}
				hideArrow={true}
				preventFocusRestore={true}
				preventInitialFocus={true}
				placement="Bottom"
				horizontalAlign="Start"
				accessibleName={this._popupLabel}
				onBeforeOpen={this._beforeOpenPopover}
				onOpen={this._afterOpenPopover}
				onClose={this._afterClosePopover}
				onKeyDown={this._handlePopoverKeydown}
				onFocusOut={this._handlePopoverFocusout}
			>
				<BusyIndicator active={this.loading} class="ui5-combobox-busy"/>

				{this._isPhone &&
				<>
					<div slot="header" class="ui5-responsive-popover-header">
						<div class="row">
							<span>{this._headerTitleText}</span>
						</div>

						<div class="row">
							<Input
								open={this.openOnMobile}
								placeholder={this.placeholder}
								valueState={this.valueState}
								showClearIcon={this.showClearIcon}
								noTypeahead={this.noTypeahead}
								onKeyDown={this._handleMobileKeydown}
								onInput={this._handleMobileInput}
								onChange={this._inputChange}
							>
								{ this._filteredItems.map(item => <SuggestionItem text={item.text} additional-text={item.additionalText}/>)}
							</Input>
						</div>
					</div>

					{this.hasValueStateText &&
					<div class={this.classes.popoverValueState} style={this.styles.popoverValueStateMessage}>
						<Icon class="ui5-input-value-state-message-icon" name={this._valueStateMessageIcon}/>
						{ this.open && valueStateMessage.call(this) }
					</div>
					}
				</>
				}

				{!this._isPhone && this.hasValueStateText &&
				<div
					slot="header"
					class={{
						"ui5-responsive-popover-header": true,
						...this.classes.popoverValueState,
					}}
					style={this.styles.suggestionPopoverHeader}
				>
					<Icon class="ui5-input-value-state-message-icon" name={this._valueStateMessageIcon}/>
					{ this.open && valueStateMessage.call(this) }
				</div>
				}

				{!!this._filteredItems.length &&
				<List
					class="ui5-combobox-items-list"
					separators="None"
					accessibleRole="ListBox"
					selectionMode="Single"
					onItemClick={this._selectItem}
					onItemFocused={this._onItemFocus}
					onMouseDown={this._itemMousedown}
				>
					{ this._filteredItems.map(item => <slot name={item._individualSlot}></slot>)}
				</List>
				}

				{this._isPhone &&
			<div slot="footer" class="ui5-responsive-popover-footer">
				<Button
					design="Emphasized"
					onClick={this._closeRespPopover}
				>{this._dialogOkButtonText}</Button>
				<Button
					class="ui5-responsive-popover-close-btn"
					design="Transparent"
					onClick={this._closeRespPopover}
				>
					{this._dialogCancelButtonText}
				</Button>
			</div>
				}
			</ResponsivePopover>

			{this.shouldOpenValueStateMessagePopover &&
		<Popover
			preventFocusRestore={true}
			preventInitialFocus={true}
			hideArrow={true}
			tabindex={-1}
			class="ui5-valuestatemessage-popover"
			horizontalAlign={"Start"}
			placement="Bottom"
			opener={this}
			open={this.valueStateOpen}
			onClose={this._handleValueStatePopoverAfterClose}
			onFocusOut={this._handleValueStatePopoverFocusout}
		>
			<div slot="header" class={this.classes.popoverValueState}>
				<Icon class="ui5-input-value-state-message-icon" name={this._valueStateMessageIcon}/>
				{ valueStateMessage.call(this) }
			</div>
		</Popover>
			}
		</>
	);
}

function valueStateMessage(this: ComboBox) {
	return (
		<>
			{ this.shouldDisplayDefaultValueStateMessage ? this.valueStateDefaultText : <slot name="valueStateMessage"></slot> }
		</>
	);
}
