import Icon from "./Icon.js";
import Button from "./Button.js";
import List from "./List.js";
import Input from "./Input.js";
import Title from "./Title.js";
import PopoverHorizontalAlign from "./types/PopoverHorizontalAlign.js";
import Popover from "./Popover.js";
import ResponsivePopover from "./ResponsivePopover.js";
import BusyIndicator from "./BusyIndicator.js";
import SuggestionItem from "./SuggestionItem.js";
import generateHighlightedMarkupFirstMatch from "@ui5/webcomponents-base/dist/util/generateHighlightedMarkupFirstMatch.js";
import type ComboBox from "./ComboBox.js";
import { LOADING_DELAY } from "./features/ComboBoxLazyLoading.js";

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
				{this._isPhone && dialogHeader.call(this)}
				{valueStateHeader.call(this)}
				{content.call(this)}
				{this._isPhone && dialogFooter.call(this)}
			</ResponsivePopover>

			{this.shouldOpenValueStateMessagePopover &&
				<Popover
					preventFocusRestore={true}
					preventInitialFocus={true}
					hideArrow={true}
					tabindex={-1}
					class="ui5-valuestatemessage-popover"
					horizontalAlign={PopoverHorizontalAlign.Start}
					placement="Bottom"
					opener={this}
					open={this.valueStateOpen}
					onClose={this._handleValueStatePopoverAfterClose}
					onFocusOut={this._handleValueStatePopoverFocusout}
				>
					<div slot="header" class={this.classes.popoverValueState}>
						<Icon class="ui5-input-value-state-message-icon" name={this._valueStateMessageIcon} />
						{valueStateMessage.call(this)}
					</div>
				</Popover>
			}
		</>
	);
}

function valueStateMessage(this: ComboBox) {
	return (
		<>
			{this.shouldDisplayDefaultValueStateMessage ? this.valueStateDefaultText : <slot name="valueStateMessage"></slot>}
		</>
	);
}

function valueStateHeader(this: ComboBox) {
	if (!this.hasValueStateText) {
		return;
	}

	if (this._isPhone) {
		return (
			<div class={this.classes.popoverValueState} style={this.styles.popoverValueStateMessage}>
				<Icon class="ui5-input-value-state-message-icon" name={this._valueStateMessageIcon} />
				{this.open && valueStateMessage.call(this)}
			</div>
		);
	}

	if (!this._isPhone) {
		return (
			<div
				slot="header"
				class={{
					"ui5-responsive-popover-header": true,
					...this.classes.popoverValueState,
				}}
				style={this.styles.suggestionPopoverHeader}
			>
				<Icon class="ui5-input-value-state-message-icon" name={this._valueStateMessageIcon} />
				{this.open && valueStateMessage.call(this)}
			</div>
		);
	}
}

function content(this: ComboBox) {
	if (this.loading && (this._isPhone || !this.hasValueState)) {
		return <BusyIndicator active={true} class="ui5-combobox-busy" delay={LOADING_DELAY} />;
	}

	const loadingOnDesktopWithValueState = this.loading && !this._isPhone && this.hasValueState;
	const hasFilteredItems = !this.loading && this._filteredItems && this._filteredItems.length;

	if (loadingOnDesktopWithValueState || hasFilteredItems) {
		return (
			<List
				class="ui5-combobox-items-list"
				separators="None"
				accessibleRole="ListBox"
				selectionMode="Single"
				onItemClick={this._selectItem}
				onItemFocused={this._onItemFocus}
				onMouseDown={this._itemMousedown}
			>
				{loadingOnDesktopWithValueState && <BusyIndicator active={true} class="ui5-combobox-busy" delay={LOADING_DELAY} />}
				{(hasFilteredItems && this._filteredItems.length > 0)
					? this._filteredItems.map(item => <slot name={item._individualSlot}></slot>)
					: null
				}
			</List>
		);
	}
}

function dialogFooter(this: ComboBox) {
	return (
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
	);
}

function dialogHeader(this: ComboBox) {
	return <>
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
					{!this.loading && this._filteredItems.flatMap(item => {
						if (item.isGroupItem && item.items) {
							// For group items, return all nested items
							return item.items
								.filter(nestedItem => !!nestedItem)
								.map(nestedItem =>
									<SuggestionItem text={nestedItem.text} additional-text={nestedItem.additionalText} markupText={generateHighlightedMarkupFirstMatch(nestedItem.text || "", this.filterValue)} />
								);
						}
						// For regular items
						return <SuggestionItem text={item.text} additional-text={item.additionalText} markupText={generateHighlightedMarkupFirstMatch(item.text || "", this.filterValue)} />;
					})}
				</Input>
			</div>
		</div>
	</>;
}
