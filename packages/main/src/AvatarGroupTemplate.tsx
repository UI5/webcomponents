import type AvatarGroup from "./AvatarGroup.js";
import Button from "./Button.js";
import AvatarSize from "./types/AvatarSize.js";

export default function AvatarGroupTemplate(this: AvatarGroup) {
	return (
		<div class="ui5-avatar-group-root">
			<div
				class="ui5-avatar-group-items"
				role={this._role}
				tabindex={this._groupTabIndex}
				aria-label={this._ariaLabelText}
				aria-haspopup={this._containerAriaHasPopup}
				onClick={this._onClick}
				onKeyUp={this._onkeyup}
				onKeyDown={this._onkeydown}
				onFocusIn={this._onfocusin}
			>
				<slot onClick={this.onAvatarClick} onui5-click={this.onAvatarUI5Click}></slot>

				{this._customOverflowButton ?
					// @ts-expect-error
					<slot onClick={this.onOverflowButtonClick} name="overflowButton"></slot>
					:
					<Button
						onClick={this.onOverflowButtonClick}
						accessibilityAttributes={this._overflowButtonAccAttributes}
						accessibleName={this._overflowButtonAriaLabelText}
						hidden={this._overflowBtnHidden}
						nonInteractive={this._isGroup}
						class={{
							"ui5-avatar-group-overflow-btn": true,
							"ui5-avatar-group-overflow-btn-xs": this.firstAvatarSize === AvatarSize.XS,
							"ui5-avatar-group-overflow-btn-s": this.firstAvatarSize === AvatarSize.S,
							"ui5-avatar-group-overflow-btn-m": this.firstAvatarSize === AvatarSize.M,
							"ui5-avatar-group-overflow-btn-l": this.firstAvatarSize === AvatarSize.L,
							"ui5-avatar-group-overflow-btn-xl": this.firstAvatarSize === AvatarSize.XL,
						}}
					>
						{this._overflowButtonText}
					</Button>
				}
			</div>
		</div>
	);
}
