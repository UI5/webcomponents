import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import {
	isTabNext,
	isSpace,
	isEnter,
	isTabPrevious,
} from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import DragRegistry from "@ui5/webcomponents-base/dist/util/dragAndDrop/DragRegistry.js";
import findClosestPosition from "@ui5/webcomponents-base/dist/util/dragAndDrop/findClosestPosition.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import getNormalizedTarget from "@ui5/webcomponents-base/dist/util/getNormalizedTarget.js";
import getEffectiveScrollbarStyle from "@ui5/webcomponents-base/dist/util/getEffectiveScrollbarStyle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import debounce from "@ui5/webcomponents-base/dist/util/debounce.js";
import isElementInView from "@ui5/webcomponents-base/dist/util/isElementInView.js";
import Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import ListMode from "./types/ListMode.js";
import ListGrowingMode from "./types/ListGrowingMode.js";
import ListItemBase from "./ListItemBase.js";
import DropIndicator from "./DropIndicator.js";
import type ListItem from "./ListItem.js";
import type {
	SelectionRequestEventDetail,
	PressEventDetail,
} from "./ListItem.js";
import ListSeparators from "./types/ListSeparators.js";
import BusyIndicator from "./BusyIndicator.js";

// Template
import ListTemplate from "./generated/templates/ListTemplate.lit.js";

// Styles
import listCss from "./generated/themes/List.css.js";

// Texts
import {
	LOAD_MORE_TEXT, ARIA_LABEL_LIST_SELECTABLE,
	ARIA_LABEL_LIST_MULTISELECTABLE,
	ARIA_LABEL_LIST_DELETABLE,
} from "./generated/i18n/i18n-defaults.js";
import CheckBox from "./CheckBox.js";
import RadioButton from "./RadioButton.js";

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

type ListMoveEventDetail = {
	source: {
		element: HTMLElement,
	},
	destination: {
		element: HTMLElement,
		placement: `${MovePlacement}`,
	}
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
 * - `ui5-li-groupheader`
 *
 * To benefit from the built-in selection mechanism, you can use the available
 * selection modes, such as
 * `SingleSelect`, `MultiSelect` and `Delete`.
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
 * when the `mode` property is in use:
 *
 * - [Space] - Select an item (if `type` is 'Active') when `mode` is selection
 * - [Delete] - Delete an item if `mode` property is `Delete`
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
 * `import "@ui5/webcomponents/dist/StandardListItem.js";` (for `ui5-li`)
 *
 * `import "@ui5/webcomponents/dist/CustomListItem.js";` (for `ui5-li-custom`)
 *
 * `import "@ui5/webcomponents/dist/GroupHeaderListItem.js";` (for `ui5-li-groupheader`)
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "ui5-list",
	fastNavigation: true,
	renderer: litRender,
	template: ListTemplate,
	styles: [getEffectiveScrollbarStyle(), listCss],
	dependencies: [BusyIndicator, DropIndicator],
})
/**
 * Fired when an item is activated, unless the item's `type` property
 * is set to `Inactive`.
 * @allowPreventDefault
 * @param {HTMLElement} item The clicked item.
 * @public
 */
@event<ListItemClickEventDetail>("item-click", {
	detail: {
		/**
		 * @public
		 */
		item: { type: HTMLElement },
	},
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
@event<ListItemCloseEventDetail>("item-close", {
	detail: {
		/**
		 * @public
		 */
		item: { type: HTMLElement },
	},
})

/**
 * Fired when the `Toggle` button of any item is clicked.
 *
 * **Note:** This event is only applicable to list items that can be toggled (such as notification group list items).
 * @param {HTMLElement} item the toggled item.
 * @public
 * @since 1.0.0-rc.8
 */
@event<ListItemToggleEventDetail>("item-toggle", {
	detail: {
		/**
		 * @public
		 */
		item: { type: HTMLElement },
	},
})

/**
 * Fired when the Delete button of any item is pressed.
 *
 * **Note:** A Delete button is displayed on each item,
 * when the component `mode` property is set to `Delete`.
 * @param {HTMLElement} item the deleted item.
 * @public
 */
@event<ListItemDeleteEventDetail>("item-delete", {
	detail: {
		/**
		 * @public
		 */
		item: { type: HTMLElement },
	},
})

/**
 * Fired when selection is changed by user interaction
 * in `SingleSelect`, `SingleSelectBegin`, `SingleSelectEnd` and `MultiSelect` modes.
 * @allowPreventDefault
 * @param {Array<ListItemBase>} selectedItems An array of the selected items.
 * @param {Array<ListItemBase>} previouslySelectedItems An array of the previously selected items.
 * @public
 */
@event<ListSelectionChangeEventDetail>("selection-change", {
	detail: {
		/**
		 * @public
		 */
		selectedItems: { type: Array },
		/**
		 * @public
		 */
		previouslySelectedItems: { type: Array },
		/**
		 * protected, holds the event target item
		 * @protected
		 */
		targetItem: { type: HTMLElement },
		/**
		 * protected, indicates if the user used the selection components to change the selection
		 * @protected
		 */
		selectionComponentPressed: { type: Boolean },
		/**
		 * @private
		 */
		key: { type: String },
	},
})

/**
 * Fired when the user scrolls to the bottom of the list.
 *
 * **Note:** The event is fired when the `growing='Scroll'` property is enabled.
 * @public
 * @since 1.0.0-rc.6
 */
@event("load-more")

/**
 * @private
 */
@event<ListItemFocusEventDetail>("item-focused", {
	detail: {
		item: { type: HTMLElement },
	},
})
class List extends UI5Element {
	/**
	 * Defines the component header text.
	 *
	 * **Note:** If `header` is set this property is ignored.
	 * @default ""
	 * @public
	 */
	@property()
	headerText!: string;

	/**
	 * Defines the footer text.
	 * @default ""
	 * @public
	 */
	@property()
	footerText!: string;

	/**
	 * Determines whether the component is indented.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	indent!: boolean;

	/**
	 * Defines the mode of the component.
	 * @default "None"
	 * @public
	 */
	@property({ type: ListMode, defaultValue: ListMode.None })
	mode!: `${ListMode}`;

	/**
	 * Defines the text that is displayed when the component contains no items.
	 * @default ""
	 * @public
	 */
	@property()
	noDataText!: string;

	/**
	 * Defines the item separator style that is used.
	 * @default "All"
	 * @public
	 */
	@property({ type: ListSeparators, defaultValue: ListSeparators.All })
	separators!: `${ListSeparators}`;

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
	@property({ type: ListGrowingMode, defaultValue: ListGrowingMode.None })
	growing!: `${ListGrowingMode}`;

	/**
	 * Defines the text that will be displayed inside the growing button.
	 *
	 * **Note:** If not specified a built-in text will be displayed.
	 *
	 * **Note:** This property takes effect if the `growing` property is set to the `Button`.
	 * @default ""
	 * @since 1.24
	 * @public
	 */
	@property()
	growingButtonText!: string;

	/**
	 * Defines if the component would display a loading indicator over the list.
	 * @default false
	 * @public
	 * @since 1.0.0-rc.6
	 */
	@property({ type: Boolean })
	busy!: boolean;

	/**
	 * Defines the delay in milliseconds, after which the busy indicator will show up for this component.
	 * @default 1000
	 * @public
	 */
	@property({ validator: Integer, defaultValue: 1000 })
	busyDelay!: number;

	/**
	 * Defines the accessible name of the component.
	 * @default ""
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleName!: string;

	/**
	 * Defines the IDs of the elements that label the input.
	 * @default ""
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property({ defaultValue: "" })
	accessibleNameRef!: string;

	/**
	 * Defines the accessible role of the component.
	 * @public
	 * @default "list"
	 * @since 1.0.0-rc.15
	 */
	@property({ defaultValue: "list" })
	accessibleRole!: string;

	/**
	 * Defines the description for the accessible role of the component.
	 * @protected
	 * @default undefined
	 * @since 1.10.0
	 */
	@property({ defaultValue: undefined, noAttribute: true })
	accessibleRoleDescription?: string;

	/**
	 * Defines if the entire list is in view port.
	 * @private
	 */
	@property({ type: Boolean })
	_inViewport!: boolean;

	/**
	 * Defines the active state of the `More` button.
	 * @private
	 */
	@property({ type: Boolean })
	_loadMoreActive!: boolean;

	/**
	 * Defines the items of the component.
	 *
	 * **Note:** Use `ui5-li`, `ui5-li-custom`, and `ui5-li-groupheader` for the intended design.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	items!: Array<ListItemBase>;

	/**
	 * Defines the component header.
	 *
	 * **Note:** When `header` is set, the
	 * `headerText` property is ignored.
	 * @public
	 */
	@slot()
	header!: Array<HTMLElement>;

	static i18nBundle: I18nBundle;
	_previouslyFocusedItem: ListItemBase | null;
	_forwardingFocus: boolean;
	resizeListenerAttached: boolean;
	listEndObserved: boolean;
	_handleResize: ResizeObserverCallback;
	initialIntersection: boolean;
	_selectionRequested?: boolean;
	growingIntersectionObserver?: IntersectionObserver | null;
	_itemNavigation: ItemNavigation;
	_beforeElement?: HTMLElement | null;
	_afterElement?: HTMLElement | null;

	static async onDefine() {
		List.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();

		this._previouslyFocusedItem = null;

		// Indicates that the List is forwarding the focus before or after the internal ul.
		this._forwardingFocus = false;

		// Indicates that the List has already subscribed for resize.
		this.resizeListenerAttached = false;

		// Indicates if the IntersectionObserver started observing the List
		this.listEndObserved = false;

		this._itemNavigation = new ItemNavigation(this, {
			skipItemsSize: PAGE_UP_DOWN_SIZE, // PAGE_UP and PAGE_DOWN will skip trough 10 items
			navigationMode: NavigationMode.Vertical,
			getItemsCallback: () => this.getEnabledItems(),
		});

		this._handleResize = this.checkListInViewport.bind(this);

		this._handleResize = this.checkListInViewport.bind(this);

		// Indicates the List bottom most part has been detected by the IntersectionObserver
		// for the first time.
		this.initialIntersection = true;
	}

	onEnterDOM() {
		DragRegistry.subscribe(this);
	}

	onExitDOM() {
		this.unobserveListEnd();
		this.resizeListenerAttached = false;
		ResizeHandler.deregister(this.getDomRef()!, this._handleResize);
		DragRegistry.unsubscribe(this);
	}

	onBeforeRendering() {
		this.prepareListItems();
	}

	onAfterRendering() {
		if (this.growsOnScroll) {
			this.observeListEnd();
		} else if (this.listEndObserved) {
			this.unobserveListEnd();
		}

		if (this.grows) {
			this.checkListInViewport();
			this.attachForResize();
		}
	}

	attachForResize() {
		if (!this.resizeListenerAttached) {
			this.resizeListenerAttached = true;
			ResizeHandler.register(this.getDomRef()!, this._handleResize);
		}
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

	get dropIndicatorDOM(): DropIndicator | null {
		return this.shadowRoot!.querySelector("[ui5-drop-indicator]");
	}

	get hasData() {
		return this.getItems().length !== 0;
	}

	get showNoDataText() {
		return !this.hasData && this.noDataText;
	}

	get isDelete() {
		return this.mode === ListMode.Delete;
	}

	get isSingleSelect() {
		return [
			ListMode.SingleSelect,
			ListMode.SingleSelectBegin,
			ListMode.SingleSelectEnd,
			ListMode.SingleSelectAuto,
		].includes(this.mode as ListMode);
	}

	get isMultiSelect() {
		return this.mode === ListMode.MultiSelect;
	}

	get ariaLabelledBy() {
		if (this.accessibleNameRef || this.accessibleName) {
			return undefined;
		}
		const ids = [];

		if (this.isMultiSelect || this.isSingleSelect || this.isDelete) {
			ids.push(this.modeLabelID);
		}

		if (this.shouldRenderH1) {
			ids.push(this.headerID);
		}

		return ids.length ? ids.join(" ") : undefined;
	}

	get ariaLabelTxt() {
		return getEffectiveAriaLabelText(this);
	}

	get ariaLabelModeText(): string {
		if (this.hasData) {
			if (this.isMultiSelect) {
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

	get busyIndPosition() {
		if (!this.grows) {
			return "absolute";
		}

		return this._inViewport ? "absolute" : "sticky";
	}

	get styles() {
		return {
			busyInd: {
				position: this.busyIndPosition,
			},
		};
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
			const showBottomBorder = this.separators === ListSeparators.All
				|| (this.separators === ListSeparators.Inner && !isLastChild);

			if (item.hasConfigurableMode) {
				(item as ListItem)._mode = this.mode;
			}
			item.hasBorder = showBottomBorder;
		});
	}

	async observeListEnd() {
		if (!this.listEndObserved) {
			await renderFinished();
			this.getIntersectionObserver().observe(this.listEndDOM!);
			this.listEndObserved = true;
		}
	}

	unobserveListEnd() {
		if (this.growingIntersectionObserver) {
			this.growingIntersectionObserver.disconnect();
			this.growingIntersectionObserver = null;
			this.listEndObserved = false;
		}
	}

	onInteresection(entries: Array<IntersectionObserverEntry>) {
		if (this.initialIntersection) {
			this.initialIntersection = false;
			return;
		}
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				debounce(this.loadMore.bind(this), INFINITE_SCROLL_DEBOUNCE_RATE);
			}
		});
	}

	/*
	* ITEM SELECTION BASED ON THE CURRENT MODE
	*/
	onSelectionRequested(e: CustomEvent<SelectionRequestEventDetail>) {
		const previouslySelectedItems = this.getSelectedItems();
		let selectionChange = false;
		this._selectionRequested = true;

		if (this.mode !== ListMode.None && this[`handle${this.mode}`]) {
			selectionChange = this[`handle${this.mode}`](e.detail.item, !!e.detail.selected);
		}

		if (selectionChange) {
			const changePrevented = !this.fireEvent<ListSelectionChangeEventDetail>("selection-change", {
				selectedItems: this.getSelectedItems(),
				previouslySelectedItems,
				selectionComponentPressed: e.detail.selectionComponentPressed,
				targetItem: e.detail.item,
				key: e.detail.key,
			}, true);
			if (changePrevented) {
				this._revertSelection(previouslySelectedItems);
			}
		}
	}

	handleSingleSelect(item: ListItemBase): boolean {
		if (item.selected) {
			return false;
		}

		this.deselectSelectedItems();
		item.selected = true;

		return true;
	}

	handleSingleSelectBegin(item: ListItemBase): boolean {
		return this.handleSingleSelect(item);
	}

	handleSingleSelectEnd(item: ListItemBase): boolean {
		return this.handleSingleSelect(item);
	}

	handleSingleSelectAuto(item: ListItemBase): boolean {
		return this.handleSingleSelect(item);
	}

	handleMultiSelect(item: ListItemBase, selected: boolean): boolean {
		item.selected = selected;
		return true;
	}

	handleDelete(item: ListItemBase): boolean {
		this.fireEvent<ListItemDeleteEventDetail>("item-delete", { item });

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
		return this.getSlottedNodes<ListItemBase>("items");
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
		if (isTabNext(e)) {
			this._handleTabNext(e);
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

	checkListInViewport() {
		this._inViewport = isElementInView(this.getDomRef()!);
	}

	loadMore() {
		this.fireEvent("load-more");
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

	_onfocusin(e: FocusEvent) {
		const target = getNormalizedTarget(e.target as HTMLElement);
		// If the focusin event does not origin from one of the 'triggers' - ignore it.
		if (!this.isForwardElement(target)) {
			e.stopImmediatePropagation();
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
			e.stopImmediatePropagation();
		}

		this.setForwardingFocus(false);
	}

	_ondragenter(e: DragEvent) {
		e.preventDefault();
	}

	_ondragleave(e: DragEvent) {
		if (e.relatedTarget instanceof Node && this.shadowRoot!.contains(e.relatedTarget)) {
			return;
		}

		this.dropIndicatorDOM!.targetReference = null;
	}

	_ondragover(e: DragEvent) {
		const draggedElement = DragRegistry.getDraggedElement();

		if (!(e.target instanceof HTMLElement) || !draggedElement) {
			return;
		}

		const closestPosition = findClosestPosition(
			this.items,
			e.clientY,
			Orientation.Vertical,
		);

		if (!closestPosition) {
			this.dropIndicatorDOM!.targetReference = null;
			return;
		}

		let placements = closestPosition.placements;

		if (closestPosition.element === draggedElement) {
			placements = placements.filter(placement => placement !== MovePlacement.On);
		}

		const placementAccepted = placements.some(placement => {
			const beforeItemMovePrevented = !this.fireEvent<ListMoveEventDetail>("move-over", {
				source: {
					element: draggedElement,
				},
				destination: {
					element: closestPosition.element,
					placement,
				},
			}, true);

			if (beforeItemMovePrevented) {
				e.preventDefault();
				this.dropIndicatorDOM!.targetReference = closestPosition.element;
				this.dropIndicatorDOM!.placement = placement;
				return true;
			}

			return false;
		});

		if (!placementAccepted) {
			this.dropIndicatorDOM!.targetReference = null;
		}
	}

	_ondrop(e: DragEvent) {
		e.preventDefault();
		const draggedElement = DragRegistry.getDraggedElement()!;

		this.fireEvent<ListMoveEventDetail>("move", {
			source: {
				element: draggedElement,
			},
			destination: {
				element: this.dropIndicatorDOM!.targetReference!,
				placement: this.dropIndicatorDOM!.placement,
			},
		});

		this.dropIndicatorDOM!.targetReference = null;
		draggedElement.focus();
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
		const target = e.target as ListItemBase;
		this._itemNavigation.setCurrentItem(target);
	}

	onItemFocused(e: CustomEvent) {
		const target = e.target as ListItemBase;

		e.stopPropagation();

		this._itemNavigation.setCurrentItem(target);
		this.fireEvent<ListItemFocusEventDetail>("item-focused", { item: target });

		if (this.mode === ListMode.SingleSelectAuto) {
			const detail: SelectionRequestEventDetail = {
				item: target,
				selectionComponentPressed: false,
				selected: true,
				key: e.detail.key,
			};

			this.onSelectionRequested({ detail } as CustomEvent<SelectionRequestEventDetail>);
		}
	}

	onItemPress(e: CustomEvent<PressEventDetail>) {
		const pressedItem = e.detail.item;

		if (!this.fireEvent<ListItemClickEventDetail>("item-click", { item: pressedItem }, true)) {
			return;
		}

		if (!this._selectionRequested && this.mode !== ListMode.Delete) {
			this._selectionRequested = true;
			const detail: SelectionRequestEventDetail = {
				item: pressedItem,
				selectionComponentPressed: false,
				selected: !pressedItem.selected,
				key: e.detail.key,
			};

			this.onSelectionRequested({ detail } as CustomEvent<SelectionRequestEventDetail>);
		}

		this._selectionRequested = false;
	}

	// This is applicable to NotificationListItem
	onItemClose(e: CustomEvent<ListItemCloseEventDetail>) {
		const target = e.target as UI5Element | null;
		const shouldFireItemClose = target?.hasAttribute("ui5-li-notification") || target?.hasAttribute("ui5-li-notification-group");

		if (shouldFireItemClose) {
			this.fireEvent<ListItemCloseEventDetail>("item-close", { item: e.detail?.item });
		}
	}

	onItemToggle(e: CustomEvent<ListItemToggleEventDetail>) {
		const item = e.detail?.item;

		if (!item) {
			return;
		}

		this.fireEvent<ListItemToggleEventDetail>("item-toggle", { item });
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

	getIntersectionObserver() {
		if (!this.growingIntersectionObserver) {
			this.growingIntersectionObserver = new IntersectionObserver(this.onInteresection.bind(this), {
				root: null,
				rootMargin: "0px",
				threshold: 1.0,
			});
		}

		return this.growingIntersectionObserver;
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
};
