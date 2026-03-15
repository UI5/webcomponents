var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { customElement, property, slotStrict as slot, eventStrict as event, } from "@ui5/webcomponents-base/dist/decorators.js";
import UserSettingsItemTemplate from "./UserSettingsItemTemplate.js";
import UserSettingsItemCss from "./generated/themes/UserSettingsItem.css.js";
/**
 * @class
 * ### Overview
 *
 * The `ui5-user-settings-item` represents an item in the `ui5-user-settings-dialog`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/UserSettingsItem.js";`
 *
 * You can disable the <code>UserSettingsItem</code> by setting the <code>enabled</code> property to <code>false</code>,
 * or use the <code>UserSettingsItem</code> in read-only mode by setting the <code>editable</code> property to false.
 *
 * <b>Note:</b> Disabled and read-only states shouldn't be used together.
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.8.0
 */
let UserSettingsItem = class UserSettingsItem extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines the text of the user settings item.
         *
         * @public
         * @default ""
         */
        this.text = "";
        /**
         * Defines the tooltip of the component.
         *
         * A tooltip attribute should be provided to represent the meaning or function when the component is collapsed and only the icon is visible.
         * @default ""
         * @public
         */
        this.tooltip = "";
        /**
         * Shows item tab.
         *
         * @public
         * @default false
         */
        this.selected = false;
        /**
         * Defines whether the component is in disabled state.
         *
         * **Note:** A disabled component is completely noninteractive.
         * @default false
         * @public
         */
        this.disabled = false;
        /**
         * Indicates whether a loading indicator should be shown.
         * @default false
         * @public
         */
        this.loading = false;
        /**
         * Defines the icon of the component.
         *
         * @default "globe"
         * @public
         */
        this.icon = "globe";
        /**
         * Indicates whether any of the element siblings have icon.
         */
        this._siblingsWithIcon = false;
    }
    get _hasSelectedPageView() {
        return this.pages.some(view => view.selected);
    }
    get _selectedPageView() {
        return this.pages.find(view => view.selected) || this.pages[0];
    }
    get ariaLabelledByText() {
        return `${this.text} ${this.accessibleName}`.trim();
    }
    get _tooltip() {
        return this.tooltip ? this.tooltip : this.text;
    }
    get _icon() {
        return this.icon;
    }
    _handleBackButtonClick() {
        if (this._shouldShowBackButton) {
            const selectedPageView = this._selectedPageView;
            const eventPrevented = !this.fireDecoratorEvent("selection-change", {
                view: selectedPageView,
            });
            if (!eventPrevented) {
                selectedPageView.selected = false;
            }
        }
        else {
            this.fireDecoratorEvent("_collapse");
        }
    }
    _handleTabSelect(e) {
        const tab = e.detail.tab;
        const tabView = tab.associatedSettingView;
        const eventPrevented = !this.fireDecoratorEvent("selection-change", {
            view: tabView,
        });
        if (eventPrevented) {
            e.preventDefault();
        }
        else {
            this.tabs.forEach(view => {
                view.selected = false;
            });
            tabView.selected = true;
        }
    }
    get _shouldShowBackButton() {
        return !!(this._hasSelectedPageView && this._selectedPageView.secondary);
    }
    captureRef(ref) {
        if (ref) {
            ref.associatedSettingView = this;
        }
    }
};
__decorate([
    property({ type: String })
], UserSettingsItem.prototype, "text", void 0);
__decorate([
    property({ type: String })
], UserSettingsItem.prototype, "tooltip", void 0);
__decorate([
    property({ type: String })
], UserSettingsItem.prototype, "headerText", void 0);
__decorate([
    property({ type: Boolean })
], UserSettingsItem.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean })
], UserSettingsItem.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], UserSettingsItem.prototype, "loading", void 0);
__decorate([
    property()
], UserSettingsItem.prototype, "loadingReason", void 0);
__decorate([
    property({ type: String })
], UserSettingsItem.prototype, "icon", void 0);
__decorate([
    property()
], UserSettingsItem.prototype, "accessibleName", void 0);
__decorate([
    slot({
        type: HTMLElement,
        "default": true,
        individualSlots: true,
        invalidateOnChildChange: {
            properties: true,
            slots: false,
        },
    })
], UserSettingsItem.prototype, "pages", void 0);
__decorate([
    slot({
        type: HTMLElement,
        individualSlots: true,
        invalidateOnChildChange: {
            properties: true,
            slots: false,
        },
    })
], UserSettingsItem.prototype, "tabs", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], UserSettingsItem.prototype, "_siblingsWithIcon", void 0);
UserSettingsItem = __decorate([
    customElement({
        tag: "ui5-user-settings-item",
        renderer: jsxRenderer,
        template: UserSettingsItemTemplate,
        styles: [UserSettingsItemCss],
    })
    /**
     * Fired when a selected view changed.
     * @param {UserSettingsView} view The selected `view`.
     * @public
     */
    ,
    event("selection-change", {
        cancelable: true,
    })
    /**
     *
     * @private
     */
    ,
    event("_collapse", {
        bubbles: true,
    })
], UserSettingsItem);
UserSettingsItem.define();
export default UserSettingsItem;
//# sourceMappingURL=UserSettingsItem.js.map