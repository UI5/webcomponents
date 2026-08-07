import type InputField from "./InputField.js";
import type { JsxTemplateResult } from "@ui5/webcomponents-base/dist/index.js";
import Icon from "./Icon.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import error from "@ui5/webcomponents-icons/dist/error.js";
import alert from "@ui5/webcomponents-icons/dist/alert.js";
import sysEnter2 from "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import information from "@ui5/webcomponents-icons/dist/information.js";

import PopoverHorizontalAlign from "./types/PopoverHorizontalAlign.js";
import Popover from "./Popover.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";

type TemplateHook = () => JsxTemplateResult;

export default function InputFieldTemplate(this: InputField, hooks?: {
	preContent?: TemplateHook,
	postContent?: TemplateHook,
	popoverTemplate?: TemplateHook
}) {
	const preContent = hooks?.preContent || defaultPreContent;
	const postContent = hooks?.postContent || defaultPostContent;
	const popoverTemplate = hooks?.popoverTemplate;

	return (
		<>
			<div
				class="ui5-input-root ui5-input-focusable-element"
				part="root"
				onFocusIn={this._onfocusin}
				onFocusOut={this._onfocusout}
			>
				<div class="ui5-input-content">
					{ preContent.call(this) }

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
						aria-haspopup={this.accInfo.ariaHasPopup}
						aria-describedby={this.accInfo.ariaDescribedBy}
						aria-roledescription={this.accInfo.ariaRoledescription}
						aria-autocomplete={this.accInfo.ariaAutoComplete}
						aria-expanded={this.accInfo.ariaExpanded}
						aria-label={this.accInfo.ariaLabel}
						aria-required={this.required}
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
						<div class="ui5-input-icon-root"
							tabindex={-1}
						>
							<slot name="icon"></slot>
						</div>
					}

					<div class="ui5-input-value-state-icon">
						{this._valueStateInputIcon}
					</div>

					{ postContent.call(this) }

					{this.accInfo.ariaDescription &&
						<span id="descr" class="ui5-hidden-text">{this.accInfo.ariaDescription}</span>
					}

					{this.accInfo.accessibleDescription &&
						<span id="accessibleDescription" class="ui5-hidden-text">{this.accInfo.accessibleDescription}</span>
					}

					{this.linksInAriaValueStateHiddenText.length > 0 &&
						<span id="hiddenText-value-state-link-shortcut" class="ui5-hidden-text">{this.valueStateLinksShortcutsTextAcc}</span>
					}

					{this.hasValueState &&
						<span id="valueStateDesc" class="ui5-hidden-text">{this.ariaValueStateHiddenText}</span>
					}
				</div>
			</div>

			{ popoverTemplate ? popoverTemplate.call(this) : ValueStatePopover.call(this) }
		</>
	);
}

function defaultPreContent() {}

function defaultPostContent() {}

function ValueStatePopover(this: InputField) {
	return (
		<>
			{this.hasValueStateMessage && (
				<Popover
					preventInitialFocus={true}
					preventFocusRestore={true}
					hideArrow={true}
					class="ui5-valuestatemessage-popover"
					placement="Bottom"
					tabindex={-1}
					horizontalAlign={PopoverHorizontalAlign.Start}
					opener={this}
					open={this.valueStateOpen}
					onClose={this._handleValueStatePopoverAfterClose}
				>
					<div slot="header" class={this.classes.popoverValueState}>
						<Icon class="ui5-input-value-state-message-icon" name={valueStateMessageInputIcon.call(this)} />
						{this.valueStateOpen && valueStateMessage.call(this)}
					</div>
				</Popover>
			)}
		</>
	);
}

function valueStateMessage(this: InputField) {
	return (
		<>
			{
				this.shouldDisplayDefaultValueStateMessage ? this.valueStateText : <slot name="valueStateMessage"></slot>
			}
		</>
	);
}

function valueStateMessageInputIcon(this: InputField) {
	const iconPerValueState = {
		Negative: error,
		Critical: alert,
		Positive: sysEnter2,
		Information: information,
	};

	return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
}

export { valueStateMessage, valueStateMessageInputIcon, ValueStatePopover };
