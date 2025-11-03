import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScopeUtils.js";
import arraysAreEqual from "@ui5/webcomponents-base/dist/util/arraysAreEqual.js";

import type { IButton } from "@ui5/webcomponents/dist/Button.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents-icons/dist/bell.js";
import "@ui5/webcomponents-icons/dist/grid.js";
import "@ui5/webcomponents-icons/dist/da.js";
import "@ui5/webcomponents-icons/dist/overflow.js";

import ShellBarV2Template from "./ShellBarV2Template.js";
import shellBarV2Styles from "./generated/themes/ShellBarV2.css.js";

import ShellBarV2Actions from "./shellbarv2/ShellBarActions.js";
import ShellBarV2Breakpoint from "./shellbarv2/ShellBarBreakpoint.js";
import ShellBarV2SearchSupport from "./shellbarv2/ShellBarSearchSupport.js";
import ShellBarV2ContentSupport from "./shellbarv2/ShellBarContentSupport.js";
import ShellBarV2ItemNavigation from "./shellbarv2/ShellBarItemNavigation.js";
import ShellBarV2OverflowSupport from "./shellbarv2/ShellBarOverflowSupport.js";

import ShellBarV2Item from "./ShellBarV2Item.js";
import ShellBarSpacer from "./ShellBarSpacer.js";
import type ShellBarBranding from "./ShellBarBranding.js";
import type { ShellBarV2ActionItem } from "./shellbarv2/ShellBarActions.js";
import type { ShellBarV2BreakpointType } from "./shellbarv2/ShellBarBreakpoint.js";
import type { ShellBarV2OverflowResult } from "./shellbarv2/ShellBarOverflowSupport.js";

type ShellBarV2MenuButtonClickEventDetail = {
	menuButton: HTMLElement;
};

type ShellBarV2NotificationsClickEventDetail = {
	targetRef: HTMLElement;
};

type ShellBarV2ProfileClickEventDetail = {
	targetRef: HTMLElement;
};

type ShellBarV2ProductSwitchClickEventDetail = {
	targetRef: HTMLElement;
};

type ShellBarV2SearchButtonClickEventDetail = {
	targetRef: HTMLElement;
	searchFieldVisible: boolean;
};

type ShellBarV2SearchFieldToggleEventDetail = {
	expanded: boolean;
};

type ShellBarV2SearchFieldClearEventDetail = {
	targetRef: HTMLElement;
};

type ShellBarV2ContentItemVisibilityChangeEventDetail = {
	items: Array<HTMLElement>;
};

interface IShellBarSearchField extends HTMLElement {
	focused: boolean;
	value: string;
	collapsed?: boolean;
	open?: boolean;
}

/**
 * @class
 * ### Overview
 *
 * The `ui5-shellbar-v2` is a modular application header with built-in features.
 * This is an experimental MVP implementation.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/shellbarv2/ShellBarV2.js";`
 * @csspart root - Used to style the outermost wrapper of the `ui5-shellbar-v2`
 * @constructor
 * @extends UI5Element
 * @public
 * @experimental
 */
@customElement({
	tag: "ui5-shellbar-v2",
	styles: shellBarV2Styles,
	renderer: jsxRenderer,
	template: ShellBarV2Template,
	fastNavigation: true,
	dependencies: [
		Icon,
		List,
		Button,
		Popover,
		ShellBarSpacer,
		ShellBarV2Item,
		ListItemStandard,
	],
})
/**
 * Fired when the menu button is clicked.
 * @param {HTMLElement} menuButton dom ref of the menu button
 * @public
 */
@event("menu-button-click", {
	bubbles: true,
})
/**
 * Fired when the notification icon is clicked.
 * @param {HTMLElement} targetRef dom ref of the notifications button
 * @public
 */
@event("notifications-click", {
	bubbles: true,
})
/**
 * Fired when the profile is clicked.
 * @param {HTMLElement} targetRef dom ref of the profile element
 * @public
 */
@event("profile-click", {
	bubbles: true,
})
/**
 * Fired when the product switch icon is clicked.
 * @param {HTMLElement} targetRef dom ref of the product switch button
 * @public
 */
@event("product-switch-click", {
	bubbles: true,
})
/**
 * Fired when the search button is clicked.
 * @param {HTMLElement} targetRef dom ref of the search button
 * @param {Boolean} searchFieldVisible whether the search field is visible
 * @public
 */
@event("search-button-click", {
	cancelable: true,
	bubbles: true,
})
/**
 * Fired when the search field is expanded or collapsed.
 * @param {Boolean} expanded whether the search field is expanded
 * @public
 */
@event("search-field-toggle", {
	bubbles: true,
})
/**
 * Fired when the search cancel button is clicked in full-screen mode.
 * @param {HTMLElement} targetRef dom ref of the cancel button
 * @public
 */
@event("search-field-clear", {
	cancelable: true,
	bubbles: true,
})
/**
 * Fired when content items are hidden or shown due to overflow.
 * @param {Array<HTMLElement>} items array of hidden content items
 * @public
 */
@event("content-item-visibility-change", {
	bubbles: true,
})
class ShellBarV2 extends UI5Element {
	eventDetails!: {
		"menu-button-click": ShellBarV2MenuButtonClickEventDetail;
		"notifications-click": ShellBarV2NotificationsClickEventDetail;
		"profile-click": ShellBarV2ProfileClickEventDetail;
		"product-switch-click": ShellBarV2ProductSwitchClickEventDetail;
		"search-button-click": ShellBarV2SearchButtonClickEventDetail;
		"search-field-toggle": ShellBarV2SearchFieldToggleEventDetail;
		"search-field-clear": ShellBarV2SearchFieldClearEventDetail;
		"content-item-visibility-change": ShellBarV2ContentItemVisibilityChangeEventDetail;
	};

	/**
	 * Defines the branding slot (logo + title).
	 * The `ui5-shellbar-branding` component is intended to be placed inside this slot.
	 * @public
	 */
	@slot()
	branding!: Array<ShellBarBranding>;

	/**
	 * Defines a start button (menu button).
	 * Use `ui5-button` in this slot.
	 * @public
	 */
	@slot()
	startButton!: Array<IButton>;

	/**
	 * Defines content items displayed in the center area.
	 * @public
	 */
	@slot({ type: HTMLElement, individualSlots: true })
	content!: Array<HTMLElement>;

	/**
	 * Defines additional custom items.
	 * Use `ui5-shellbar-v2-item` components.
	 * @public
	 */
	@slot({
		type: ShellBarV2Item,
		"default": true,
		// invalidateOnChildChange: true,
		individualSlots: true,
	})
	items!: Array<ShellBarV2Item>;

	/**
	 * Defines the profile slot.
	 * You can pass `ui5-avatar` to set the profile image/icon.
	 * @public
	 */
	@slot()
	profile!: Array<HTMLElement>;

	/**
	 * Defines the assistant slot.
	 * Add a button for AI assistant or copilot.
	 * @public
	 */
	@slot()
	assistant!: Array<IButton>;

	/**
	 * Defines the search field slot.
	 * Use a self-collapsible search field component.
	 * @public
	 */
	@slot({
		type: HTMLElement,
		// invalidateOnChildChange: true,
	})
	searchField!: Array<IShellBarSearchField>;

	/**
	 * Defines the notifications count displayed in the notification icon badge.
	 * @default undefined
	 * @public
	 */
	@property()
	notificationsCount?: string;

	/**
	 * Defines if the notification icon is displayed.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showNotifications = false;

	/**
	 * Defines if the product switch icon is displayed.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showProductSwitch = false;

	/**
	 * Defines if the search field is displayed.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showSearchField = false;

	/**
	 * Current breakpoint size.
	 * @private
	 */
	@property()
	breakpointSize: ShellBarV2BreakpointType = "M";

	/**
	 * Actions computed from controllers.
	 * @private
	 */
	@property({ type: Object })
	actions: ShellBarV2ActionItem[] = [];

	/**
	 * Show overflow button when items are hidden.
	 * @private
	 */
	@property({ type: Boolean })
	showOverflowButton = false;

	/**
	 * Open state of the overflow popover.
	 * @private
	 */
	@property({ type: Boolean })
	overflowPopoverOpen = false;

	/**
	 * IDs of items currently hidden due to overflow.
	 * Used to trigger rerender for conditional rendering.
	 * @private
	 */
	@property({ type: Object })
	hiddenItemsIds: string[] = [];

	/**
	 * Show full-screen search overlay.
	 * @private
	 */
	@property({ type: Boolean })
	showFullWidthSearch = false;

	/**
	 * Spacer element.
	 * @private
	 */
	@query(".ui5-shellbar-spacer")
	spacer?: HTMLElement;

	/**
	 * Outer container of the overflow container.
	 * @private
	 */
	@query(".ui5-shellbar-overflow-container")
	overflowOuter?: HTMLElement;

	/**
	 * Inner container of the overflow container.
	 * @private
	 */
	@query(".ui5-shellbar-overflow-container-inner")
	overflowInner?: HTMLElement;

	private handleResizeBound: ResizeObserverCallback = this.handleResize.bind(this);

	searchSupport = new ShellBarV2SearchSupport({
		getSearchField: () => this.search,
		getSearchState: () => this.showSearchField,
		getCSSVariable: (cssVar: string) => this.getCSSVariable(cssVar),
		setSearchState: (expanded: boolean) => this.setSearchState(expanded),
		getOverflowed: () => this.overflowSupport.isOverflowing(this.overflowOuter!, this.overflowInner!),
	});

	overflowSupport = new ShellBarV2OverflowSupport();
	contentSupport = new ShellBarV2ContentSupport();

	itemNavigation = new ShellBarV2ItemNavigation({
		getDomRef: () => this.getDomRef() || null,
	});

	breakpoint = new ShellBarV2Breakpoint();
	actionsSupport = new ShellBarV2Actions();

	/* ------------- Lifecycle Methods -------------- */

	onEnterDOM() {
		ResizeHandler.register(this, this.handleResizeBound);
		this.searchSupport.subscribe();
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this.handleResizeBound);
		this.searchSupport.unsubscribe();
	}

	onBeforeRendering() {
		// Sync branding breakpoint state
		this.branding.forEach(brandingEl => {
			brandingEl._isSBreakPoint = this.isSBreakPoint;
		});

		this.updateActions();

		if (this.isSelfCollapsibleSearch) {
			this.searchSupport.syncShowSearchFieldState();
		}
	}

	onAfterRendering() {
		this.updateBreakpoint();
		this.updateOverflow();
	}

	/* ------------- End of Lifecycle Methods -------------- */

	/* ------------- Actions Management -------------- */

	/**
	 * Updates actions by delegating to controller.
	 * Demonstrates: Component gathers params, controller returns data, component applies.
	 */
	private updateActions() {
		const params = {
			showNotifications: this.showNotifications,
			notificationsCount: this.notificationsCount,
			showProductSwitch: this.showProductSwitch,
			hasAssistant: this.hasAssistant,
			showProfile: this.hasProfile,
		};

		this.actions = this.actionsSupport.getActions(params);
	}

	/* ------------- End of Actions Management -------------- */

	/* ------------- Breakpoint Management -------------- */
	/**
	 * Updates the breakpoint by delegating calculation to controller.
	 * This is the coordination logic - gather data, delegate, apply result.
	 */
	private updateBreakpoint() {
		const width = this.getBoundingClientRect().width;
		const breakpoint = this.breakpoint.calculate({ width });

		if (this.breakpointSize !== breakpoint) {
			this.breakpointSize = breakpoint;
		}
	}

	/* ------------- End of Breakpoint Management -------------- */

	/* ------------- Notifications Management -------------- */

	_handleNotificationsClick() {
		const notificationsBtn = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-notifications-button");
		if (notificationsBtn) {
			this.fireDecoratorEvent("notifications-click", { targetRef: notificationsBtn });
		}
	}
	/* ------------- End of Notifications Management -------------- */

	/* ------------- Profile Management -------------- */

	_handleProfileClick() {
		const profileBtn = this.shadowRoot!.querySelector<HTMLElement>(".ui5-shellbar-profile-button");
		if (profileBtn) {
			this.fireDecoratorEvent("profile-click", { targetRef: profileBtn });
		}
	}
	/* ------------- End of Profile Management -------------- */

	/* ------------- Product Switch Management -------------- */

	_handleProductSwitchClick() {
		const productSwitchBtn = this.shadowRoot!.querySelector<HTMLElement>(".ui5-shellbar-product-switch-button");
		if (productSwitchBtn) {
			this.fireDecoratorEvent("product-switch-click", { targetRef: productSwitchBtn });
		}
	}
	/* ------------- End of Product Switch Management -------------- */

	/* ------------- Overflow Management -------------- */

	/**
	 * Updates overflow by delegating to controller.
	 * Controller measures DOM, hides items iteratively, returns result.
	 * Triggers rerender via property update to enable conditional rendering.
	 */
	private updateOverflow() {
		if (!this.overflowSupport) {
			return;
		}

		// Delegate to controller - pass all data explicitly
		const result = this.overflowSupport.updateOverflow({
			actions: this.actions,
			content: this.content,
			customItems: this.items,
			hiddenItemsIds: this.hiddenItemsIds,
			showSearchField: this.showSearchField,
			overflowOuter: this.overflowOuter!,
			overflowInner: this.overflowInner!,
			setVisible: (selector: string, visible: boolean) => {
				const element = this.shadowRoot!.querySelector(selector);
				if (element) {
					element.classList[visible ? "remove" : "add"]("ui5-shellbar-hidden");
				}
			},
		});

		this.handleOverflowChanged(result);

		return result.hiddenItemsIds;
	}

	private handleOverflowChanged(result: ShellBarV2OverflowResult) {
		const { hiddenItemsIds, showOverflowButton } = result;

		// Update items overflow state
		this.items.forEach(item => {
			item.inOverflow = hiddenItemsIds.includes(item._id);
			if (item.inOverflow) {
				// clear the hidden class to ensure the item is visible in the overflow popover
				item.classList.remove("ui5-shellbar-hidden");
			}
		});

		if (!arraysAreEqual(this.hiddenItemsIds, hiddenItemsIds)) {
			this.handleContentVisibilityChanged(this.hiddenItemsIds, hiddenItemsIds);
			this.hiddenItemsIds = hiddenItemsIds;
			this.showOverflowButton = showOverflowButton;
		}
		this.showFullWidthSearch = this.searchSupport.shouldShowFullScreen();
	}

	private handleContentVisibilityChanged(oldHiddenItemsIds: string[], newHiddenItemsIds: string[]) {
		// Compare with previous state
		const oldHiddenContentIds = oldHiddenItemsIds
			.filter(id => this.content
				.some(item => (item as any)._individualSlot as string === id));
		const newHiddenContentIds = newHiddenItemsIds
			.filter(id => this.content
				.some(item => (item as any)._individualSlot as string === id));

		if (!arraysAreEqual(oldHiddenContentIds, newHiddenContentIds)) {
			this.fireDecoratorEvent("content-item-visibility-change", {
				items: newHiddenContentIds.map(id => this.content.find(item => (item as any)._individualSlot as string === id)!),
			});
		}
	}

	private handleResize() {
		this.overflowPopoverOpen = false;
		this.updateBreakpoint();
		const hiddenItemsIds = this.updateOverflow() ?? [];
		const spacerWidth = this.spacer?.getBoundingClientRect().width || 0;
		this.searchSupport.autoManageSearchState(hiddenItemsIds.length, spacerWidth);
	}

	handleOverflowClick() {
		this.overflowPopoverOpen = !this.overflowPopoverOpen;
	}

	onPopoverClose() {
		this.overflowPopoverOpen = false;
	}

	handleOverflowItemClick(e: Event) {
		const target = e.currentTarget as HTMLElement;
		const actionId = target.getAttribute("data-action-id");

		// Trigger the appropriate action handler
		if (actionId === "notifications") {
			this._handleNotificationsClick();
		} else if (actionId === "search-button") {
			this.handleSearchButtonClick();
		}

		this.overflowPopoverOpen = false;
	}

	/* ------------- End of Overflow Management -------------- */

	/* ------------- Search Management -------------- */

	handleSearchButtonClick() {
		const searchButton = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-search-button");
		const defaultPrevented = !this.fireDecoratorEvent("search-button-click", {
			targetRef: searchButton!,
			searchFieldVisible: this.showSearchField,
		});

		if (defaultPrevented) {
			return;
		}

		this.setSearchState(!this.showSearchField);

		if (!this.showSearchField) {
			return;
		}

		const input = this.searchField[0];
		if (input) {
			input.focused = true;
			setTimeout(() => {
				input.focus();
			}, 100);
		}
	}

	/**
	 * Sets search field state and fires toggle event.
	 * Component coordination: delegates to controller for logic, fires event for external listeners.
	 */
	setSearchState(expanded: boolean) {
		if (expanded === this.showSearchField) {
			return;
		}
		this.showSearchField = expanded;
		requestAnimationFrame(() => {
			this.updateOverflow();
		});
		this.fireDecoratorEvent("search-field-toggle", { expanded });
	}

	handleCancelButtonClick() {
		const cancelBtn = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-cancel-button");
		if (!cancelBtn) {
			return;
		}

		const clearDefaultPrevented = !this.fireDecoratorEvent("search-field-clear", {
			targetRef: cancelBtn,
		});

		this.showFullWidthSearch = false;
		this.setSearchState(false);

		if (!clearDefaultPrevented && this.search) {
			this.search.value = "";
		}
	}

	/* ------------- End of Search Management -------------- */

	/* ------------- Keyboard Navigation -------------- */

	_onKeyDown(e: KeyboardEvent) {
		this.itemNavigation.handleKeyDown(e);
	}

	/* ------------- End of Keyboard Navigation -------------- */

	/* ------------- Common Methods -------------- */

	getCSSVariable(cssVar: string): string {
		const styleSet = getComputedStyle(this.getDomRef()!);
		return styleSet.getPropertyValue(getScopedVarName(cssVar));
	}

	getAction(actionId: string) {
		return this.actions.find(action => action.id === actionId);
	}

	getActionText(actionId: string): string {
		const texts: Record<string, string> = {
			"notifications": "Notifications",
			"assistant": "Assistant",
			"search-button": "Search",
		};
		return texts[actionId] || actionId;
	}

	get hasStartButton() {
		return this.startButton.length > 0;
	}

	get hasBranding() {
		return this.branding.length > 0;
	}

	get hasContent() {
		return this.content.length > 0;
	}

	get hasProfile() {
		return this.profile.length > 0;
	}

	get hasAssistant() {
		return this.assistant.length > 0;
	}
	get isSBreakPoint() {
		return this.breakpointSize === "S";
	}

	get hasSearchField() {
		return this.searchField.length > 0;
	}

	get overflowItems() {
		return this.overflowSupport.getOverflowItems({
			actions: this.actions,
			customItems: this.items,
			hiddenItemsIds: this.hiddenItemsIds,
		});
	}

	get search() {
		return this.searchField.length ? this.searchField[0] : null;
	}

	get isSelfCollapsibleSearch(): boolean {
		const searchField = this.search;
		if (searchField) {
			return "collapsed" in searchField && "open" in searchField;
		}
		return false;
	}
	/* ------------- End of Common Methods -------------- */

	/* ------------- Content Management -------------- */

	get startContent(): HTMLElement[] {
		return this.contentSupport.splitContent(this.content).start;
	}

	get endContent(): HTMLElement[] {
		return this.contentSupport.splitContent(this.content).end;
	}

	get separatorConfig() {
		return this.contentSupport.getSeparatorConfig({
			content: this.content,
			isSBreakPoint: this.isSBreakPoint,
			hiddenItemIds: this.hiddenItemsIds,
		});
	}

	get contentRole() {
		return this.contentSupport.getContentRole(this.content);
	}

	/**
	 * Returns packed separator info for a content item.
	 */
	getPackedSeparatorInfo(item: HTMLElement, isStartGroup: boolean) {
		const group = isStartGroup ? this.startContent : this.endContent;
		return this.contentSupport.shouldPackSeparator(
			item,
			group,
			this.hiddenItemsIds,
			this.isSBreakPoint,
		);
	}

	/* ------------- End of Content Management -------------- */
}

ShellBarV2.define();

export default ShellBarV2;
export type {
	ShellBarV2MenuButtonClickEventDetail,
	ShellBarV2NotificationsClickEventDetail,
	ShellBarV2ProfileClickEventDetail,
	ShellBarV2SearchButtonClickEventDetail,
	ShellBarV2SearchFieldToggleEventDetail,
	ShellBarV2ContentItemVisibilityChangeEventDetail,
	IShellBarSearchField,
	ShellBarV2Breakpoint,
};
