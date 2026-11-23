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
			data-ui5-has-tooltip={this.tooltip ? `${this._id}-tooltip` : undefined}
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
			// Review (double-announcement): Link already announces the tooltip text
			// via `aria-description={this.ariaDescriptionText}` (guarded by
			// `ariaLabelText !== tooltip` in Link.ts), so no `aria-describedby` here.
			// Tooltip is visual only; `data-ui5-has-tooltip` drives the gesture.
			<Tooltip id={`${this._id}-tooltip`}>{this.tooltip}</Tooltip>
		}
		</>);
}
