import type CardHeader from "./CardHeader.js";
import { isFirefox } from "@ui5/webcomponents-base/dist/Device.js";

export default function CardHeaderTemplate(this: CardHeader) {
	return (
		<div
			id={`${this._id}--header`}
			class={{
				"ui5-card-header": true,
				"ui5-card-header--interactive": this.interactive,
				"ui5-card-header--active": this.interactive && this._headerActive,
				"ui5-card-header-ff": isFirefox(),
			}}
			part="root"
			onClick={this._click}
			onKeyDown={this._keydown}
			onKeyUp={this._keyup}
		>
			<div
				class="ui5-card-header-focusable-element"
				aria-labelledby={this.ariaLabelledBy}
				aria-roledescription={this.ariaRoleDescription}
				role={this.ariaRoleFocusableElement}
				data-sap-focus-ref
				tabindex={0}
			>
				{this.hasAvatar &&
					<div id={`${this._id}-avatar`} class="ui5-card-header-avatar" aria-label={this.ariaCardAvatarLabel}>
						<slot name="avatar"></slot>
					</div>
				}

				<div class="ui5-card-header-text">
					{this.titleText &&
						<div
							id={`${this._id}-title`}
							class="ui5-card-header-title"
							part="title"
							role="heading"
							aria-level={3}
						>{this.titleText}</div>
					}

					{this.subtitleText &&
						<div id={`${this._id}-subtitle`} class="ui5-card-header-subtitle" part="subtitle">{this.subtitleText}</div>
					}
				</div>
			</div>

			{(this.hasAction || this.additionalText) &&
				<div
					class="ui5-card-header-action-and-additional-text"
					onFocusIn={this._actionsFocusin}
					onFocusOut={this._actionsFocusout}
				>
					{this.hasAction &&
						<slot name="action"></slot>
					}
					{this.additionalText &&
						<div class="ui5-card-header-additionalText">
							<span id={`${this._id}-additionalText`} part="additional-text" dir="auto">{this.additionalText}</span>
						</div>
					}
				</div>
			}
		</div>
	);
}
