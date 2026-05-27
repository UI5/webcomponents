import type TextArea from "./TextArea.js";
import TextAreaPopoverTemplate from "./TextAreaPopoverTemplate.js";

export default function TextAreaTemplate(this: TextArea) {
	return (
		<>
			<div
				class={this.classes.root}
				onFocusIn={this._onfocusin}
				onFocusOut={this._onfocusout}
			>
				<div class="ui5-textarea-wrapper">
					{this.growing &&
					<div id={`${this._id}-mirror`} class="ui5-textarea-mirror" aria-hidden="true">
						{this._mirrorText.map(mirrorText => {
							return (
								<>
									{mirrorText.text}
									<br />
								</>
							);
						})}
					</div>
					}
					<textarea
						id={`${this._id}-inner`}
						class="ui5-textarea-inner"
						part="textarea"
						placeholder={this.placeholder}
						disabled={this.disabled}
						readonly={this.readonly}
						aria-label={this.ariaLabelText}
						aria-describedby={this.ariaDescribedBy}
						aria-invalid={this._ariaInvalid}
						aria-required={this.required}
						maxlength={this._exceededTextProps.calcedMaxLength}
						value={this.value}
						data-sap-focus-ref
						onInput={this._oninput}
						onChange={this._onchange}
						onKeyUp={this._onkeyup}
						onKeyDown={this._onkeydown}
						onSelect={this._onselect}
						onScroll={this._onscroll}>
					</textarea>
				</div>

				{ afterTextarea.call(this) }

				{this.showExceededText &&
				<span class="ui5-textarea-exceeded-text">{this._exceededTextProps.exceededText}</span>
				}

				{this.ariaDescriptionText &&
				<span id="accessibleDescription" class="ui5-hidden-text">{this.ariaDescriptionText}</span>
				}

				{this.hasValueState &&
				<span id={`${this._id}-valueStateDesc`} class="ui5-hidden-text">{this.ariaValueStateHiddenText}</span>
				}
			</div>

			{TextAreaPopoverTemplate.call(this)}
		</>
	);
}

function afterTextarea(this: TextArea) {}
