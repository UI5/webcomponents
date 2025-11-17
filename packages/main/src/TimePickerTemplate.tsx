import type TimePicker from "./TimePicker.js";
import Icon from "./Icon.js";
import DateTimeInput from "./DateTimeInput.js";
import TimePickerPopoverTemplate from "./TimePickerPopoverTemplate.js";
import timeEntryRequest from "@ui5/webcomponents-icons/dist/time-entry-request.js";

export default function TimePickerTemplate(this: TimePicker) {
	return (
		<>
			<div id={this._id} class="ui5-time-picker-root">
				<DateTimeInput
					data-sap-focus-ref
					id={`${this._id}-inner`}
					class="ui5-time-picker-input"
					value={this.value}
					placeholder={this._placeholder}
					disabled={this.disabled}
					readonly={this.readonly}
					required={this.required}
					valueState={this.valueState}
					_shouldOpenValueStatePopover={!this.open}
					_inputAccInfo={this.accInfo}
					onClick={this._handleInputClick}
					onChange={this._handleInputChange}
					onInput={this._handleInputLiveChange}
					onFocusIn={this._onfocusin}
					onKeyDown={this._onkeydown}
				>
					{this.shouldDisplayValueStateMessageOnDesktop &&
						<slot
							name="valueStateMessage"
							slot="valueStateMessage"
						></slot>
					}

					{!this.readonly &&
						<Icon
							slot="icon"
							name={timeEntryRequest}
							tabindex={-1}
							showTooltip={true}
							mode={this._iconMode}
							onClick={this._togglePicker}
							class={{
								"ui5-time-picker-input-icon-button": true,
								"inputIcon": true,
								"inputIcon--pressed": this.open,
							}}
						/>
					}
				</DateTimeInput>
			</div>

			{ TimePickerPopoverTemplate.call(this) }
		</>
	);
}
