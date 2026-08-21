import type PromptInput from "./PromptInput.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import paperPlane from "@ui5/webcomponents-icons/dist/paper-plane.js";

export default function PromptInputTemplate(this: PromptInput) {
	return (
		<div class="ai-prompt-input-wrapper">
			{this.label &&
				<Label for="input">{this.label}</Label>
			}

			<div class="ai-prompt-input-form-wrapper">
				<div class="ai-prompt-inner-input-wrapper">
					<Input
						id="input"
						value={this.value}
						placeholder={this.placeholder}
						valueState={this.valueState}
						showClearIcon={this.showClearIcon}
						disabled={this.disabled}
						readonly={this.readonly}
						showSuggestions={this.showSuggestions}
						onKeyDown={this._onkeydown}
						onInput={this._onInnerInput}
						onChange={this._onInnerChange}
						onTypeAhead={this._onTypeAhead}
						data-sap-focus-ref
					>
						<slot></slot>
						{this.valueStateMessage.length > 0 &&
							<slot name="valueStateMessage" slot="valueStateMessage"></slot>
						}
					</Input>

					{this.showExceededText &&
						<Label class="ai-prompt-input-counter">{this._exceededText}</Label>
					}
				</div>
				<Button
					icon={paperPlane}
					disabled={this._submitButtonDisabled}
					class="ai-prompt-input-button"
					design="Emphasized"
					onClick={this._onButtonClick}>
				</Button>
			</div>
		</div>);
}
