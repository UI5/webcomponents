import UI5Element, { customElement, slot, eventStrict as event, property, jsxRenderer, query, DOMReferenceConverter, i18n, Device } from "@ui5/webcomponents-base";
import type Title from "@ui5/webcomponents/dist/Title.js";
import type Button from "@ui5/webcomponents/dist/Button.js";
import type { ListItemClickEventDetail } from "@ui5/webcomponents/dist/List.js";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import type ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { PopupScrollEventDetail } from "@ui5/webcomponents/dist/Popup.js";
import { isInstanceOfMenuItem } from "@ui5/webcomponents/dist/MenuItem.js";
import type UserMenuAccount from "./UserMenuAccount.js";
import type UserMenuItem from "./UserMenuItem.js";
import UserMenuTemplate from "./UserMenuTemplate.js";
import UserMenuCss from "./generated/themes/UserMenu.css.js";

// Texts
import {
	USER_MENU_OTHER_ACCOUNT_BUTTON_TXT,
	USER_MENU_MANAGE_ACCOUNT_BUTTON_TXT,
	USER_MENU_SIGN_OUT_BUTTON_TXT,
	USER_MENU_POPOVER_ACCESSIBLE_NAME,
	USER_MENU_EDIT_AVATAR_TXT,
	USER_MENU_EDIT_ACCOUNTS_TXT,
	USER_MENU_CLOSE_DIALOG_BUTTON,
	USER_MENU_POPOVER_ACCESSIBLE_ACCOUNT_SELECTED_TXT,
	USER_MENU_CURRENT_INFORMATION_TXT,
	USER_MENU_ACTIONS_TXT,
} from "./generated/i18n/i18n-defaults.js";

const { isPhone } = Device;

type UserMenuItemClickEventDetail = {
	item: UserMenuItem;
}

type UserMenuOtherAccountClickEventDetail = {
	prevSelectedAccount: UserMenuAccount;
	selectedAccount: UserMenuAccount;
}

/**
 * @class
 * ### Overview
 *
 * The `ui5-user-menu` is an SAP Fiori specific web component that is used in `ui5-shellbar`
 * and allows the user to easily see information and settings for the current user and all other logged in accounts.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/UserMenu.js";`
 *
 * `import "@ui5/webcomponents-fiori/dist/UserMenuItem.js";` (for `ui5-user-menu-item`)
 *
 * @constructor
 * @extends UI5Element
 * @experimental
 * @public
 * @since 2.5.0
 */

@customElement({
	tag: "ui5-user-menu",
	languageAware: true,
	renderer: jsxRenderer,
	template: UserMenuTemplate,
	styles: [UserMenuCss],
})

/**
 * Fired when the account avatar is selected.
 * @public
 */
@event("avatar-click")

/**
 * Fired when the "Manage Account" button is selected.
 * @public
 */
@event("manage-account-click")

/**
 * Fired when the "Edit Accounts" button is selected.
 * @public
 */
@event("edit-accounts-click")

/**
 * Fired when the account is switched to a different one.
 * @param {UserMenuAccount} prevSelectedAccount The previously selected account.
 * @param {UserMenuAccount} selectedAccount The selected account.
 * @public
 */
@event("change-account", {
	cancelable: true,
})

/**
 * Fired when a menu item is selected.
 * @param {UserMenuItem} item The selected `user menu item`.
 * @public
 */
@event("item-click", {
	cancelable: true,
})

/**
 * Fired when a user menu is open.
 * @public
 * @since 2.6.0
 */
@event("open")

/**
 * Fired when a user menu is close.
 * @public
 * @since 2.6.0
 */
@event("close")

/**
 * Fired when the "Sign Out" button is selected.
 * @public
 * @since 2.6.0
 */
@event("sign-out-click", {
	cancelable: true,
})
class UserMenu extends UI5Element {
	eventDetails!: {
		"avatar-click": void;
		"manage-account-click": void;
		"edit-accounts-click": void;
		"change-account": UserMenuOtherAccountClickEventDetail;
		"item-click": UserMenuItemClickEventDetail;
		"sign-out-click": void;
		"open": void;
		"close": void;

	}
	/**
	 * Defines if the User Menu is opened.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	open = false;

	/**
	 * Defines the ID or DOM Reference of the element at which the user menu is shown.
	 * When using this attribute in a declarative way, you must only use the `id` (as a string) of the element at which you want to show the popover.
	 * You can only set the `opener` attribute to a DOM Reference when using JavaScript.
	 * @public
	 * @default undefined
	 */
	@property({ converter: DOMReferenceConverter })
	opener?: HTMLElement | string | null;

	/**
	 * Defines if the User Menu shows the Manage Account option.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showManageAccount = false;

	/**
	 * Defines if the User Menu shows the Other Accounts option.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showOtherAccounts = false;

	/**
	 * Defines if the User Menu shows the Edit Accounts option.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showEditAccounts = false;

	/**
	 * Defines if the User menu shows edit button.
	 *
	 * @default false
	 * @public
	 * @since 2.7.0
	 */
	@property({ type: Boolean })
	showEditButton = false;

	/**
	 * Defines the menu items.
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
	})
	menuItems!: Array<UserMenuItem>;

	/**
	 * Defines the user accounts.
	 *
	 * **Note:** If one item is used, it will be shown as the selected one. If more than one item is used, the first one will be shown as selected unless
	 * there is an item with `selected` property set to `true`.
	 * @public
	 */
	@slot({
		type: HTMLElement,
		invalidateOnChildChange: {
			properties: true,
			slots: false,
		},
	})
	accounts!: Array<UserMenuAccount>;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	/**
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	_titleMovedToHeader = false;

	/**
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	_isScrolled = false;

	/**
	 * @private
	 */
	_selectedAccount!: UserMenuAccount;

	/**
	 * @private
	 */
	_observer?: IntersectionObserver;

	/**
	 * @private
	 */
	@query("#user-menu-rp")
	_responsivePopover?: ResponsivePopover;

	/**
	 * @private
	 */
	@query("#selected-account-title")
	_selectedAccountTitleEl?: Title;

	/**
	 * @private
	 */
	@query("#selected-account-manage-btn")
	_selectedAccountManageBtn?: Button;

	onBeforeRendering() {
		this._selectedAccount = this.accounts.find(account => account.selected) || this.accounts[0];
		const siblingsWithIcon = this._menuItems.some(menuItem => !!menuItem.icon);

		this._menuItems.forEach(item => {
			item._siblingsWithIcon = siblingsWithIcon;
		});
	}

	onAfterRendering(): void {
		if (this._responsivePopover) {
			const observerOptions = {
				threshold: [0.15],
			};

			this._observer?.disconnect();
			this._observer = new IntersectionObserver(entries => this._handleIntersection(entries), observerOptions);

			if (this._selectedAccountTitleEl) {
				this._observer.observe(this._selectedAccountTitleEl);
			}

			if (this._selectedAccountManageBtn) {
				this._observer.observe(this._selectedAccountManageBtn);
			}
		}
	}

	get _isPhone() {
		return isPhone();
	}

	_handleScroll(e: CustomEvent<PopupScrollEventDetail>) {
		this._isScrolled = e.detail.scrollTop > 0;
	}

	_handleIntersection(entries: IntersectionObserverEntry[]) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				if (entry.target.id === "selected-account-title") {
					this._titleMovedToHeader = false;
				}
				return;
			}

			if (entry.target.id === "selected-account-title") {
				this._titleMovedToHeader = true;
			}
		}, this);
	}

	_handleAvatarClick(e: CustomEvent) {
		if (e.type === "click") {
			// TOFIX: Discuss this check: Fire the custom UserMenu#avatar-click only for Avatar#click (not for Avatar#ui5-click as well).
			this.fireDecoratorEvent("avatar-click");
		}
	}

	_handleManageAccountClick() {
		this.fireDecoratorEvent("manage-account-click");
	}

	_handleEditAccountsClick() {
		this.fireDecoratorEvent("edit-accounts-click");
	}

	_handleAccountSwitch(e: CustomEvent<ListItemClickEventDetail>) {
		const item = e.detail.item as ListItemBase & { associatedAccount: UserMenuAccount };
		const eventPrevented = !this.fireDecoratorEvent("change-account", {
			prevSelectedAccount: this._selectedAccount,
			selectedAccount: item.associatedAccount,
		});
		if (eventPrevented) {
			return;
		}
		this._selectedAccount.selected = false;
		item.associatedAccount.selected = true;
	}

	_handleSignOutClick() {
		const eventPrevented = !this.fireDecoratorEvent("sign-out-click");

		if (eventPrevented) {
			return;
		}

		this._closeUserMenu();
	}

	_handleMenuItemClick(e: CustomEvent<ListItemClickEventDetail>) {
		const item = e.detail.item as UserMenuItem; // imrove: improve this ideally without "as" cating

		item._updateCheckedState();

		if (!item._popover) {
			const eventPrevented = !this.fireDecoratorEvent("item-click", {
				"item": item,
			});

			if (!eventPrevented) {
				item.fireEvent("close-menu");
			}
		} else {
			this._openItemSubMenu(item);
		}
	}

	_handleMenuItemClose() {
		this._closeUserMenu();
	}

	_handlePopoverAfterOpen() {
		this.fireDecoratorEvent("open");
	}

	_handlePopoverAfterClose() {
		this.open = false;
		this.fireDecoratorEvent("close");
	}

	_openItemSubMenu(item: UserMenuItem) {
		if (!item._popover || item._popover.open) {
			return;
		}

		item._popover.opener = item;
		item._popover.open = true;
		item.selected = true;
	}

	_closeUserMenu() {
		this.open = false;
	}

	get _otherAccounts() {
		return this.accounts;
	}

	get _manageAccountButtonText() {
		return UserMenu.i18nBundle.getText(USER_MENU_MANAGE_ACCOUNT_BUTTON_TXT);
	}

	get _otherAccountsButtonText() {
		return UserMenu.i18nBundle.getText(USER_MENU_OTHER_ACCOUNT_BUTTON_TXT);
	}

	get _signOutButtonText() {
		return UserMenu.i18nBundle.getText(USER_MENU_SIGN_OUT_BUTTON_TXT);
	}

	get _editAvatarTooltip() {
		return UserMenu.i18nBundle.getText(USER_MENU_EDIT_AVATAR_TXT);
	}

	get _editAccountsTooltip() {
		return UserMenu.i18nBundle.getText(USER_MENU_EDIT_ACCOUNTS_TXT);
	}

	get _closeDialogAriaLabel() {
		return UserMenu.i18nBundle.getText(USER_MENU_CLOSE_DIALOG_BUTTON);
	}

	get accessibleNameText() {
		if (!this._selectedAccount) {
			return "";
		}
		return `${UserMenu.i18nBundle.getText(USER_MENU_POPOVER_ACCESSIBLE_NAME)} ${this._selectedAccount.titleText}`;
	}

	get _ariaLabelledByAccountInformationText() {
		return UserMenu.i18nBundle.getText(USER_MENU_CURRENT_INFORMATION_TXT);
	}

	get _ariaLabelledByActions() {
		return UserMenu.i18nBundle.getText(USER_MENU_ACTIONS_TXT);
	}

	getAccountDescriptionText(account: UserMenuAccount) {
		return `${account.subtitleText} ${account.description} ${account.selected ? UserMenu.i18nBundle.getText(USER_MENU_POPOVER_ACCESSIBLE_ACCOUNT_SELECTED_TXT) : ""}`;
	}

	getAccountByRefId(refId: string) {
		return this.accounts.find(account => account._id === refId)!;
	}

	captureRef(ref: HTMLElement & { associatedAccount?: UI5Element} | null) {
		if (ref) {
			ref.associatedAccount = this;
		}
	}

	get _menuItems() {
		return this.menuItems.filter(isInstanceOfMenuItem);
	}
}

UserMenu.define();

export default UserMenu;
export type {
	UserMenuItemClickEventDetail,
	UserMenuOtherAccountClickEventDetail,
};
