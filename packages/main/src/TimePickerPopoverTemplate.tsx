import type TimePicker from "./TimePicker.js";
import Button from "./Button.js";
import Popover from "./Popover.js";
import Icon from "./Icon.js";
import ResponsivePopover from "./ResponsivePopover.js";
import TimeSelectionClocks from "./TimeSelectionClocks.js";
import TimeSelectionInputs from "./TimeSelectionInputs.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import error from "@ui5/webcomponents-icons/dist/error.js";
import alert from "@ui5/webcomponents-icons/dist/alert.js";
import sysEnter2 from "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import information from "@ui5/webcomponents-icons/dist/information.js";

export default function TimePickerPopoverTemplate(this: TimePicker) {
	return (
		<>
			<ResponsivePopover
				id={`${this._id}-responsive-popover`}
				class="ui5-time-picker-popover"
				placement="Bottom"
				horizontalAlign="Start"
				opener={this}
				open={this.open}
				allowTargetOverlap={true}
				_hideHeader={this._shouldHideHeader}
				hideArrow={true}
				accessibleName={this.pickerAccessibleName}
				onClose={this.onResponsivePopoverAfterClose}
				onBeforeOpen={this.onResponsivePopoverBeforeOpen}
				onOpen={this.onResponsivePopoverAfterOpen}
				onWheel={this._handleWheel}
				onKeyDown={this._onkeydown}
			>
				{ !!this.showHeader && defaultHeader.call(this) }

				{ this.shouldDisplayValueStateMessageInResponsivePopover && valueStateTextHeader.call(this) }

				<TimeSelectionClocks
					id={`${this._id}-time-sel`}
					value={this._timeSelectionValue}
					formatPattern={this._formatPattern}
					onChange={this.onTimeSelectionChange}
					onClosePicker={this.submitPickers}
				/>

				<div slot="footer" class="ui5-time-picker-footer">
					<Button id="submit" design="Emphasized" onClick={this.submitPickers}>{this.submitButtonLabel}</Button>
					<Button id="close" design="Transparent" onClick={this._togglePicker}>{this.cancelButtonLabel}</Button>
				</div>
			</ResponsivePopover>

			{this._isMobileDevice &&
				<Popover
					id={`${this._id}-popover`}
					class="ui5-time-picker-inputs-popover"
					placement="Bottom"
					horizontalAlign="Start"
					allow-target-overlap
					_hide-header
					hide-arrow
					onOpen={this.onInputsPopoverAfterOpen}
					onClose={this.onInputsPopoverAfterClose}
					onWheel={this._handleWheel}
					onKeyDown={this._onkeydown}
				>
					{ this.hasValueStateText && valueStateTextHeader.call(this) }

					<div class="popover-content">
						<TimeSelectionInputs
							id={`${this._id}-time-sel-inputs`}
							value={this._timeSelectionValue}
							formatPattern={this._formatPattern}
							onChange={this.onTimeSelectionChange}
							onCloseInputs={this.submitInputsPopover}
						/>
					</div>

					<div slot="footer" class="ui5-time-picker-footer">
						<Button id="submitInputs" design="Emphasized" onClick={this.submitInputsPopover}>{this.submitButtonLabel}</Button>
						<Button id="closeInputs" design="Transparent" onClick={this.closeInputsPopover}>{this.cancelButtonLabel}</Button>
					</div>
				</Popover>
			}
		</>
	);
}

function defaultHeader(this: TimePicker) {
	return (
		<div slot="header" class="ui5-responsive-popover-header">
			<div class="row">
				<span>{this._headerTitleText}</span>
				<Button
					class="ui5-responsive-popover-close-btn"
					icon={decline}
					design="Transparent"
					onClick={this._togglePicker}
				>
				</Button>
			</div>
		</div>
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
