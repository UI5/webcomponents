import type TabularInput from "./TabularInput.js";

import Icon from "./Icon.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";

import TabularInputPopoverTemplate from "./TabularInputPopoverTemplate.js";

export default function TabularInputTemplate(this: TabularInput) {
	return (
		<>
			<div
				class="ui5-input-root ui5-input-focusable-element"
				part="root"
				onFocusIn={this._onfocusin}
				onFocusOut={this._onfocusout}
			>
				<div class="ui5-input-content">
					<input
						id="inner"
						part="input"
						class="ui5-input-inner"
						style={this.styles.innerInput}
						type={this.inputNativeType}
						inner-input
						inner-input-with-icon={this.iconsCount > 0}
						disabled={this.disabled}
						readonly={this._readonly}
						value={this.value}
						required={this.required}
						placeholder={this._placeholder}
						maxlength={this.maxlength}
						role={this.accInfo.role}
						enterkeyhint={this.hint}
						aria-controls={this.accInfo.ariaControls}
						aria-invalid={this.accInfo.ariaInvalid}
						aria-haspopup="listbox"
						aria-describedby={this.accInfo.ariaDescribedBy}
						aria-roledescription={this.accInfo.ariaRoledescription}
						aria-autocomplete="list"
						aria-expanded={this.open}
						aria-label={this.accInfo.ariaLabel}
						aria-required={this.required}
						aria-activedescendant={this._activeDescendantId}
						autocomplete="off"
						data-sap-focus-ref
						step={this.nativeInputAttributes.step}
						min={this.nativeInputAttributes.min}
						max={this.nativeInputAttributes.max}
						onInput={this._handleNativeInput}
						onChange={this._handleChange}
						onSelect={this._handleSelect}
						onKeyDown={this._onkeydown}
						onKeyUp={this._onkeyup}
						onClick={this._click}
						onFocusIn={this.innerFocusIn}
					/>

					{this._effectiveShowClearIcon &&
						<div
							tabindex={-1}
							class="ui5-input-clear-icon-wrapper inputIcon"
							part="clear-icon-wrapper"
							onClick={this._clear}
							onMouseDown={this._iconMouseDown}
						>
							<Icon
								part="clear-icon"
								class="ui5-input-clear-icon"
								name={decline}
								tabindex={-1}
								accessibleName={this.clearIconAccessibleName}>
							</Icon>
						</div>
					}

					{this.icon.length > 0 &&
						<div class="ui5-input-icon-root" tabindex={-1}>
							<slot name="icon"></slot>
						</div>
					}

					<div class="ui5-input-value-state-icon">
						{this._valueStateInputIcon}
					</div>

					{this._hasTabularSuggestions &&
						<>
							<span id="suggestionsText" class="ui5-hidden-text">{this._tabularSuggestionsAccessibleName}</span>
							<span id="selectionText" class="ui5-hidden-text" aria-live="polite" role="status"></span>
							<span id="suggestionsCount" class="ui5-hidden-text" aria-live="polite">
								{this._tabularSuggestionsCountText}
							</span>
						</>
					}

					{this.hasValueState &&
						<span id="valueStateDesc" class="ui5-hidden-text">{this.ariaValueStateHiddenText}</span>
					}
				</div>
			</div>

			{this._useTabularSuggestions && TabularInputPopoverTemplate.call(this)}
		</>
	);
}
