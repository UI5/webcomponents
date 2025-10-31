import type StepInput from "./StepInput.js";
import Icon from "./Icon.js";
import Input from "./Input.js";

import less from "@ui5/webcomponents-icons/dist/less.js";
import add from "@ui5/webcomponents-icons/dist/add.js";

export default function StepInputTemplate(this: StepInput) {
	return (
		<div
			id={`${this._id}`}
			class="ui5-step-input-root"
			onKeyDown={this._onkeydown}
			onFocusIn={this._onfocusin}
			onFocusOut={this._onfocusout}
			onWheel={this._onMouseWheel}
		>
			{/* Decrement Icon */}
			{!this.readonly &&
			<div
				class="ui5-step-icon ui5-step-dec"
				title={this.decIconTitle}
			>
				<Icon
					id={`${this._id}-dec`}
					name={less}
					tabindex={-1}
					accessibleName={this.decIconTitle}
					onClick={this._decValue}
					onFocusOut={this._onButtonFocusOut}
					onMouseDown={this._decSpin}
					onMouseUp={this._resetSpin}
					onMouseOut={this._resetSpinOut}
					class={{
						"inputIcon": true,
						"ui5-step-input-icon--clickable": this._decIconClickable,
					}}
					showTooltip={true}
				/>
			</div>
			}

			{/* INPUT */}
			<Input
				id={`${this._id}-inner`}
				data-sap-focus-ref
				class="ui5-step-input-input"
				placeholder={this.placeholder}
				type={this.type}
				value={this._displayValue}
				disabled={this.disabled}
				required={this.required}
				readonly={this.readonly}
				valueState={this.valueState}
				_inputAccInfo={this.accInfo}
				_nativeInputAttributes={this.inputAttributes}
				onChange={this._onInputChange}
				onFocusOut={this._onInputFocusOut}
				onFocusIn={this._onInputFocusIn}
				onInput={this._onInput}
			>
				{this.valueStateMessage.length > 0 &&
					<slot name="valueStateMessage" slot="valueStateMessage"></slot>
				}
			</Input>

			{/* Increment Icon */}
			{!this.readonly &&
				<div
					class="ui5-step-icon ui5-step-inc"
					title={this.incIconTitle}
				>
					<Icon
						id={`${this._id}-inc`}
						class={{
							"inputIcon": true,
							"ui5-step-input-icon--clickable": this._incIconClickable,
						}}
						name={add}
						tabindex={-1}
						accessibleName={this.incIconTitle}
						onClick={this._incValue}
						onFocusOut={this._onButtonFocusOut}
						onMouseDown={this._incSpin}
						onMouseUp={this._resetSpin}
						onMouseOut={this._resetSpinOut}
						showTooltip={true}
					/>
				</div>
			}
		</div>
	);
}
