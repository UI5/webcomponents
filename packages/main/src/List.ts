import UI5Element, { type DefaultSlot, type Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import toLowercaseEnumValue from "@ui5/webcomponents-base/dist/util/toLowercaseEnumValue.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import {
	isTabNext,
	isSpace,
	isEnter,
	isTabPrevious,
	isCtrl,
	isEnd,
	isHome,
	isDown,
	isUp,
	isF7,
} from "@ui5/webcomponents-base/dist/Keys.js";
import DragAndDropHandler from "./delegate/DragAndDropHandler.js";
import type { MoveEventDetail } from "@ui5/webcomponents-base/dist/util/dragAndDrop/DragRegistry.js";
import { findClosestPositionsByKey } from "@ui5/webcomponents-base/dist/util/dragAndDrop/findClosestPosition.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import {
	getAllAccessibleDescriptionRefTexts,
	getEffectiveAriaDescriptionText,
	getEffectiveAriaLabelText,
	registerUI5Element,
	deregisterUI5Element,
	getAllAccessibleNameRefTexts,
} from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import getNormalizedTarget from "@ui5/webcomponents-base/dist/util/getNormalizedTarget.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import debounce from "@ui5/webcomponents-base/dist/util/debounce.js";
import isElementInView from "@ui5/webcomponents-base/dist/util/isElementInView.js";
import ListSelectionMode from "./types/ListSelectionMode.js";
import ListGrowingMode from "./types/ListGrowingMode.js";
import ListAccessibleRole from "./types/ListAccessibleRole.js";
import type ListItemBase from "./ListItemBase.js";
import type ListItem from "./ListItem.js";
import type {
	ListItemBasePressEventDetail,
} from "./ListItemBase.js";
import type DropIndicator from "./DropIndicator.js";
import type {
	SelectionRequestEventDetail,
} from "./ListItem.js";
import ListSeparator from "./types/ListSeparator.js";
import MediaRange from "@ui5/webcomponents-base/dist/MediaRange.js";

// Template
import ListTemplate from "./ListTemplate.js";

// Styles
import listCss from "./generated/themes/List.css.js";

// Texts
import {
	LIST_ROLE_LIST_GROUP_DESCRIPTION,
	LIST_ROLE_LISTBOX_GROUP_DESCRIPTION,
	LOAD_MORE_TEXT, ARIA_LABEL_LIST_SELECTABLE,
	ARIA_LABEL_LIST_MULTISELECTABLE,
	ARIA_LABEL_LIST_DELETABLE,
} from "./generated/i18n/i18n-defaults.js";
import type CheckBox from "./CheckBox.js";
import type RadioButton from "./RadioButton.js";
import { isInstanceOfListItemGroup } from "./ListItemGroup.js";
import type ListItemGroup from "./ListItemGroup.js";

const INFINITE_SCROLL_DEBOUNCE_RATE = 250; // ms

const PAGE_UP_DOWN_SIZE = 10;

// ListItemBase-based events
type ListItemFocusEventDetail = {
	item: ListItemBase,
}

type ListSelectionChangeEventDetail = {
	selectedItems: Array<ListItemBase>;
	previouslySelectedItems: Array<ListItemBase>;
	selectionComponentPressed: boolean;
	targetItem: ListItemBase;
	key?: string;
}

type ListItemDeleteEventDetail = {
	item: ListItemBase,
}

// ListItem-based events
type ListItemCloseEventDetail = {
	item: ListItemBase,
}

type ListItemToggleEventDetail = {
	item: ListItemBase,
}

type ListItemClickEventDetail = {
	item: ListItemBase,
}

type ListMoveEventDetail = MoveEventDetail;

type ListAccessibilityAttributes = {
	growingButton?: {
		name?: string,
		description?: string,
	},
}

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-list` component allows displaying a list of items, advanced keyboard
 * handling support for navigating between items, and predefined modes to improve the development efficiency.
 *
 * The `ui5-list` is a container for the available list items:
 *
 * - `ui5-li`
 * - `ui5-li-custom`
 * - `ui5-li-group`
 *
 * To benefit from the built-in selection mechanism, you can use the available
 * selection modes, such as
 * `Single`, `Multiple` and `Delete`.
 *
 * Additionally, the `ui5-list` provides header, footer, and customization for the list item separators.
 *
 * ### Keyboard Handling
 *
 * #### Basic Navigation
 * The `ui5-list` provides advanced keyboard handling.
 * When a list is focused the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 *
 * - [Up] or [Down] - Navigates up and down the items
 * - [Home] - Navigates to first item
 * - [End] - Navigates to the last item
 *
 * The user can use the following keyboard shortcuts to perform actions (such as select, delete),
 * when the `selectionMode` property is in use:
 *
 * - [Space] - Select an item (if `type` is 'Active') when `selectionMode` is selection
 * - [Delete] - Delete an item if `selectionMode` property is `Delete`
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/List.js";`
 *
 * `import "@ui5/webcomponents/dist/ListItemStandard.js";` (for `ui5-li`)
 *
 * `import "@ui5/webcomponents/dist/ListItemCustom.js";` (for `ui5-li-custom`)
 *
 * `import "@ui5/webcomponents/dist/ListItemGroup.js";` (for `ui5-li-group`)
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart growing-button - Used to style the button, that is used for growing of the component
 * @csspart growing-button-inner - Used to style the button inner element
 */
@customElement({
	tag: "ui5-list",
	fastNavigation: true,
	renderer: jsxRenderer,
	template: ListTemplate,
	styles: [
		listCss,
	],
})
/**
 * Fired when an item is activated, unless the item's `type` property
 * is set to `Inactive`.
 *
 * **Note**: This event is not triggered by interactions with selection components such as the checkboxes and radio buttons,
 * associated with non-default `selectionMode` values, or if any other **interactive** component
 * (such as a button or input) within the list item is directly clicked.
 * @param {HTMLElement} item The clicked item.
 * @public
 */
@event("item-click", {
	bubbles: true,
	cancelable: true,
})

/**
 * Fired when the `Close` button of any item is clicked
 *
 * **Note:** This event is only applicable to list items that can be closed (such as notification list items),
 * not to be confused with `item-delete`.
 * @param {HTMLElement} item the item about to be closed.
 * @public
 * @since 1.0.0-rc.8
 */
@event("item-close", {
	bubbles: true,
})

/**
 * Fired when the `Toggle` button of any item is clicked.
 *
 * **Note:** This event is only applicable to list items that can be toggled (such as notification group list items).
 * @param {HTMLElement} item the toggled item.
 * @public
 * @since 1.0.0-rc.8
 */
@event("item-toggle", {
	bubbles: true,
})

/**
 * Fired when the Delete button of any item is pressed.
 *
 * **Note:** A Delete button is displayed on each item,
 * when the component `selectionMode` property is set to `Delete`.
 * @param {HTMLElement} item the deleted item.
 * @public
 */
@event("item-delete", {
	bubbles: true,
})

/**
 * Fired when selection is changed by user interaction
 * in `Single`, `SingleStart`, `SingleEnd` and `Multiple` selection modes.
 * @param {Array<ListItemBase>} selectedItems An array of the selected items.
 * @param {Array<ListItemBase>} previouslySelectedItems An array of the previously selected items.
 * @public
 */
@event("selection-change", {
	bubbles: true,
	cancelable: true,
})

/**
 * Fired when the user scrolls to the bottom of the list.
 *
 * **Note:** The event is fired when the `growing='Scroll'` property is enabled.
 * @public
 * @since 1.0.0-rc.6
 */
@event("load-more", {
	bubbles: true,
})

/**
 * @private
 */
@event("item-focused", {
	bubbles: true,
})

/**
 * Fired when a movable list item is moved over a potential drop target during a dragging operation.
 *
 * If the new position is valid, prevent the default action of the event using `preventDefault()`.
 * @param {object} source Contains information about the moved element under `element` property.
 * @param {object} destination Contains information about the destination of the moved element. Has `element` and `placement` properties.
 * @public
 * @since 2.0.0
 */

@event("move-over", {
	bubbles: true,
	cancelable: true,
})

/**
 * Fired when a movable list item is dropped onto a drop target.
 *
 * **Note:** `move` event is fired only if there was a preceding `move-over` with prevented default action.
 * @param {object} source Contains information about the moved element under `element` property.
 * @param {object} destination Contains information about the destination of the moved element. Has `element` and `placement` properties.
 * @public
 */
@event("move", {
	bubbles: true,
})
class List extends UI5Element {
	eventDetails!: {
		"item-click": ListItemClickEventDetail,
		"item-close": ListItemCloseEventDetail,
		"item-toggle": ListItemToggleEventDetail,
		"item-delete": ListItemDeleteEventDetail,
		"selection-change": ListSelectionChangeEventDetail,
		"load-more": void,
		"item-focused": ListItemFocusEventDetail,
		"move-over": ListMoveEventDetail,
		"move": ListMoveEventDetail,
	}
	/**
	 * Defines the component header text.
	 *
	 * **Note:** If `header` is set this property is ignored.
	 * @default undefined
	 * @public
	 */
	@property()
	headerText?: string;

	/**
	 * Defines the footer text.
	 * @default undefined
	 * @public
	 */
	@property()
	footerText?: string;

	/**
	 * Determines whether the component is indented.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	indent = false;

	/**
	 * Defines the selection mode of the component.
	 * @default "None"
	 * @public
	 */
	@property()
	selectionMode: `${ListSelectionMode}` = "None";

	/**
	 * Defines the text that is displayed when the component contains no items.
	 * @default undefined
	 * @public
	 */
	@property()
	noDataText?: string;

	/**
	 * Defines the item separator style that is used.
	 * @default "All"
	 * @public
	 */
	@property()
	separators: `${ListSeparator}`= "All";

	/**
	 * Defines whether the component will have growing capability either by pressing a `More` button,
	 * or via user scroll. In both cases `load-more` event is fired.
	 *
	 * **Restrictions:** `growing="Scroll"` is not supported for Internet Explorer,
	 * on IE the component will fallback to `growing="Button"`.
	 * @default "None"
	 * @since 1.0.0-rc.13
	 * @public
	 */
	@property()
	growing: `${ListGrowingMode}` = "None";

	/**
	 * Defines the text that will be displayed inside the growing button.
	 *
	 * **Note:** If not specified a built-in text will be displayed.
	 *
	 * **Note:** This property takes effect if the `growing` property is set to the `Button`.
	 * @default undefined
	 * @since 1.24
	 * @public
	 */
	@property()
	growingButtonText?: string;

	/**
	 * Defines if the component would display a loading indicator over the list.
	 * @default false
	 * @public
	 * @since 1.0.0-rc.6
	 */
	@property({ type: Boolean })
	loading = false;

	/**
	 * Defines the delay in milliseconds, after which the loading indicator will show up for this component.
	 * @default 1000
	 * @public
	 */
	@property({ type: Number })
	loadingDelay = 1000;

	/**
	 * Indicates whether the List header is sticky or not.
	 * If stickyHeader is set to true, then whenever you scroll the content or
	 * the application, the header of the list will be always visible.
	 * @default false
	 * @public
	 * @since 2.19.0
	 */
	 @property({ type: Boolean })
	 stickyHeader = false;

	/**
	 * Defines the accessible name of the component.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleName?: string;

	/**
	* Defines additional accessibility attributes on different areas of the component.
 	*
	* The accessibilityAttributes object has the following field:
	*
	*  - **growingButton**: `growingButton.name`, `growingButton.description`.
	*
 	* The accessibility attributes support the following values:
 	*
	* - **name**: Defines the accessible ARIA name of the growing button.
	* Accepts any string.
	*
	* - **description**: Defines the accessible ARIA description of the growing button.
	* Accepts any string.
	*
 	* **Note:** The `accessibilityAttributes` property is in an experimental state and is a subject to change.
	* @default {}
 	* @public
 	* @since 2.13.0
 	*/
	 @property({ type: Object })
	 accessibilityAttributes: ListAccessibilityAttributes = {};

	/**
	 * Defines the IDs of the elements that label the component.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleNameRef?: string;

	/**
	 * Defines the accessible description of the component.
	 * @default undefined
	 * @public
	 * @since 2.5.0
	 */
	@property()
	accessibleDescription?: string;

	/**
	 * Defines the IDs of the elements that describe the component.
	 * @default undefined
	 * @public
	 * @since 2.5.0
	 */
	@property()
	accessibleDescriptionRef?: string;

	/**
	 * Constantly updated value of texts collected from the associated labels
	 * @private
	 */
	@property({ noAttribute: true })
	_associatedDescriptionRefTexts?: string;

	/**
	 * Constantly updated value of texts collected from the associated labels
	 * @private
	 */
	@property({ noAttribute: true })
	_associatedLabelsRefTexts?: string;

	/**
	 * Defines the accessible role of the component.
	 * @public
	 * @default "List"
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleRole: `${ListAccessibleRole}` = "List";

	/**
	 * Defines if the entire list is in view port.
	 * @private
	 */
	@property({ type: Boolean })
	_inViewport = false;

	/**
	 * Defines the active state of the `More` button.
	 * @private
	 */
	@property({ type: Boolean })
	_loadMoreActive = false;

	/**
	 * Defines the current media query size.
	 * @default "S"
	 * @private
	 */
	@property()
	mediaRange = "S";

	/**
	 * Defines the items of the component.
	 *
	 * **Note:** Use `ui5-li`, `ui5-li-custom`, and `ui5-li-group` for the intended design.
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
		invalidateOnChildChange: true,
	})
	items!: DefaultSlot<Array<ListItemBase | ListItemGroup>>;

	/**
	 * Defines the component header.
	 *
	 * **Note:** When `header` is set, the
	 * `headerText` property is ignored.
	 * @public
	 */
	@slot()
	header!: Slot<Array<HTMLElement>>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;
	_previouslyFocusedItem: ListItemBase | null;
	_forwardingFocus: boolean;
	_selectionRequested?: boolean;
	_groupCount: number;
	_groupItemCount: number;
	_endIntersectionObserver?: IntersectionObserver | null;
	_startIntersectionObserver?: IntersectionObserver | null;
	_itemNavigation: ItemNavigation;
	_beforeElement?: HTMLElement | null;
	_afterElement?: HTMLElement | null;
	_startMarkerOutOfView: boolean = false;
	_lastFocusedElementIndex?: number;

	handleResizeCallback: ResizeObserverCallback;
	onItemFocusedBound: (e: CustomEvent) => void;
	onForwardAfterBound: (e: CustomEvent) => void;
	onForwardBeforeBound: (e: CustomEvent) => void;
	onItemTabIndexChangeBound: (e: CustomEvent) => void;

	_dragAndDropHandler: DragAndDropHandler;

	constructor() {
		super();

		this._previouslyFocusedItem = null;

		// Indicates that the List is forwarding the focus before or after the internal ul.
		this._forwardingFocus = false;

		this._itemNavigation = new ItemNavigation(this, {
			skipItemsSize: PAGE_UP_DOWN_SIZE, // PAGE_UP and PAGE_DOWN will skip trough 10 items
			navigationMode: NavigationMode.Vertical,
			getItemsCallback: () => this.getEnabledItems(),
		});

		this.handleResizeCallback = this._handleResize.bind(this);

		this._groupCount = 0;
		this._groupItemCount = 0;

		this.onItemFocusedBound = this.onItemFocused.bind(this);
		this.onForwardAfterBound = this.onForwardAfter.bind(this);
		this.onForwardBeforeBound = this.onForwardBefore.bind(this);
		this.onItemTabIndexChangeBound = this.onItemTabIndexChange.bind(this);

		// Initialize the DragAndDropHandler with the necessary configurations
		// The handler will manage the drag and drop operations for the list items.
		this._dragAndDropHandler = new DragAndDropHandler(this, {
			getItems: () => this.items,
			getDropIndicator: () => this.dropIndicatorDOM,
			useOriginalEvent: true,
		});
	}

	/**
	 * Returns an array containing the list item instances without the groups in a flat structure.
	 * @default []
	 * @since 2.0.0
	 * @public
	 */
	get listItems(): ListItemBase[] {
		return this.getItems();
	}

	_updateAssociatedLabelsTexts() {
		this._associatedDescriptionRefTexts = getAllAccessibleDescriptionRefTexts(this);
		this._associatedLabelsRefTexts = getAllAccessibleNameRefTexts(this);
	}

	onEnterDOM() {
		registerUI5Element(this, this._updateAssociatedLabelsTexts.bind(this));
		ResizeHandler.register(this.getDomRef()!, this.handleResizeCallback);
	}

	onExitDOM() {
		deregisterUI5Element(this);
		this.unobserveListEnd();
		this.unobserveListStart();
		ResizeHandler.deregister(this.getDomRef()!, this.handleResizeCallback);
	}

	onBeforeRendering() {
		this.detachGroupHeaderEvents();
		this.prepareListItems();
	}

	onAfterRendering() {
		this.attachGroupHeaderEvents();
		if (this.growsOnScroll) {
			this.observeListEnd();
			this.observeListStart();
		} else {
			this.unobserveListEnd();
			this.unobserveListStart();
		}

		if (this.grows) {
			this.checkListInViewport();
		}
	}

	attachGroupHeaderEvents() {
		// events fired by the group headers are not bubbling through the shadow
		// dom of the groups because of capture: false of the custom events
		this.getItems().forEach(item => {
			if (item.hasAttribute("ui5-li-group-header")) {
				item.addEventListener("ui5-_focused", this.onItemFocusedBound as EventListener);
				item.addEventListener("ui5-forward-after", this.onForwardAfterBound as EventListener);
				item.addEventListener("ui5-forward-before", this.onForwardBeforeBound as EventListener);
			}
		});
	}

	detachGroupHeaderEvents() {
		this.getItems().forEach(item => {
			if (item.hasAttribute("ui5-li-group-header")) {
				item.removeEventListener("ui5-_focused", this.onItemFocusedBound as EventListener);
				item.removeEventListener("ui5-forward-after", this.onForwardAfterBound as EventListener);
				item.removeEventListener("ui5-forward-before", this.onForwardBeforeBound as EventListener);
			}
		});
	}

	getFocusDomRef() {
		return this._itemNavigation._getCurrentItem();
	}

	get shouldRenderH1() {
		return !this.header.length && this.headerText;
	}

	get headerID() {
		return `${this._id}-header`;
	}

	get modeLabelID() {
		return `${this._id}-modeLabel`;
	}

	get listEndDOM() {
		return this.shadowRoot!.querySelector(".ui5-list-end-marker");
	}

	get listStartDOM() {
		return this.shadowRoot!.querySelector(".ui5-list-start-marker");
	}

	get dropIndicatorDOM(): DropIndicator | null {
		return this.shadowRoot!.querySelector("[ui5-drop-indicator]");
	}

	get hasData() {
		return this.getItems().length !== 0;
	}

	get showBusyIndicatorOverlay() {
		return !this.growsWithButton && this.loading;
	}

	get showNoDataText() {
		return !this.hasData && this.noDataText;
	}

	get isDelete() {
		return this.selectionMode === ListSelectionMode.Delete;
	}

	get isSingleSelect() {
		return [
			ListSelectionMode.Single,
			ListSelectionMode.SingleStart,
			ListSelectionMode.SingleEnd,
			ListSelectionMode.SingleAuto,
		].includes(this.selectionMode as ListSelectionMode);
	}

	get isMultiple() {
		return this.selectionMode === ListSelectionMode.Multiple;
	}

	get ariaLabelledBy() {
		if (this.accessibleNameRef || this.accessibleName) {
			return undefined;
		}
		const ids = [];

		if (this.isMultiple || this.isSingleSelect || this.isDelete) {
			ids.push(this.modeLabelID);
		}

		if (this.shouldRenderH1) {
			ids.push(this.headerID);
		}

		return ids.length ? ids.join(" ") : undefined;
	}

	get ariaLabelTxt() {
		return this._associatedLabelsRefTexts || getEffectiveAriaLabelText(this);
	}

	get ariaDescriptionText() {
		return this._associatedDescriptionRefTexts || getEffectiveAriaDescriptionText(this) || this._getDescriptionForGroups();
	}

	get growingButtonAriaLabel() {
		return this.accessibilityAttributes.growingButton?.name;
	}

	get growingButtonAriaLabelledBy() {
		return this.accessibilityAttributes.growingButton?.name ? undefined : `${this._id}-growingButton-text`;
	}

	get growingButtonAriaDescribedBy() {
		return this.accessibilityAttributes.growingButton?.description ? `${this._id}-growingButton-description` : undefined;
	}

	hasGrowingComponent(): boolean {
		if (this.growsOnScroll) {
			return this._startMarkerOutOfView;
		}

		return this.growsWithButton;
	}

	_getDescriptionForGroups(): string {
		let description = "";

		if (this._groupCount > 0) {
			if (this.accessibleRole === ListAccessibleRole.List) {
				description = List.i18nBundle.getText(LIST_ROLE_LIST_GROUP_DESCRIPTION, this._groupCount, this._groupItemCount);
			} else if (this.accessibleRole === ListAccessibleRole.ListBox) {
				description = List.i18nBundle.getText(LIST_ROLE_LISTBOX_GROUP_DESCRIPTION, this._groupCount);
			}
		}

		return description;
	}

	get ariaLabelModeText(): string {
		if (this.hasData) {
			if (this.isMultiple) {
				return List.i18nBundle.getText(ARIA_LABEL_LIST_MULTISELECTABLE);
			}
			if (this.isSingleSelect) {
				return List.i18nBundle.getText(ARIA_LABEL_LIST_SELECTABLE);
			}
			if (this.isDelete) {
				return List.i18nBundle.getText(ARIA_LABEL_LIST_DELETABLE);
			}
		}

		return "";
	}

	get grows() {
		return this.growing !== ListGrowingMode.None;
	}

	get growsOnScroll() {
		return this.growing === ListGrowingMode.Scroll;
	}

	get growsWithButton() {
		return this.growing === ListGrowingMode.Button;
	}

	get _growingButtonText(): string {
		return this.growingButtonText || List.i18nBundle.getText(LOAD_MORE_TEXT);
	}

	get listAccessibleRole() {
		return toLowercaseEnumValue(this.accessibleRole);
	}

	get classes(): ClassMap {
		return {
			root: {
				"ui5-list-root": true,
			},
		};
	}

	prepareListItems() {
		const slottedItems = this.getItemsForProcessing();

		slottedItems.forEach((item, key) => {
			const isLastChild = key === slottedItems.length - 1;
			const showBottomBorder = this.separators === ListSeparator.All
				|| (this.separators === ListSeparator.Inner && !isLastChild);

			if (item.hasConfigurableMode) {
				(item as ListItem)._selectionMode = this.selectionMode;
			}
			item.hasBorder = showBottomBorder;

			(item as ListItem).mediaRange = this.mediaRange;
		});
	}

	async observeListEnd() {
		await renderFinished();
		this.getEndIntersectionObserver().observe(this.listEndDOM!);
	}

	unobserveListEnd() {
		if (this._endIntersectionObserver) {
			this._endIntersectionObserver.disconnect();
			this._endIntersectionObserver = null;
		}
	}

	async observeListStart() {
		await renderFinished();
		this.getStartIntersectionObserver().observe(this.listStartDOM!);
	}

	unobserveListStart() {
		if (this._startIntersectionObserver) {
			this._startIntersectionObserver.disconnect();
			this._startIntersectionObserver = null;
		}
	}

	onEndIntersection(entries: Array<IntersectionObserverEntry>) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				debounce(this.loadMore.bind(this), INFINITE_SCROLL_DEBOUNCE_RATE);
			}
		});
	}

	onStartIntersection(entries: Array<IntersectionObserverEntry>) {
		entries.forEach(entry => {
			this._startMarkerOutOfView = !entry.isIntersecting;
		});
	}

	/*
	* ITEM SELECTION BASED ON THE CURRENT MODE
	*/
	onSelectionRequested(e: CustomEvent<SelectionRequestEventDetail>) {
		const previouslySelectedItems = this.getSelectedItems();
		let selectionChange = false;

		if (this.selectionMode !== ListSelectionMode.None && this[`handle${this.selectionMode}`]) {
			selectionChange = this[`handle${this.selectionMode}`](e.detail.item, !!e.detail.selected);
		}

		if (selectionChange) {
			const changePrevented = !this.fireDecoratorEvent("selection-change", {
				selectedItems: this.getSelectedItems(),
				previouslySelectedItems,
				selectionComponentPressed: e.detail.selectionComponentPressed,
				targetItem: e.detail.item,
				key: e.detail.key,
			});
			if (changePrevented) {
				this._revertSelection(previouslySelectedItems);
			}
		}
	}

	handleSingle(item: ListItemBase): boolean {
		if (item.selected) {
			return false;
		}

		this.deselectSelectedItems();
		item.selected = true;

		return true;
	}

	handleSingleStart(item: ListItemBase): boolean {
		return this.handleSingle(item);
	}

	handleSingleEnd(item: ListItemBase): boolean {
		return this.handleSingle(item);
	}

	handleSingleAuto(item: ListItemBase): boolean {
		return this.handleSingle(item);
	}

	handleMultiple(item: ListItemBase, selected: boolean): boolean {
		item.selected = selected;
		return true;
	}

	handleDelete(item: ListItemBase): boolean {
		this.fireDecoratorEvent("item-delete", { item });

		return true;
	}

	deselectSelectedItems() {
		this.getSelectedItems().forEach(item => { item.selected = false; });
	}

	getSelectedItems(): Array<ListItemBase> {
		return this.getItems().filter(item => item.selected);
	}

	getEnabledItems(): Array<ListItemBase> {
		return this.getItems().filter(item => item._focusable);
	}

	getItems(): Array<ListItemBase> {
		// drill down when we see ui5-li-group and get the items
		const items: ListItemBase[] = [];
		const slottedItems = this.getSlottedNodes<ListItemBase>("items");
		let groupCount = 0;
		let groupItemCount = 0;

		slottedItems.forEach(item => {
			if (isInstanceOfListItemGroup(item)) {
				const groupItems = [item.groupHeaderItem, ...item.items.filter(listItem => listItem.assignedSlot)].filter(Boolean);
				items.push(...groupItems);
				groupCount++;
				// subtract group itself for proper group header item count
				groupItemCount += groupItems.length - 1;
			} else {
				item.assignedSlot && items.push(item);
			}
		});

		this._groupCount = groupCount;
		this._groupItemCount = groupItemCount;

		return items;
	}

	getItemsForProcessing(): Array<ListItemBase> {
		return this.getItems();
	}

	_revertSelection(previouslySelectedItems: Array<ListItemBase>) {
		this.getItems().forEach((item: ListItemBase) => {
			const oldSelection = previouslySelectedItems.indexOf(item) !== -1;
			const multiSelectCheckBox = item.shadowRoot!.querySelector<CheckBox>(".ui5-li-multisel-cb");
			const singleSelectRadioButton = item.shadowRoot!.querySelector<RadioButton>(".ui5-li-singlesel-radiobtn");

			item.selected = oldSelection;
			if (multiSelectCheckBox) {
				multiSelectCheckBox.checked = oldSelection;
			} else if (singleSelectRadioButton) {
				singleSelectRadioButton.checked = oldSelection;
			}
		});
	}

	_onkeydown(e: KeyboardEvent) {
		if (isEnd(e)) {
			this._handleEnd();
			e.preventDefault();
			return;
		}

		if (isHome(e)) {
			this._handleHome();
			return;
		}

		// Handle Arrow Up/Down navigation between internal elements
		const isArrowKey = isUp(e) || isDown(e);
		const listItem = this._getClosestListItem(e.target as HTMLElement);
		if (listItem?._isFocusOnInternalElement() && isArrowKey) {
			const offset = isUp(e) ? -1 : 1;
			if (this._navigateToAdjacentItem(listItem, offset)) {
				e.preventDefault();
				return;
			}
		}

		if (isDown(e)) {
			this._handleDown(e);
			return;
		}

		if (isCtrl(e)) {
			this._moveItem(e.target as ListItemBase, e);
			return;
		}

		if (isTabNext(e)) {
			this._handleTabNext(e);
		}

		if (isF7(e)) {
			this._handleF7(e);
		}
	}

	_handleF7(e: KeyboardEvent) {
		const listItem = this._getClosestListItem(e.target as HTMLElement);
		if (!listItem || !listItem._hasFocusableElements()) {
			return;
		}

		const listItemDomRef = listItem.getFocusDomRef()!;
		const activeElement = getActiveElement();

		e.preventDefault();

		if (activeElement === listItemDomRef) {
			listItem._focusInternalElement(this._lastFocusedElementIndex ?? 0);
			this._lastFocusedElementIndex = listItem._getFocusedElementIndex();
		} else {
			this._lastFocusedElementIndex = listItem._getFocusedElementIndex();
			listItemDomRef.focus();
		}
	}

	_getClosestListItem(element: HTMLElement): ListItem | null {
		const listItem = element.closest<ListItem>("[ui5-li], [ui5-li-custom]");
		return listItem;
	}

	_moveItem(item: ListItemBase, e: KeyboardEvent) {
		if (!item || !item.movable) {
			return;
		}

		const closestPositions = findClosestPositionsByKey(this.items, item, e);

		if (!closestPositions.length) {
			return;
		}

		e.preventDefault();

		const acceptedPosition = closestPositions.find(({ element, placement }) => {
			return !this.fireDecoratorEvent("move-over", {
				originalEvent: e,
				source: {
					element: item,
				},
				destination: {
					element,
					placement,
				},
			});
		});

		if (acceptedPosition) {
			this.fireDecoratorEvent("move", {
				originalEvent: e,
				source: {
					element: item,
				},
				destination: {
					element: acceptedPosition.element,
					placement: acceptedPosition.placement,
				},
			});

			item.focus();
		}
	}

	_onLoadMoreKeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
			this._loadMoreActive = true;
		}

		if (isEnter(e)) {
			this._onLoadMoreClick();
			this._loadMoreActive = true;
		}

		if (isTabNext(e)) {
			this.focusAfterElement();
		}

		if (isUp(e)) {
			this._handleLodeMoreUp(e);
			return;
		}

		if (isTabPrevious(e)) {
			if (this.getPreviouslyFocusedItem()) {
				this.focusPreviouslyFocusedItem();
			} else {
				this.focusFirstItem();
			}
			e.preventDefault();
		}
	}

	_onLoadMoreKeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._onLoadMoreClick();
		}
		this._loadMoreActive = false;
	}

	_onLoadMoreMousedown() {
		this._loadMoreActive = true;
	}

	_onLoadMoreMouseup() {
		this._loadMoreActive = false;
	}

	_onLoadMoreClick() {
		this.loadMore();
	}

	_handleLodeMoreUp(e: KeyboardEvent) {
		const growingButton = this.getGrowingButton();

		if (growingButton === e.target) {
			const items = this.getItems();
			const lastItem = items[items.length - 1];

			this.focusItem(lastItem);

			e.preventDefault();
			e.stopImmediatePropagation();
		}
	}

	checkListInViewport() {
		this._inViewport = isElementInView(this.getDomRef()!);
	}

	loadMore() {
		if (this.hasGrowingComponent()) {
			this.fireDecoratorEvent("load-more");
		}
	}

	_handleResize() {
		this.checkListInViewport();

		const width = this.getBoundingClientRect().width;
		this.mediaRange = MediaRange.getCurrentRange(MediaRange.RANGESETS.RANGE_4STEPS, width);
	}

	/*
	* KEYBOARD SUPPORT
	*/
	_handleTabNext(e: KeyboardEvent) {
		let lastTabbableEl;
		const target = getNormalizedTarget(e.target as HTMLElement);

		if (!lastTabbableEl) {
			return;
		}

		if (lastTabbableEl === target) {
			if (this.getFirstItem(x => x.selected && x._focusable)) {
				this.focusFirstSelectedItem();
			} else if (this.getPreviouslyFocusedItem()) {
				this.focusPreviouslyFocusedItem();
			} else {
				this.focusFirstItem();
			}

			e.stopImmediatePropagation();
			e.preventDefault();
		}
	}

	_handleHome() {
		if (!this.growsWithButton) {
			return;
		}

		this.focusFirstItem();
	}

	_handleEnd() {
		if (!this.growsWithButton) {
			return;
		}

		if (this._shouldFocusGrowingButton()) {
			this.focusGrowingButton();
		}
	}

	_handleDown(e: KeyboardEvent) {
		if (this._shouldFocusGrowingButton()) {
			this.focusGrowingButton();
			e.preventDefault();
		}
	}

	_navigateToAdjacentItem(listItem: ListItem, offset: -1 | 1): boolean {
		const targetInternalElementIndex = listItem?._getFocusedElementIndex();
		if (targetInternalElementIndex === undefined || targetInternalElementIndex === -1) {
			return false;
		}

		const allItems = this.getItems().filter(node => {
			return "hasConfigurableMode" in node && node.hasConfigurableMode
				&& (node as ListItem)._hasFocusableElements();
		}) as ListItem[];

		const itemIndex = allItems.indexOf(listItem) + offset;
		const nextNode = allItems[itemIndex];

		if (!nextNode) {
			return false;
		}

		const focusedIndex = nextNode._focusInternalElement(targetInternalElementIndex);
		if (focusedIndex !== undefined) {
			this._lastFocusedElementIndex = focusedIndex;
		}
		return true;
	}

	_onfocusin(e: FocusEvent) {
		const target = getNormalizedTarget(e.target as HTMLElement);
		// If the focusin event does not origin from one of the 'triggers' - ignore it.
		if (!this.isForwardElement(target)) {
			return;
		}

		// The focus arrives in the List for the first time.
		// If there is selected item - focus it or focus the first item.
		if (!this.getPreviouslyFocusedItem()) {
			if (this.growsWithButton && this.isForwardAfterElement(target)) {
				this.focusGrowingButton();
			} else {
				this.focusFirstItem();
			}
			e.stopImmediatePropagation();
			return;
		}

		// The focus returns to the List,
		// focus the first selected item or the previously focused element.
		if (!this.getForwardingFocus()) {
			if (this.growsWithButton && this.isForwardAfterElement(target)) {
				this.focusGrowingButton();
				e.stopImmediatePropagation();
				return;
			}

			this.focusPreviouslyFocusedItem();
		}

		e.stopImmediatePropagation();
		this.setForwardingFocus(false);
	}

	_ondragenter(e: DragEvent) {
		this._dragAndDropHandler.ondragenter(e);
	}

	_ondragleave(e: DragEvent) {
		this._dragAndDropHandler.ondragleave(e);
	}

	_ondragover(e: DragEvent) {
		this._dragAndDropHandler.ondragover(e);
	}

	_ondrop(e: DragEvent) {
		this._dragAndDropHandler.ondrop(e);
	}

	isForwardElement(element: HTMLElement) {
		const elementId = element.id;
		const beforeElement = this.getBeforeElement();

		if (this._id === elementId || (beforeElement && beforeElement.id === elementId)) {
			return true;
		}

		return this.isForwardAfterElement(element);
	}

	isForwardAfterElement(element: HTMLElement) {
		const elementId = element.id;
		const afterElement = this.getAfterElement();

		return afterElement && afterElement.id === elementId;
	}

	onItemTabIndexChange(e: CustomEvent) {
		e.stopPropagation();
		const target = e.target as ListItemBase;
		this._itemNavigation.setCurrentItem(target);
	}

	onItemFocused(e: CustomEvent) {
		const target = e.target as ListItemBase;

		e.stopPropagation();

		this._itemNavigation.setCurrentItem(target);
		this.fireDecoratorEvent("item-focused", { item: target });

		if (this.selectionMode === ListSelectionMode.SingleAuto) {
			const detail: SelectionRequestEventDetail = {
				item: target,
				selectionComponentPressed: false,
				selected: true,
				key: e.detail.key,
			};

			this.onSelectionRequested({ detail } as CustomEvent<SelectionRequestEventDetail>);
		}
	}

	onItemPress(e: CustomEvent<ListItemBasePressEventDetail>) {
		const pressedItem = e.detail.item;

		if (!this.fireDecoratorEvent("item-click", { item: pressedItem })) {
			return;
		}

		if (this.selectionMode !== ListSelectionMode.Delete) {
			const detail: SelectionRequestEventDetail = {
				item: pressedItem,
				selectionComponentPressed: false,
				selected: !pressedItem.selected,
				key: e.detail.key,
			};

			this.onSelectionRequested({ detail } as CustomEvent<SelectionRequestEventDetail>);
		}
	}

	// This is applicable to NotificationListItem
	onItemClose(e: CustomEvent<ListItemCloseEventDetail>) {
		const target = e.target as UI5Element | null;
		const shouldFireItemClose = target?.hasAttribute("ui5-li-notification") || target?.hasAttribute("ui5-li-notification-group");

		if (shouldFireItemClose) {
			this.fireDecoratorEvent("item-close", { item: e.detail?.item });
		}
	}

	onItemToggle(e: CustomEvent<ListItemToggleEventDetail>) {
		if (!(e.target as any)?.isListItemBase) {
			return;
		}

		this.fireDecoratorEvent("item-toggle", { item: e.detail.item });
	}

	onForwardBefore(e: CustomEvent) {
		this.setPreviouslyFocusedItem(e.target as ListItemBase);
		this.focusBeforeElement();
		e.stopPropagation();
	}

	onForwardAfter(e: CustomEvent) {
		this.setPreviouslyFocusedItem(e.target as ListItemBase);

		if (!this.growsWithButton) {
			this.focusAfterElement();
		} else {
			this.focusGrowingButton();
			e.preventDefault();
		}

		e.stopPropagation();
	}

	focusBeforeElement() {
		this.setForwardingFocus(true);
		this.getBeforeElement().focus();
	}

	focusAfterElement() {
		this.setForwardingFocus(true);
		this.getAfterElement().focus();
	}

	focusGrowingButton() {
		const growingBtn = this.getGrowingButton();

		if (growingBtn) {
			growingBtn.focus();
		}
	}

	_shouldFocusGrowingButton() {
		if (!this.growsWithButton) {
			return false;
		}
		const items = this.getItems();
		const lastIndex = items.length - 1;
		const currentIndex = this._itemNavigation._currentIndex;

		return currentIndex !== -1 && currentIndex === lastIndex;
	}

	getGrowingButton() {
		return this.shadowRoot!.querySelector(`[id="${this._id}-growing-btn"]`) as HTMLElement;
	}

	/**
	 * Focuses the first list item and sets its tabindex to "0" via the ItemNavigation
	 * @protected
	 */
	focusFirstItem() {
		// only enabled items are focusable
		const firstItem = this.getFirstItem(x => x._focusable);

		if (firstItem) {
			firstItem.focus();
		}
	}

	focusPreviouslyFocusedItem() {
		const previouslyFocusedItem = this.getPreviouslyFocusedItem();

		if (previouslyFocusedItem) {
			previouslyFocusedItem.focus();
		}
	}

	focusFirstSelectedItem() {
		// only enabled items are focusable
		const firstSelectedItem = this.getFirstItem(x => x.selected && x._focusable);

		if (firstSelectedItem) {
			firstSelectedItem.focus();
		}
	}

	/**
	 * Focuses a list item and sets its tabindex to "0" via the ItemNavigation
	 * @protected
	 * @param item
	 */
	focusItem(item: ListItemBase) {
		this._itemNavigation.setCurrentItem(item);
		item.focus();
	}

	onFocusRequested(e: CustomEvent) {
		setTimeout(() => {
			this.setPreviouslyFocusedItem(e.target as ListItemBase);
			this.focusPreviouslyFocusedItem();
		}, 0);
	}

	setForwardingFocus(forwardingFocus: boolean) {
		this._forwardingFocus = forwardingFocus;
	}

	getForwardingFocus() {
		return this._forwardingFocus;
	}

	setPreviouslyFocusedItem(item: ListItemBase) {
		this._previouslyFocusedItem = item;
	}

	getPreviouslyFocusedItem() {
		return this._previouslyFocusedItem;
	}

	getFirstItem(filter: (item: ListItemBase) => boolean): ListItemBase | null {
		const slottedItems = this.getItems();
		let firstItem = null;

		if (!filter) {
			return slottedItems.length ? slottedItems[0] : null;
		}

		for (let i = 0; i < slottedItems.length; i++) {
			if (filter(slottedItems[i])) {
				firstItem = slottedItems[i];
				break;
			}
		}

		return firstItem;
	}

	getAfterElement() {
		if (!this._afterElement) {
			this._afterElement = this.shadowRoot!.querySelector(`[id="${this._id}-after"]`) as HTMLElement;
		}
		return this._afterElement;
	}

	getBeforeElement() {
		if (!this._beforeElement) {
			this._beforeElement = this.shadowRoot!.querySelector(`[id="${this._id}-before"]`) as HTMLElement;
		}
		return this._beforeElement;
	}

	getEndIntersectionObserver() {
		if (!this._endIntersectionObserver) {
			this._endIntersectionObserver = new IntersectionObserver(this.onEndIntersection.bind(this), {
				root: null, // null means the viewport
				rootMargin: "0px",
				threshold: 1.0,
			});
		}

		return this._endIntersectionObserver;
	}

	getStartIntersectionObserver() {
		if (!this._startIntersectionObserver) {
			this._startIntersectionObserver = new IntersectionObserver(this.onStartIntersection.bind(this), {
				root: null, // null means the viewport
				rootMargin: "0px",
				threshold: 1.0,
			});
		}

		return this._startIntersectionObserver;
	}
}

List.define();

export default List;
export type {
	ListItemClickEventDetail,
	ListItemFocusEventDetail,
	ListItemDeleteEventDetail,
	ListItemCloseEventDetail,
	ListItemToggleEventDetail,
	ListSelectionChangeEventDetail,
	ListMoveEventDetail,
	ListAccessibilityAttributes,
};
