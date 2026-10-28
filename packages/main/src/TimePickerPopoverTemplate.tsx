import type TimePicker from "./TimePicker.js";
import Bar from "./Bar.js";
import Button from "./Button.js";
import Icon from "./Icon.js";
import ResponsivePopover from "./ResponsivePopover.js";
import TimeSelectionClocks from "./TimeSelectionClocks.js";
import TimeSelectionInputs from "./TimeSelectionInputs.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import error from "@ui5/webcomponents-icons/dist/error.js";
import alert from "@ui5/webcomponents-icons/dist/alert.js";
import sysEnter2 from "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import information from "@ui5/webcomponents-icons/dist/information.js";
import keyboardAndMouse from "@ui5/webcomponents-icons/dist/keyboard-and-mouse.js";
import timeEntryRequest from "@ui5/webcomponents-icons/dist/time-entry-request.js";

export default function TimePickerPopoverTemplate(this: TimePicker) {
	return (
		<ResponsivePopover
			id={`${this._id}-responsive-popover`}
			class="ui5-time-picker-popover ui5-popover-with-value-state-header-phone"
			placement="Bottom"
			horizontalAlign="Start"
			opener={this}
			open={this.open}
			allowTargetOverlap={true}
			_hideHeader={this._shouldHideHeader}
			hideArrow={true}
			preventInitialFocus={this._preventPickerInitialFocus}
			initialFocus={this._initialFocusId}
			accessibleName={this.pickerAccessibleName}
			onClose={this.onResponsivePopoverAfterClose}
			onBeforeOpen={this.onResponsivePopoverBeforeOpen}
			onOpen={this.onResponsivePopoverAfterOpen}
			onWheel={this._handleWheel}
			onKeyDown={this._onkeydown}
		>
			{ !!this.showHeader && defaultHeader.call(this) }

			{ this.shouldDisplayValueStateMessageInResponsivePopover && valueStateTextHeader.call(this) }

			{ this._useInputsMode
				? <TimeSelectionInputs
					id={`${this._id}-time-sel`}
					class="ui5-tp-mode-inputs"
					value={this._timeSelectionValue}
					formatPattern={this._formatPattern}
					_showLabels={true}
					onChange={this.onTimeSelectionChange}
				/>
				: <TimeSelectionClocks
					id={`${this._id}-time-sel`}
					value={this._timeSelectionValue}
					formatPattern={this._formatPattern}
					onChange={this.onTimeSelectionChange}
					onClosePicker={this.submitPickers}
				/>
			}

			<div slot="footer" class="ui5-time-picker-footer">
				<Button id="submit" design="Emphasized" onClick={this.submitPickers}>{this.submitButtonLabel}</Button>
				<Button id="close" design="Transparent" onClick={this._togglePicker}>{this.cancelButtonLabel}</Button>
			</div>
		</ResponsivePopover>
	);
}

function defaultHeader(this: TimePicker) {
	return (
		<Bar slot="header" design="Header">
			<span class="ui5-tp-header-title" slot="startContent">{this._headerTitleText}</span>
			<Button
				slot="endContent"
				design="Transparent"
				icon={this._useInputsMode ? timeEntryRequest : keyboardAndMouse}
				tooltip={this._pickerModeToggleLabel}
				onClick={this._togglePickerMode}
			/>
		</Bar>
	);
}

function valueStateMessage(this: TimePicker) {
	return (
		this.shouldDisplayDefaultValueStateMessage ? this.valueStateDefaultText : <slot name="valueStateMessage"></slot>
	);
}

function valueStateTextHeader(this: TimePicker) {
	if (!this.hasValueStateText) {
		return;
	}

	return (
		<div
			slot={!this.showHeader ? "header" : undefined}
			class={{
				"ui5-popover-header": true,
				"ui5-valuestatemessage-header": true,
				"ui5-valuestatemessage-root": true,
				"ui5-valuestatemessage--success": this.valueState === ValueState.Positive,
				"ui5-valuestatemessage--error": this.valueState === ValueState.Negative,
				"ui5-valuestatemessage--warning": this.valueState === ValueState.Critical,
				"ui5-valuestatemessage--information": this.valueState === ValueState.Information,
			}}
		>
			<Icon class="ui5-input-value-state-message-icon" name={valueStateMessageInputIcon.call(this)}/>
			{ valueStateMessage.call(this) }
		</div>
	);
}

function valueStateMessageInputIcon(this: TimePicker) {
	const iconPerValueState = {
		Negative: error,
		Critical: alert,
		Positive: sysEnter2,
		Information: information,
	};

	return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
}
