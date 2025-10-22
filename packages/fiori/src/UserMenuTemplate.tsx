import type UserMenu from "./UserMenu.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Tag from "@ui5/webcomponents/dist/Tag.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Text from "@ui5/webcomponents/dist/Text.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemCustom from "@ui5/webcomponents/dist/ListItemCustom.js";
import Panel from "@ui5/webcomponents/dist/Panel.js";
import Bar from "@ui5/webcomponents/dist/Bar.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import edit from "@ui5/webcomponents-icons/dist/edit.js";
import personPlaceholder from "@ui5/webcomponents-icons/dist/person-placeholder.js";
import userSettings from "@ui5/webcomponents-icons/dist/user-settings.js";
import log from "@ui5/webcomponents-icons/dist/log.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import userEdit from "@ui5/webcomponents-icons/dist/user-edit.js";
import selectedAccount from "@ui5/webcomponents-icons/dist/sys-enter-2.js";

export default function UserMenuTemplate(this: UserMenu) {
	return (
		<ResponsivePopover
			id="user-menu-rp"
			class="ui5-user-menu-rp"
			placement="Bottom"
			verticalAlign="Bottom"
			horizontalAlign="End"
			tabindex={-1}
			accessibleName={this.accessibleNameText}
			aria-labelledby={this.accessibleNameText}
			open={this.open}
			opener={this.opener}
			onClose={this._handlePopoverAfterClose}
			onOpen={this._handlePopoverAfterOpen}
			onScroll={this._handleScroll}
		>
			<>
				<Bar class={{
					"ui5-user-menu-fixed-header": true,
					"ui5-user-menu-rp-scrolled": this._isScrolled || this._titleMovedToHeader
				}} slot="header">
					{this._titleMovedToHeader &&
						<Title
							level="H1"
							wrappingType="None"
						>
							{this._selectedAccount.titleText}
						</Title>
					}

					{this._isPhone && <Button
						icon={decline}
						design="Transparent"
						accessibleName={this._closeDialogAriaLabel}
						onClick={this._closeUserMenu}
						slot="endContent"
					 />}
				</Bar>

				<div class="ui5-user-menu-header">
					{headerContent.call(this)}
				</div>
			</>

			{this.showOtherAccounts &&
				<>
					{otherAccountsContent.call(this)}
				</>
			}

			{this.menuItems.length > 0 &&
					<List
						id="ui5-user-menu-list"
						class="ui5-user-menu-list"
						selectionMode="None"
						separators="None"
						accessibleRole="Menu"
						onItemClick={this._handleMenuItemClick}
						onui5-close-menu={this._handleMenuItemClose}
					>
						<slot></slot>
					</List>
			}

			<div slot="footer" class="ui5-user-menu-footer">
				<Button class="ui5-user-menu-sign-out-btn" design="Transparent" icon={log} onClick={this._handleSignOutClick}>{this._signOutButtonText}</Button>
			</div>
		</ResponsivePopover>
	);
}

function headerContent(this: UserMenu) {
	return (<>
		{this._selectedAccount &&
			<div class="ui5-user-menu-selected-account" aria-labelledby={this._ariaLabelledByAccountInformationText}>
				<Avatar size="L" onClick={this._handleAvatarClick} initials={this._selectedAccount._initials} fallbackIcon={personPlaceholder} class="ui5-user-menu--selected-account-avatar" interactive>
					{this._selectedAccount.avatarSrc &&
						<img src={this._selectedAccount.avatarSrc}/>
					}
					{this.showEditButton &&
					<Tag slot="badge" wrappingType="None" design="Set1" colorScheme="5" title={this._editAvatarTooltip}>
						<Icon slot="icon" name={edit}></Icon>
					</Tag>
					}
				</Avatar>
				{this._selectedAccount.titleText &&
					<Text id="selected-account-title" class="ui5-user-menu-selected-account-title">{this._selectedAccount.titleText}</Text>
				}

				{this._selectedAccount.subtitleText &&
					<Text class="ui5-user-menu-selected-account-subtitleText">{this._selectedAccount.subtitleText}</Text>
				}
				{this._selectedAccount.description &&
					<Text class="ui5-user-menu-selected-account-description">{this._selectedAccount.description}</Text>
				}
				{this._selectedAccount.additionalInfo &&
					<Text class="ui5-user-menu-selected-account-additional-info">{this._selectedAccount.additionalInfo}</Text>
				}

				{this.showManageAccount &&
					<Button id="selected-account-manage-btn" icon={userSettings} class="ui5-user-menu-manage-account-btn" onClick={this._handleManageAccountClick}>{this._manageAccountButtonText}</Button>
				}
			</div>
		}
	</>);
}

function otherAccountsContent(this: UserMenu) {
	return (<>
		<Panel collapsed={true} class="ui5-user-menu-other-accounts" aria-labelledby={this._otherAccountsButtonText}>
			<div slot="header" class="ui5-user-menu-account-header">
				<Title slot="header" level="H4" wrapping-type="None">{this._otherAccountsButtonText} ({this._otherAccounts.length})</Title>
				{this.showEditAccounts &&
					<Button slot="header" class="ui5-user-menu-add-account-btn" design="Transparent" icon={userEdit} onClick={this._handleEditAccountsClick} tooltip={this._editAccountsTooltip}/>
				}
			</div>
			{this._otherAccounts.length > 0 &&
				<>
					{otherAccountsList.call(this)}
				</>
			}
		</Panel>
	</>);
}

function otherAccountsList(this: UserMenu) {
	return (<>
		<List onItemClick={this._handleAccountSwitch} aria-labelledby={this._ariaLabelledByActions} loadingDelay={0}
			  loading={this._otherAccounts.some(account => account.loading === true)}>
			{this._otherAccounts.map((account, index) =>
				<ListItemCustom
					ref={this.captureRef.bind(account)}
					aria-labelledby={account.titleText}
					aria-possition={index + 1}
					aria-setsize={this._otherAccounts.length}
					aria-dectiption={this.getAccountDescriptionText(account)}
				>
					<div class="ui5-user-menu-other-accounts-content">
						<Avatar slot="image" size="S" initials={account._initials} fallbackIcon={personPlaceholder}>
							{account.avatarSrc &&
								<img src={account.avatarSrc}/>
							}
						</Avatar>
						<div class="ui5-user-menu-other-accounts-info">
							{account.titleText &&
								<Title class="ui5-user-menu-other-accounts-title">{account.titleText}</Title>
							}
							{account.subtitleText &&
								<Label class="ui5-user-menu-other-accounts-additional-info">{account.subtitleText}</Label>
							}
							{account.description &&
								<Label class="ui5-user-menu-other-accounts-additional-info">{account.description}</Label>
							}
						</div>
						<div>
							{account.selected &&
								<Icon
									part="icon"
									name={selectedAccount}
									class="ui5-user-menu-selected-account-icon"
									mode="Decorative" />
							}
						</div>

					</div>
				</ListItemCustom>
			)}
		</List>
	</>);
}
