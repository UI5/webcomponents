import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import {
	customElement, property, slotStrict as slot, eventStrict as event,
} from "@ui5/webcomponents-base/dist/decorators.js";
import type { TabContainerTabSelectEventDetail } from "@ui5/webcomponents/dist/TabContainer.js";
import type Tab from "@ui5/webcomponents/dist/Tab.js";
import UserSettingsItemTemplate from "./UserSettingsItemTemplate.js";
import type UserSettingsView from "./UserSettingsView.js";
import UserSettingsItemCss from "./generated/themes/UserSettingsItem.css.js";

type UserSettingsItemViewSelectEventDetail = {
	view: UserSettingsView;
}

type UserSettingsItemBackClickEventDetail = {
	view: UserSettingsView;
}

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
@customElement({
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
@event("selection-change", {
	cancelable: true,
})

/**
 *
 * @private
 */
@event("_collapse", {
	bubbles: true,
})

class UserSettingsItem extends UI5Element {
	eventDetails!: {
		"_collapse": void,
		"selection-change": UserSettingsItemViewSelectEventDetail,
		"back-click": UserSettingsItemBackClickEventDetail,

	}
	/**
	 * Defines the text of the user settings item.
	 *
	 * @public
	 * @default ""
	 */
	@property({ type: String })
	text = "";

	/**
	 * Defines the tooltip of the component.
	 *
	 * A tooltip attribute should be provided to represent the meaning or function when the component is collapsed and only the icon is visible.
	 * @default ""
	 * @public
	 */
	@property({ type: String })
	tooltip = "";

	/**
	 * Defines the headerText of the item.
	 *
	 * @public
	 * @default ""
	 */
	@property({ type: String })
	headerText?: string;

	/**
	 * Shows item tab.
	 *
	 * @public
	 * @default false
	 */
	@property({ type: Boolean })
	selected = false;

	/**
	 * Defines whether the component is in disabled state.
	 *
	 * **Note:** A disabled component is completely noninteractive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Indicates whether a loading indicator should be shown.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	loading = false;

	/**
	 * Indicates why the control is in loading state.
	 * @default undefined
	 * @public
	 */
	@property()
	loadingReason?: string;

	/**
	 * Defines the icon of the component.
	 *
	 * @default "globe"
	 * @public
	 */
	@property({ type: String })
	icon = "globe";

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 */
	@property()
	accessibleName?: string;

	/**
	 * Defines the page views of the user settings item.
	 *
	 * If there are no tab views, the first page view will be shown unless there is selected one. If there is selected page
	 * view it will be shown no matter if there are tab views.
	 *
	 * The page views are displayed by default if there is no selected tab view.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
		individualSlots: true,
		invalidateOnChildChange: {
			properties: true,
			slots: false,
		},
	})
	pages!: DefaultSlot<UserSettingsView>;

	/**
	 * Defines the tab views of the user settings item.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
		individualSlots: true,
		invalidateOnChildChange: {
			properties: true,
			slots: false,
		},
	})
	tabs!: Slot<UserSettingsView>;

	/**
	 * Indicates whether any of the element siblings have icon.
	 */
	@property({ type: Boolean, noAttribute: true })
	_siblingsWithIcon = false;

	/**
	 * @private
	 */
	_individualSlot?: string;

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
		} else {
			this.fireDecoratorEvent("_collapse");
		}
	}

	_handleTabSelect(e: CustomEvent<TabContainerTabSelectEventDetail>) {
		const tab = e.detail.tab as Tab & { associatedSettingView: UserSettingsView };
		const tabView = tab.associatedSettingView;
		const eventPrevented = !this.fireDecoratorEvent("selection-change", {
			view: tabView,
		});

		if (eventPrevented) {
			e.preventDefault();
		} else {
			this.tabs.forEach(view => {
				view.selected = false;
			});
			tabView.selected = true;
		}
	}

	get _shouldShowBackButton() {
		return !!(this._hasSelectedPageView && this._selectedPageView.secondary);
	}

	captureRef(this: UserSettingsView, ref: HTMLElement & { associatedSettingView?: UserSettingsView} | null) {
		if (ref) {
			ref.associatedSettingView = this;
		}
	}
}

UserSettingsItem.define();

export default UserSettingsItem;
export type {
	UserSettingsItemViewSelectEventDetail,
	UserSettingsItemBackClickEventDetail,
};
