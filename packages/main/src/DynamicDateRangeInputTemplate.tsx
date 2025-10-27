import type DynamicDateRange from "./DynamicDateRange.js";
import Icon from "./Icon.js";
import Input from "./Input.js";
import appointment from "@ui5/webcomponents-icons/dist/appointment-2.js";

export default function DynamicDateRangeInputTemplate(this: DynamicDateRange) {
	return (
		<div class="ui5-dynamic-date-range-root">
			<Input
				data-sap-focus-ref
				id={`${this._id}-inner`}
				class="ui5-dynamic-date-range-input"
				value={this.value && this.getOption(this.value?.operator)?.format(this.value)}
				onChange={this.onInputChange}
				onKeyDown={this.onInputKeyDown}
			>
				<Icon
					id={`${this._id}-value-help`}
					slot="icon"
					name={appointment}
					tabindex={-1}
					mode={this._iconMode}
					onClick={this._togglePicker}
					class={{
						"inputIcon": true,
						"inputIcon--pressed": this.open,
					}}
				/>

			</Input>
		</div>
	);
}
