import Icon from "./Icon.js";
import { isDesktop, isSafari } from "@ui5/webcomponents-base/dist/Device.js";
import type Switch from "./Switch.js";
import acceptIcon from "@ui5/webcomponents-icons/dist/accept.js";
import declineIcon from "@ui5/webcomponents-icons/dist/decline.js";

export default function SwitchTemplate(this: Switch) {
	return (
		<div
			class={{
				"ui5-switch-root": true,
				"ui5-switch--desktop": isDesktop(),
				"ui5-switch--disabled": this.disabled,
				"ui5-switch--checked": this.checked,
				"ui5-switch--semantic": this.graphical,
				"ui5-switch--no-label": !(this.graphical || this.textOn || this.textOff),
				"ui5-switch--safari": isSafari(),
			}}
			role="switch"
			aria-label={this.ariaLabelText}
			aria-checked={this.checked}
			aria-disabled={this.effectiveAriaDisabled}
			aria-readonly={this.effectiveAriaReadonly}
			aria-required={this.required}
			onClick={this._onclick}
			onKeyUp={this._onkeyup}
			onKeyDown={this._onkeydown}
			onFocusIn={this._onfocusin}
			tabindex={this.effectiveTabIndex}
			title={this.tooltip}
		>
			<div class="ui5-switch-inner">
				<div class="ui5-switch-track" part="slider">
					<div class="ui5-switch-slider">
						{this.graphical ?
							<>
								<span class="ui5-switch-text ui5-switch-text--on">
									<Icon name={acceptIcon} class="ui5-switch-icon-on"/>
								</span>
								<span class="ui5-switch-text ui5-switch-text--off">
									<Icon name={declineIcon} class="ui5-switch-icon-off"/>
								</span>
							</>
							:
							<>
								{this.hasNoLabel ?
									<>
										<span class="ui5-switch-text ui5-switch-text--on ui5-switch-no-label-icon" part="text-on">
											<Icon name={this.sapNextIcon} class="ui5-switch-no-label-icon-on" />
										</span>
										<span class="ui5-switch-text ui5-switch-text--off ui5-switch-no-label-icon" part="text-off">
											<Icon name={this.sapNextIcon} class="ui5-switch-no-label-icon-off" />
										</span>
									</>
									:
									<>
										<span class="ui5-switch-text ui5-switch-text--on" part="text-on">{this._textOn}</span>
										<span class="ui5-switch-text ui5-switch-text--off" part="text-off">{this._textOff}</span>
									</>
								}
							</>
						}

						<span class="ui5-switch-handle" part="handle"></span>
					</div>
				</div>
			</div>
			<input type='checkbox' checked={this.checked} class="ui5-switch-input" data-sap-no-tab-ref/>
		</div>);
}
