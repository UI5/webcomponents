import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import {
	customElement, property, slotStrict as slot, eventStrict as event,
} from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type Input from "@ui5/webcomponents/dist/Input.js";
import type { InputEventDetail } from "@ui5/webcomponents/dist/Input.js";
import type { ListItemClickEventDetail } from "@ui5/webcomponents/dist/List.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import type { PopupBeforeCloseEventDetail } from "@ui5/webcomponents/dist/Popup.js";
import { isPhone, isTablet, isCombi } from "@ui5/webcomponents-base/dist/Device.js";
import MediaRange from "@ui5/webcomponents-base/dist/MediaRange.js";
import UserSettingsDialogTemplate from "./UserSettingsDialogTemplate.js";
import type UserSettingsItem from "./UserSettingsItem.js";
import UserSettingsDialogCss from "./generated/themes/UserSettingsDialog.css.js";

// Texts
import {
	USER_SETTINGS_DIALOG_ACCESSIBLE_NAME,
	USER_SETTINGS_LIST_ARIA_ROLE_DESC,
	USER_SETTINGS_DIALOG_CLOSE_BUTTON_TEXT,
	USER_SETTINGS_DIALOG_NO_SEARCH_RESULTS_TEXT,
} from "./generated/i18n/i18n-defaults.js";

type UserSettingsItemSelectEventDetail = {
	item: UserSettingsItem;
}

type UserSettingsBeforeCloseEventDetail = PopupBeforeCloseEventDetail;

/**
 * @class
 * ### Overview
 *
 * The `ui5-user-settings-dialog` is an SAP Fiori-specific web component used in the `ui5-user-menu`.
 * It allows the user to easily view information and settings for an account.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/UserSettingsDialog.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.8.0
 */
@customElement({
	tag: "ui5-user-settings-dialog",
	renderer: jsxRenderer,
	template: UserSettingsDialogTemplate,
	styles: [UserSettingsDialogCss],
})

/**
 * Fired when an item is selected.
 * @param {UserSettingsItem} item The selected `user settings item`.
 * @public
 */
@event("selection-change", {
	cancelable: true,
})

/**
 * Fired when a settings dialog is open.
 * @public
 */
@event("open")

/**
 * Fired before the settings dialog is closed.
 * @public
 */
@event("before-close", {
	cancelable: true,
})

/**
 * Fired when a settings dialog is closed.
 * @public
 */
@event("close")

class UserSettingsDialog extends UI5Element {
	eventDetails!: {
		"selection-change": UserSettingsItemSelectEventDetail,
		"open": void,
		"before-close": UserSettingsBeforeCloseEventDetail,
		"close": void,
	};
	/**
	 * Defines, if the User Settings Dialog is opened.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	open = false;

	/**
	 * Defines the headerText of the item.
	 *
	 * @public
	 * @default undefined
	 */
	@property({ type: String })
	headerText?: string;

	/**
	 * Defines if the Search Field would be displayed.
	 *
	 * **Note:** By default the Search Field is not displayed.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showSearchField = false;

	/**
	 * Defines the user settings items.
	 *
	 * **Note:**  If no setting item is set as `selected`, the first one will be selected.
	 * @public
	 */
	@slot({
		"default": true,
		type: HTMLElement,
		individualSlots: true,
		invalidateOnChildChange: {
			properties: true,
			slots: true,
		},
	})
	items!: DefaultSlot<UserSettingsItem>;

	/**
	 * Defines the fixed user settings items.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
		individualSlots: true,
		invalidateOnChildChange: {
			properties: true,
			slots: true,
		},
	})
	fixedItems!: Slot<UserSettingsItem>;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	/**
	 * @private
	 */
	@property({ type: String })
	_searchValue = "";

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_collapsed = false;

	/**
	 * @private
	 */
	@property({ type: Object })
	_selectedSetting?: UserSettingsItem;

	/**
	 * @private
	 */
	_filteredItems: Array<UserSettingsItem> = [];

	/**
	 * @private
	 */
	_filteredFixedItems: Array<UserSettingsItem> = [];

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_showNoSearchResult = false;

	/**
	 * Defines the current media query size.
	 * @private
	 */
	@property({ type: String })
	_mediaRange?: any;

	onBeforeRendering() {
		this._mediaRange = MediaRange.getCurrentRange(MediaRange.RANGESETS.RANGE_4STEPS);
		const searchValue = this._searchValue.toLowerCase();
		this._filteredItems = [];
		this._filteredFixedItems = [];
		const siblingsWithIcon = this.items.some(item => !!item.icon);
		this.items.forEach(item => {
			if (item.text.toLowerCase().includes(searchValue)) {
				this._filteredItems.push(item);
			}

			if (item.selected) {
				this._selectedSetting = item;
			}
			item._siblingsWithIcon = siblingsWithIcon;
		});

		this.fixedItems.forEach(item => {
			if (item.text.toLowerCase().includes(searchValue)) {
				this._filteredFixedItems.push(item);
			}

			if (item.selected) {
				this._selectedSetting = item;
			}
		});

		if (this._filteredItems.length === 0 && this._filteredFixedItems.length === 0) {
			this._showNoSearchResult = true;
		} else {
			this._showNoSearchResult = false;
		}

		if (!this._selectedSetting) {
			this._selectedSetting = this.items[0] || this.fixedItems[0];
		}
	}

	_handleItemClick(e: CustomEvent<ListItemClickEventDetail>) {
		const setting = e.detail.item as ListItemBase & { associatedSettingItem: UserSettingsItem };
		const settingItem = setting.associatedSettingItem;
		const eventPrevented = !this.fireDecoratorEvent("selection-change", {
			item: settingItem,
		});
		this._collapsed = true;

		if (!eventPrevented) {
			this.items.forEach(item => {
				item.selected = false;
			});
			this.fixedItems.forEach(item => {
				item.selected = false;
			});
			settingItem.selected = true;
		}
	}

	_handleDialogAfterOpen() {
		this.fireDecoratorEvent("open");
	}

	_handleDialogBeforeClose(e: CustomEvent<PopupBeforeCloseEventDetail>) {
		if (!e.detail.escPressed) {
			return;
		}

		const eventPrevented = !this.fireDecoratorEvent("before-close", e.detail);

		if (eventPrevented) {
			e.preventDefault();
		}
	}

	_handleDialogAfterClose() {
		this.open = false;
		this.fireDecoratorEvent("close");
	}

	get accessibleNameText() {
		return UserSettingsDialog.i18nBundle.getText(USER_SETTINGS_DIALOG_ACCESSIBLE_NAME);
	}

	get ariaRoleDescList() {
		return UserSettingsDialog.i18nBundle.getText(USER_SETTINGS_LIST_ARIA_ROLE_DESC);
	}

	get closeButtonText() {
		return UserSettingsDialog.i18nBundle.getText(USER_SETTINGS_DIALOG_CLOSE_BUTTON_TEXT);
	}
	get noSearchResultsText() {
		return UserSettingsDialog.i18nBundle.getText(USER_SETTINGS_DIALOG_NO_SEARCH_RESULTS_TEXT);
	}

	get _selectedItemSlotName() {
		return this._selectedSetting ? this._selectedSetting._individualSlot : "";
	}

	get _showSettingWithNavigation() {
		return (isPhone() || (isTablet() && !isCombi())) || (this._mediaRange === "S" || this._mediaRange === "M");
	}

	_handleCloseButtonClick() {
		const eventPrevented = !this.fireDecoratorEvent("before-close", { escPressed: false });

		if (!eventPrevented) {
			this.open = false;
		}
	}

	_handleCollapseClick() {
		this._collapsed = false;
	}

	_handleInput(e: CustomEvent<InputEventDetail>) {
		this._searchValue = (e.target as Input).value;
	}

	captureRef(ref: HTMLElement & { associatedSettingItem?: UI5Element} | null) {
		if (ref) {
			ref.associatedSettingItem = this;
		}
	}
}

UserSettingsDialog.define();

export default UserSettingsDialog;
export type {
	UserSettingsItemSelectEventDetail,
	UserSettingsBeforeCloseEventDetail,
};
