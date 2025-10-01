import type AIInput from "./AIInput.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Versioning from "./Versioning.js";
import MenuItem from "@ui5/webcomponents/src/MenuItem.js";
import Button from "@ui5/webcomponents/dist/Button.js";
// import Button from "./Button.js";
import ButtonState from "./ButtonState.js";
import Menu from "@ui5/webcomponents/src/Menu.js";
import "@ui5/webcomponents-icons/dist/navigation-left-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import MenuSeparator from "@ui5/webcomponents/src/MenuSeparator.js";
import MenuItemTemplate from "@ui5/webcomponents/src/MenuItemTemplate.js";
import InputPopoverTemplate from "@ui5/webcomponents/src/InputPopoverTemplate.js";
import type {JsxTemplateResult}  from "@ui5/webcomponents-base";
import InputTemplate from "@ui5/webcomponents/src/InputTemplate.js";

type TemplateHook = () => JsxTemplateResult;

export default function AIInputTemplate(this: AIInput, hooks?: { preContent: TemplateHook, postContent: TemplateHook, suggestionsList?: TemplateHook }) {
    const suggestionsList = hooks?.suggestionsList;
	const preContent = hooks?.preContent || defaultPreContent;
	const postContent = hooks?.postContent || defaultPostContent;
    return (
        <>
        <div
        class="ui5-ai-input-root ui5-input-root ui5-input-focusable-element"
        // part="root"
        onFocusIn={this._onfocusin}
        onFocusOut={this._onfocusout}
        >
            <div class="ui5-input-content">
                <BusyIndicator
                    id={`${this._id}-busyIndicator`}
                    active={this.loading}
                    class="ui5-input-busy-indicator ui5-ai-input1-busy-indicator"
                    >
                        {/* {InputTemplate.call(this)} */}
                    {/* <input
                        id="inner"
                        part="input"
                        class="ui5-input-inner"
                        style={this.styles.innerInput}
                        type={this.inputNativeType}
                        inner-input
                        inner-input-with-icon={true}
                        disabled={this.disabled}
                        readonly={this._readonly}
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
                            name="decline"
                            tabindex={-1}
                            accessibleName={this.clearIconAccessibleName}>
                        </Icon>
                    </div>
                } */}


<div
				class="ui5-input-root"
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
						inner-input-with-icon={!!this.icon.length}
						disabled={this.disabled}
						readonly={this._readonly}
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
							// class=""
							part="clear-icon-wrapper"
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

					{/* { postContent.call(this) } */}

					{this._effectiveShowSuggestions &&
						<>
							<span id="suggestionsText" class="ui5-hidden-text">{this.suggestionsText}</span>
							<span id="selectionText" class="ui5-hidden-text" aria-live="polite" role="status"></span>
							<span id="suggestionsCount" class="ui5-hidden-text" aria-live="polite">{this.availableSuggestionsCount}</span>
						</>
					}

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
                {/* } */}
                {this.isFocused &&
                    <div class={`ui5-input-ai-icon ${this._isMenuOpen || this.loading ? "ui5-input-icon-menu-open" : ""}`} tabIndex={-1}>
                        <Icon
                            showTooltip={true}
                            accessibleName={this.iconAccName}
                            id="ai-menu-icon"
                            class={"ui5-ai-input-icon"}
                            name={this.loading ? "stop" : "ai"}
                            onClick={this._handleAIIconClick}
                            />

                            {/* <Button
                            tabIndex={-1}
                            tooltip={this.iconAccName}
                            id="ai-menu-icon"
                            class={"ui5-ai-input-icon"}
                            onMouseDown={(e) => e.preventDefault()}
                            icon={this.loading ? "stop" : "ai"}
                            onClick={this._handleAIIconClick}
                            >

                            </Button> */}

                    </div>
                }
                <div id="ai-menu-wrapper">
                    <Menu
                        onBeforeOpen={() => { this._isMenuOpen = true; }}
                        onBeforeClose={() => { this._isMenuOpen = false; }}
                        >
                        <slot name={"menuItems"}></slot>
                        {renderVersioning.call(this)}
                    </Menu>
                </div>
            </div>
        </div>
        { InputPopoverTemplate.call(this, { suggestionsList }) }
</>
    )
}



function renderVersioning(this: AIInput) {
    if (this.totalVersions <= 1 || !this._isMenuOpen) {
        return null;
    }

    return (
        <>
            <MenuSeparator />
            <MenuItem
                type="Inactive"
                class="ui5-ai-versioning-menu-footer"
                text={`${this.currentVersionIndex} / ${this.totalVersions}`}
            >
                    <Button
                        id="arrow-left"
                        slot="endContent"
                        design="Transparent"
                        icon="navigation-left-arrow"
                        aria-label="Previous version"
                        aria-keyshortcut="Shift+Ctrl+Z"
                        disabled={this.currentVersionIndex <= 1}
                        onClick= {this._handleArrowLeftClick}
                    >
                    </Button>
                    <Button
                        id="arrow-right"
                        slot="endContent"
                        design="Transparent"
                        icon="navigation-right-arrow"
                        aria-label="Next version"
                        aria-keyshortcut="Shift+Ctrl+Y"
                        disabled={this.currentVersionIndex >= this.totalVersions}
                        onClick= {this._handleArrowRightClick}
                    />
            </MenuItem>
        </>
    );
}

function defaultPreContent() {}

function defaultPostContent() {}