import type Link from "./Link.js";
import Icon from "./Icon.js";
import Tooltip from "./Tooltip.js";

export default function LinkTemplate(this: Link) {
	return (
		<>
		<a
			id={`${this._id}-root`}
			part="root"
			class="ui5-link-root"
			role={this.effectiveAccRole}
			href={this.parsedRef}
			target={this.target}
			rel={this._rel}
			tabindex={this.effectiveTabIndex}
			aria-disabled={this.disabled}
			aria-label={this.ariaLabelText}
			aria-haspopup={this._hasPopup}
			aria-expanded={this.accessibilityAttributes.expanded}
			aria-current={this.accessibilityAttributes.current}
			aria-description={this.ariaDescriptionText}
			onClick={this._onclick}
			onKeyDown={this._onkeydown}
			onKeyUp={this._onkeyup}
		>
			{this.icon &&
			<Icon
				class="ui5-link-icon"
				name={this.icon}
				mode="Decorative"
				part="icon">
			</Icon>
			}

			<span class="ui5-link-text">
				<slot></slot>
			</span>

			{ this.hasLinkType &&
			<span class="ui5-hidden-text">{this.linkTypeText}</span>
			}

			{this.endIcon &&
			<Icon
				class="ui5-link-end-icon"
				name={this.endIcon}
				mode="Decorative"
				part="endIcon"
			/>
			}
		</a>
		{ this.tooltip &&
			<Tooltip text={this.tooltip} opener={`${this._id}-root`} />
		}
		</>);
}
