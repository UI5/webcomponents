import type Avatar from "./Avatar.js";
import Icon from "./Icon.js";

export default function AvatarTemplate(this: Avatar) {
	return (
		<div
			class="ui5-avatar-root"
			tabindex={this.tabindex}
			data-sap-focus-ref
			role={this._role}
			aria-haspopup={this._ariaHasPopup}
			aria-label={this.accessibleNameText}
			onKeyUp={this._onkeyup}
			onKeyDown={this._onkeydown}
			onClick={this._onclick}
		>
			{this._hasImage ?
				<slot></slot>
				: <>
					{this.icon && <Icon class="ui5-avatar-icon" name={this.icon} accessibleName={this.accessibleName}></Icon>}

					{this.initials ? (
						<>
							{/* Show initials + hidden fallback icon */}
							<span class="ui5-avatar-initials ui5-avatar-initials-hidden">{this.validInitials}</span>
							<Icon
								name={this.fallbackIcon}
								class="ui5-avatar-icon ui5-avatar-icon-fallback ui5-avatar-fallback-icon-hidden"
							></Icon>
						</>
					) : (
						// Show fallback icon only
						<Icon
							name={this.fallbackIcon}
							class="ui5-avatar-icon ui5-avatar-icon-fallback"
						></Icon>
					)}
				</>
			}

			<slot name="badge"></slot>
		</div>
	);
}
