import { Device } from "@ui5/webcomponents-base";

import type CheckBox from "./CheckBox.js";
import Label from "./Label.js";
import Icon from "./Icon.js";
import accept from "@ui5/webcomponents-icons/dist/accept.js";
import complete from "@ui5/webcomponents-icons/dist/complete.js";
import border from "@ui5/webcomponents-icons/dist/border.js";
import triState from "@ui5/webcomponents-icons/dist/tri-state.js";

export default function CheckBoxTemplate(this: CheckBox) {
	return (
		<div
			class={{
				"ui5-checkbox-root": true,
				"ui5-checkbox--hoverable": !this.disabled && !this.readonly && Device.isDesktop(),
			}}
			role={this.accInfo.role}
			part="root"
			aria-checked={this.accInfo.ariaChecked}
			aria-readonly={this.accInfo.ariaReadonly}
			aria-disabled={this.accInfo.ariaDisabled}
			aria-label={this.ariaLabelText}
			aria-labelledby={this.ariaLabelledBy}
			aria-describedby={this.ariaDescribedBy}
			aria-required={this.accInfo.ariaRequired}
			tabindex={this.accInfo.tabindex}
			onMouseDown={this._onmousedown}
			onMouseUp={this._onmouseup}
			onKeyDown={this._onkeydown}
			onKeyUp={this._onkeyup}
			onClick={this._onclick}
			onFocusOut={this._onfocusout}
		>

			{this.isDisplayOnly ?
				<div class="ui5-checkbox-display-only-icon-inner">
					<Icon aria-hidden="true" name={displayOnlyIcon.call(this)} class="ui5-checkbox-display-only-icon" part="icon"/>
				</div>
				:
				<div id={`${this._id}-CbBg`} class="ui5-checkbox-inner">
					{this.isCompletelyChecked &&
					<Icon aria-hidden="true" name={accept} class="ui5-checkbox-icon" part="icon"/>
					}
				</div>
			}

			{this.accInfo.role === "checkbox" &&
			<input
				id={`${this._id}-CB`}
				type="checkbox"
				checked={this.checked}
				value={this.value}
				readonly={this.readonly}
				disabled={this.disabled}
				tabindex={-1}
				aria-hidden="true"
				data-sap-no-tab-ref
			/>
			}

			{this.text &&
			<Label
				id={`${this._id}-label`}
				part="label"
				class="ui5-checkbox-label"
				wrappingType={this.wrappingType}
				required={this.required}
			>
				{this.text}
			</Label>
			}

			{this.hasValueState &&
			<span id={`${this._id}-descr`} class="ui5-hidden-text">{this.valueStateText}</span>
			}
		</div>
	);
}

function displayOnlyIcon(this: CheckBox) {
	if (this.isCompletelyChecked) {
		return complete;
	}
	if (this.checked && this.indeterminate) {
		return triState;
	}
	return border;
}
