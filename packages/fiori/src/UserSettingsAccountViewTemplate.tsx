import type UserSettingsAccountView from "./UserSettingsAccountView.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import Tag from "@ui5/webcomponents/dist/Tag.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Text from "@ui5/webcomponents/dist/Text.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import personPlaceholder from "@ui5/webcomponents-icons/dist/person-placeholder.js";
import edit from "@ui5/webcomponents-icons/dist/edit.js";
import userSettings from "@ui5/webcomponents-icons/dist/user-settings.js";

export default function UserSettingsAccountViewTemplate(this: UserSettingsAccountView) {
	return (
		<div class="ui5-user-settings-view-container">
			<div class="ui5-user-settings-view ui5-user-settings-account-view">
				<div class="ui5-user-settings-account">
					<Avatar size="XL" onClick={this._handleEditAvatarClick} initials={this._account?._initials}
					        fallbackIcon={personPlaceholder} class="ui5-user-settings-account-avatar" interactive>
						{this._account?.avatarSrc &&
                            <img src={this._account.avatarSrc}/>
						}
						<Tag slot="badge" wrappingType="None" design="Set1" colorScheme="5"
						     title={this._editAvatarTooltip}>
							<Icon slot="icon" name={edit}></Icon>
						</Tag>

					</Avatar>
					{this._account?.titleText &&
                        <Text id="account-title" class="ui5-user-settings-account-title">{this._account.titleText}</Text>
					}

					{this._account?.subtitleText &&
                        <Text class="ui5-user-settings-account-subtitleText">{this._account.subtitleText}</Text>
					}
					{this._account?.description &&
                        <Text class="ui5-user-settings-account-description">{this._account.description}</Text>
					}
					{this.showManageAccount &&
						<Button id="account-manage-btn" icon={userSettings} class="ui5-user-settings-account-btn"
							onClick={this._handleManageAccountClick}>{this._manageAccountButtonText}</Button>
					}
				</div>
				<slot></slot>
			</div>
		</div>
	);
}
