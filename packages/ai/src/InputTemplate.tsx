import type Input from "./Input.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import MenuItem from "@ui5/webcomponents/dist/MenuItem.js";
import MenuSeparator from "@ui5/webcomponents/dist/MenuSeparator.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Menu from "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents-icons/dist/navigation-left-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import type { JsxTemplateResult } from "@ui5/webcomponents-base";

type TemplateHook = () => JsxTemplateResult;

export default function InputTemplate(this: Input, hooks?: { preContent: TemplateHook, postContent: TemplateHook }) {
	const preContent = hooks?.preContent || defaultPreContent;
	const postContent = hooks?.postContent || defaultPostContent;
	return (
		<>
			<div
				class={`ui5-ai-input-root ui5-input-focusable-element ${this.loading && "ui5-ai-input-busy"}`}
				onFocusIn={this._onfocusin}
				onFocusOut={this._onfocusout}
			>
				<div class="ui5-input-content">
					<BusyIndicator
						id={`${this._id}-busyIndicator`}
						active={this.loading}
						class="ui5-input-busy-indicator"
					>

						<div
							class="ui5-input-root"
							part="root"
						>
							<div class="ui5-input-content">
								{preContent.call(this)}

								<input
									id="inner"
									part="input"
									class="ui5-input-inner"
									style={this.styles.innerInput}
									type={this.inputNativeType}
									inner-input
									inner-input-with-icon={!!this.icon.length}
									disabled={this.disabled}
									readonly={this._readonly || this.loading}
									value={this._innerValue}
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
									aria-label={this.ariaLabel}
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
										part="clear-icon-wrapper"
										class="ui5-input-clear-icon-wrapper inputIcon"
										onClick={this._clear}
										onMouseDown={this._iconMouseDown}
									>
										<Icon
											part="clear-icon"
											class="ui5-input-clear-icon"
											name={"decline"}
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

					</BusyIndicator>
					<Button
						id="ai-menu-btn"
						hidden={(!this.isFocused && !this.loading) || !this.hasActions || this.readonly}
						tabIndex={-1}
						class={`ui5-input-ai-button ui5-ai-input-button-wrapper ${this._isMenuOpen && "ui5-input-button-menu-open"} ${this.loading && "ui5-ai-input-loading"}`}
						design="Transparent"
						icon={this.loading ? "stop" : "ai"}
						onClick={this._handleAIButtonClick}
						onKeyDown={this._handleAIButtonKeydown}
						aria-keyshortcuts={ this.loading ? "Esc" : "Shift + F4" }
						tooltip={this.loading ? this.stopGeneratingTooltip : this.ariaLabel}
						accessibilityAttributes={{ hasPopup: this.loading ? "false" : "menu" }}
					/>
					<Menu
						onItemClick={this._onMenuIconClick}
						onBeforeOpen={() => { this._isMenuOpen = true; }}
						onBeforeClose={() => { this._isMenuOpen = false; }}
						onClose={() => { if (!this.loading) { this.focus(); } }}
					>
						<slot name="actions"></slot>
						{this.totalVersions > 1 && Versioning.call(this)}
					</Menu>
				</div>
			</div>
		</>
	);
}

function Versioning(this: Input) {
	return (
		<>
			<MenuSeparator />
			<MenuItem
				type="Inactive"
				class="ui5-ai-versioning-menu-footer"
				text={`${this.currentVersion} / ${this.totalVersions}`}
			>
				<Button
					id="arrow-left"
					class="versioning-button"
					slot="endContent"
					design="Transparent"
					icon="navigation-left-arrow"
					tooltip={this.previousButtonAccessibleName}
					accessibleName={this.previousButtonAccessibleName}
					aria-keyshortcut="Shift+Ctrl+Z"
					disabled={this.currentVersion <= 1}
					onClick={this._handlePreviousButtonClick}
					data-ui5-versioning-button="previous"
				>
				</Button>
				<Button
					id="arrow-right"
					class="versioning-button"
					slot="endContent"
					design="Transparent"
					icon="navigation-right-arrow"
					tooltip={this.nextButtonAccessibleName}
					accessibleName={this.nextButtonAccessibleName}
					aria-keyshortcut="Shift+Ctrl+Y"
					disabled={this.currentVersion >= this.totalVersions}
					onClick={this._handleNextButtonClick}
					data-ui5-versioning-button="next"
				/>
			</MenuItem>
		</>
	);
}

function defaultPreContent() { }

function defaultPostContent() {}
