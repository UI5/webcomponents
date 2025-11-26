import { Device } from "@ui5/webcomponents-base";
import type RadioButton from "./RadioButton.js";
import Label from "./Label.js";

export default function RadioButtonTemplate(this: RadioButton) {
	return (
		<div
			role="radio"
			class="ui5-radio-root"
			aria-checked={this.checked}
			aria-disabled={this.effectiveAriaDisabled}
			aria-describedby={this.effectiveAriaDescribedBy}
			aria-label={this.ariaLabelText}
			tabindex={this.effectiveTabIndex}
			onClick={this._onclick}
			onKeyDown={this._onkeydown}
			onKeyUp={this._onkeyup}
			onMouseDown={this._onmousedown}
			onMouseUp={this._onmouseup}
			onFocusOut={this._onfocusout}
		>
			<div class={{
				"ui5-radio-inner": true,
				"ui5-radio-inner--hoverable": !this.disabled && !this.readonly && Device.isDesktop(),
			}}>
				<svg class="ui5-radio-svg" focusable="false" aria-hidden="true">
					<circle part="outer-ring" class="ui5-radio-svg-outer" cx="50%" cy="50%" r="50%" />
					<circle part="inner-ring" class="ui5-radio-svg-inner" cx="50%" cy="50%" />
				</svg>
				<input
					type="radio"
					required={this.required}
					checked={this.checked}
					readonly={this.readonly}
					disabled={this.disabled}
					name={this.name}
					data-sap-no-tab-ref
				/>
			</div>

			{this.text &&
				<Label id={`${this._id}-label`} class="ui5-radio-label" for={this._id} wrappingType={this.wrappingType}>{this.text}</Label>
			}

			{this.hasValueState &&
				<span id={`${this._id}-descr`} class="ui5-hidden-text">{this.valueStateText}</span>
			}
		</div>
	);
}
