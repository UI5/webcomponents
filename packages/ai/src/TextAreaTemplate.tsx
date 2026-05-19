import type TextArea from "./TextArea.js";
import WritingAssistant from "./WritingAssistant.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import TextAreaPopoverTemplate from "@ui5/webcomponents/dist/TextAreaPopoverTemplate.js";

export default function TextAreaTemplate(this: TextArea) {
	return (
		<div class="ui5-ai-textarea-root">
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
					<BusyIndicator
						id={`${this._id}-busyIndicator`}
						active={this.loading}
						class="ui5-textarea-busy-indicator"
					>
						<textarea
							id={`${this._id}-inner`}
							class="ui5-textarea-inner"
							part="textarea"
							placeholder={this.placeholder}
							disabled={this.disabled}
							readonly={this.readonly}
							aria-label={this._ariaLabel}
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
					</BusyIndicator>
					<div part="footer">
						<slot name="footer">
							<WritingAssistant
								loading={this.loading}
								currentVersion={this.currentVersion}
								totalVersions={this.totalVersions}
								promptDescription={this.promptDescription}
								focused={this.focused}
								onButtonClick={this._handleAIButtonClick}
								onStopGeneration={this.handleStopGeneration}
								onVersionChange={this._handleVersionChange}
							/>
						</slot>
					</div>
				</div>

				{this.showExceededText &&
				<span class="ui5-textarea-exceeded-text">{this._exceededTextProps.exceededText}</span>
				}

				{this.hasValueState &&
				<span id={`${this._id}-valueStateDesc`} class="ui5-hidden-text">{this.ariaValueStateHiddenText}</span>
				}
			</div>

			{TextAreaPopoverTemplate.call(this)}

			{/* ARIA live region for screen readers */}
			<div aria-live="polite" aria-atomic="true" class="ui5-hidden-text">
				{this.loading ? this.promptDescription : ""}
			</div>

			<div id="ai-menu-wrapper">
				<slot name="menu"></slot>
			</div>
		</div>
	);
}
