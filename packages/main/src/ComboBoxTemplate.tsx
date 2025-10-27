import type ComboBox from "./ComboBox.js";
import Icon from "./Icon.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import slimArrowDown from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import ComboBoxPopoverTemplate from "./ComboBoxPopoverTemplate.js";

export default function ComboBoxTemplate(this: ComboBox) {
	return (
		<>
			<div class="ui5-combobox-root ui5-input-focusable-element">
				{this.hasValueState &&
				<span id="value-state-description" class="ui5-hidden-text">{this.ariaValueStateHiddenText}</span>
				}
				{this.linksInAriaValueStateHiddenText.length > 0 &&
						<span id="hiddenText-value-state-link-shortcut" class="ui5-hidden-text">{this.valueStateLinksShortcutsTextAcc}</span>
				}

				<input id="ui5-combobox-input"
					value={this.value}
					inner-input
					placeholder={this.placeholder}
					disabled={this.disabled}
					readonly={this.readonly}
					// check this value-state
					value-state={this.valueState}
					onKeyDown={this._keydown}
					onInput={this._input}
					onChange={this._inputChange}
					onClick={this._click}
					onKeyUp={this._keyup}
					onFocusIn={this._focusin}
					onFocusOut={this._focusout}
					aria-expanded={this.open}
					role="combobox"
					aria-haspopup="dialog"
					aria-autocomplete="both"
					aria-describedby={this.ariaDescribedByText}
					aria-label={this.ariaLabelText}
					aria-required={this.required}
					aria-controls={this.responsivePopoverId}
					autocomplete="off"
					data-sap-focus-ref
				/>

				{this._effectiveShowClearIcon &&
				<div onClick={this._clear} class="ui5-input-clear-icon-wrapper inputIcon" tabindex={-1}>
					<Icon tabindex={-1} class="ui5-input-clear-icon" name={decline} accessibleName={this.clearIconAccessibleName}/>
				</div>
				}

				{this.icon &&
				<slot name="icon"></slot>
				}

				{!this.readonly &&
				<Icon
					slot="icon"
					name={slimArrowDown}
					tabindex={-1}
					class={{
						"inputIcon": true,
						"inputIcon--pressed": this._iconPressed,
					}}
					accessibleName={this._iconAccessibleNameText}
					onClick={this._arrowClick}
				/>
				}
			</div>

			{ ComboBoxPopoverTemplate.call(this) }
		</>
	);
}
