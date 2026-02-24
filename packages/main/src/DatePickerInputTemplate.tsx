import type DatePicker from "./DatePicker.js";
import DateTimeInput from "./DateTimeInput.js";
import Icon from "./Icon.js";

export default function DatePickerInputTemplate(this: DatePicker) {
	return (
		<div
			class="ui5-date-picker-root"
			style={{
				width: "100%",
			}}
		>
			<DateTimeInput
				data-sap-focus-ref
				id={`${this._id}-inner`}
				class="ui5-date-picker-input"
				part="input"
				placeholder={this._placeholder}
				type={this.type}
				value={this.displayValue}
				disabled={this.disabled}
				required={this.required}
				readonly={this.readonly}
				valueState={this.valueState}
				_inputAccInfo={this.accInfo}
				_shouldOpenValueStatePopover={!this.open}
				onChange={this._onInputChange}
				onInput={this._onInputInput}
				onui5-_request-submit={this._onInputRequestSubmit}
				onKeyDown={this._onkeydown}
			>

				{!this.open && this.valueStateMessage.length > 0 &&
					<slot name="valueStateMessage" slot="valueStateMessage"></slot>
				}

				{!this.readonly &&
					<Icon
						id={`${this._id}-value-help`}
						slot="icon"
						name={this.openIconName}
						tabindex={-1}
						accessibleName={this.openIconTitle}
						mode={this._iconMode}
						showTooltip={true}
						class={{
							"inputIcon": true,
							"inputIcon--pressed": this.open,
						}}
						onClick={this._togglePicker}
					/>
				}
			</DateTimeInput>
		</div>
	);
}
