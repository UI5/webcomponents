import type MessageStrip from "./MessageStrip.js";
import MessageStripDesign from "./types/MessageStripDesign.js";
import Button from "./Button.js";
import Icon from "./Icon.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import information from "@ui5/webcomponents-icons/dist/information.js";
import sysEnter2 from "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import error from "@ui5/webcomponents-icons/dist/error.js";
import alert from "@ui5/webcomponents-icons/dist/alert.js";

export default function MessageStripTemplate(this: MessageStrip) {
	return (
		<div
			id={this._id}
			class={{
				"ui5-message-strip-root": true,
				"ui5-message-strip-root-hide-icon": this.shouldHideIcon,
				"ui5-message-strip-root-hide-close-button": this.hideCloseButton,
				[this.designClasses]: true,
			}}
			role="note"
			aria-labelledby="hidden-text content-text"
		>

			{!this.shouldHideIcon &&
				<div class="ui5-message-strip-icon-wrapper" aria-hidden="true">
					{this.iconProvided ?
						<slot name="icon"></slot>
						:
						<Icon name={standardIconName.call(this)} class="ui5-message-strip-icon"/>
					}
				</div>
			}

			<span class="ui5-hidden-text" id="hidden-text">{this.hiddenText}</span>
			<span class="ui5-message-strip-text" id="content-text"><slot></slot></span>

			{!this.hideCloseButton &&
				<Button
					icon={decline}
					design="Transparent"
					class="ui5-message-strip-close-button"
					tooltip={this._closeButtonText}
					accessibleName={this._closeButtonText}
					onClick={this._closeClick}
				/>
			}
		</div>
	);
}

function standardIconName(this: MessageStrip) {
	switch (this.design) {
	case MessageStripDesign.Critical:
		return alert;
	case MessageStripDesign.Positive:
		return sysEnter2;
	case MessageStripDesign.Negative:
		return error;
	case MessageStripDesign.Information:
		return information;
	default:
		return undefined;
	}
}
