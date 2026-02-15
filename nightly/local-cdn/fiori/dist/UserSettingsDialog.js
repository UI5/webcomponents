var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UserSettingsDialog_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, property, slotStrict as slot, eventStrict as event, } from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { isPhone, isTablet, isCombi } from "@ui5/webcomponents-base/dist/Device.js";
import MediaRange from "@ui5/webcomponents-base/dist/MediaRange.js";
import UserSettingsDialogTemplate from "./UserSettingsDialogTemplate.js";
import UserSettingsDialogCss from "./generated/themes/UserSettingsDialog.css.js";
// Texts
import { USER_SETTINGS_DIALOG_ACCESSIBLE_NAME, USER_SETTINGS_LIST_ARIA_ROLE_DESC, USER_SETTINGS_DIALOG_CLOSE_BUTTON_TEXT, USER_SETTINGS_DIALOG_NO_SEARCH_RESULTS_TEXT, } from "./generated/i18n/i18n-defaults.js";
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
let UserSettingsDialog = UserSettingsDialog_1 = class UserSettingsDialog extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines, if the User Settings Dialog is opened.
         *
         * @default false
         * @public
         */
        this.open = false;
        /**
         * Defines if the Search Field would be displayed.
         *
         * **Note:** By default the Search Field is not displayed.
         * @default false
         * @public
         */
        this.showSearchField = false;
        /**
         * @private
         */
        this._searchValue = "";
        /**
         * @private
         */
        this._collapsed = false;
        /**
         * @private
         */
        this._filteredItems = [];
        /**
         * @private
         */
        this._filteredFixedItems = [];
        /**
         * @private
         */
        this._showNoSearchResult = false;
    }
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
        }
        else {
            this._showNoSearchResult = false;
        }
        if (!this._selectedSetting) {
            this._selectedSetting = this.items[0] || this.fixedItems[0];
        }
    }
    _handleItemClick(e) {
        const setting = e.detail.item;
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
    _handleDialogBeforeClose(e) {
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
        return UserSettingsDialog_1.i18nBundle.getText(USER_SETTINGS_DIALOG_ACCESSIBLE_NAME);
    }
    get ariaRoleDescList() {
        return UserSettingsDialog_1.i18nBundle.getText(USER_SETTINGS_LIST_ARIA_ROLE_DESC);
    }
    get closeButtonText() {
        return UserSettingsDialog_1.i18nBundle.getText(USER_SETTINGS_DIALOG_CLOSE_BUTTON_TEXT);
    }
    get noSearchResultsText() {
        return UserSettingsDialog_1.i18nBundle.getText(USER_SETTINGS_DIALOG_NO_SEARCH_RESULTS_TEXT);
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
    _handleInput(e) {
        this._searchValue = e.target.value;
    }
    captureRef(ref) {
        if (ref) {
            ref.associatedSettingItem = this;
        }
    }
};
__decorate([
    property({ type: Boolean })
], UserSettingsDialog.prototype, "open", void 0);
__decorate([
    property({ type: String })
], UserSettingsDialog.prototype, "headerText", void 0);
__decorate([
    property({ type: Boolean })
], UserSettingsDialog.prototype, "showSearchField", void 0);
__decorate([
    slot({
        "default": true,
        type: HTMLElement,
        individualSlots: true,
        invalidateOnChildChange: {
            properties: true,
            slots: true,
        },
    })
], UserSettingsDialog.prototype, "items", void 0);
__decorate([
    slot({
        type: HTMLElement,
        individualSlots: true,
        invalidateOnChildChange: {
            properties: true,
            slots: true,
        },
    })
], UserSettingsDialog.prototype, "fixedItems", void 0);
__decorate([
    property({ type: String })
], UserSettingsDialog.prototype, "_searchValue", void 0);
__decorate([
    property({ type: Boolean })
], UserSettingsDialog.prototype, "_collapsed", void 0);
__decorate([
    property({ type: Object })
], UserSettingsDialog.prototype, "_selectedSetting", void 0);
__decorate([
    property({ type: Boolean })
], UserSettingsDialog.prototype, "_showNoSearchResult", void 0);
__decorate([
    property({ type: String })
], UserSettingsDialog.prototype, "_mediaRange", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], UserSettingsDialog, "i18nBundle", void 0);
UserSettingsDialog = UserSettingsDialog_1 = __decorate([
    customElement({
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
    ,
    event("selection-change", {
        cancelable: true,
    })
    /**
     * Fired when a settings dialog is open.
     * @public
     */
    ,
    event("open")
    /**
     * Fired before the settings dialog is closed.
     * @public
     */
    ,
    event("before-close", {
        cancelable: true,
    })
    /**
     * Fired when a settings dialog is closed.
     * @public
     */
    ,
    event("close")
], UserSettingsDialog);
UserSettingsDialog.define();
export default UserSettingsDialog;
//# sourceMappingURL=UserSettingsDialog.js.map