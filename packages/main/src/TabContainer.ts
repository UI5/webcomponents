import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { StyleData } from "@ui5/webcomponents-base/dist/types.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import slideDown from "@ui5/webcomponents-base/dist/animations/slideDown.js";
import slideUp from "@ui5/webcomponents-base/dist/animations/slideUp.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import {
	isSpace,
	isEnter,
	isDown,
	isRight,
	isLeft,
	isUp,
} from "@ui5/webcomponents-base/dist/Keys.js";
import MediaRange from "@ui5/webcomponents-base/dist/MediaRange.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-up.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import arraysAreEqual from "@ui5/webcomponents-base/dist/util/arraysAreEqual.js";
import findClosestPosition from "@ui5/webcomponents-base/dist/util/dragAndDrop/findClosestPosition.js";
import Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";
import DragRegistry from "@ui5/webcomponents-base/dist/util/dragAndDrop/DragRegistry.js";
import type { SetDraggedElementFunction } from "@ui5/webcomponents-base/dist/util/dragAndDrop/DragRegistry.js";
import longDragOverHandler from "@ui5/webcomponents-base/dist/util/dragAndDrop/longDragOverHandler.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import {
	TABCONTAINER_PREVIOUS_ICON_ACC_NAME,
	TABCONTAINER_NEXT_ICON_ACC_NAME,
	TABCONTAINER_OVERFLOW_MENU_TITLE,
	TABCONTAINER_END_OVERFLOW,
	TABCONTAINER_POPOVER_CANCEL_BUTTON,
	TABCONTAINER_SUBTABS_DESCRIPTION,
} from "./generated/i18n/i18n-defaults.js";
import Button from "./Button.js";
import Icon from "./Icon.js";
import List from "./List.js";
import DropIndicator from "./DropIndicator.js";
import type Tab from "./Tab.js";
import type { ListItemClickEventDetail, ListMoveEventDetail } from "./List.js";
import CustomListItem from "./CustomListItem.js";
import ResponsivePopover from "./ResponsivePopover.js";
import TabContainerTabsPlacement from "./types/TabContainerTabsPlacement.js";
import SemanticColor from "./types/SemanticColor.js";
import TabContainerBackgroundDesign from "./types/TabContainerBackgroundDesign.js";
import TabLayout from "./types/TabLayout.js";
import TabsOverflowMode from "./types/TabsOverflowMode.js";
import type { IButton } from "./Button.js";

// Templates
import TabContainerTemplate from "./generated/templates/TabContainerTemplate.lit.js";
import TabContainerPopoverTemplate from "./generated/templates/TabContainerPopoverTemplate.lit.js";

// Styles
import tabContainerCss from "./generated/themes/TabContainer.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";

/**
 * Interface for components that may be slotted inside `ui5-tabcontainer` as items
 * @public
 */
interface ITab extends UI5Element {
	isSeparator: boolean;
	getTabInStripDomRef: () => ITab | null;
	additionalText?: string;
	design?: `${SemanticColor}`;
	disabled?: boolean;
	icon?: string;
	isSingleClickArea?: boolean;
	requiresExpandButton?: boolean;
	selected?: boolean;
	subTabs?: Array<ITab>;
	tabs?: Array<ITab>
	text?: string;
	hasOwnContent?: boolean;
	forcedLevel?: number;
	forcedSelected?: boolean;
	getElementInStrip?: () => ITab | null;
	isInline?: boolean;
	forcedMixedMode?: boolean;
	forcedPosinset?: number;
	forcedSetsize?: number;
	realTabReference: ITab;
	isTopLevelTab?: boolean;
	forcedStyle?: Record<string, any>;
}

type TabContainerPopoverOwner = "start-overflow" | "end-overflow" | Tab;

const tabStyles: Array<StyleData> = [];
const staticAreaTabStyles: Array<StyleData> = [];
const PAGE_UP_DOWN_SIZE = 5;

type TabContainerTabSelectEventDetail = {
	tab: ITab;
	tabIndex: number;
}

type TabContainerMoveEventDetail = {
	source: {
		element: HTMLElement;
	},
	destination: {
		element: HTMLElement;
		placement: `${MovePlacement}`
	}
}

interface TabContainerExpandButton extends Button {
	tab: Tab;
}

interface TabContainerTabInOverflow extends CustomListItem {
	realTabReference: Tab;
}

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-tabcontainer` represents a collection of tabs with associated content.
 * Navigation through the tabs changes the content display of the currently active content area.
 * A tab can be labeled with text only, or icons with text.
 *
 * ### Structure
 *
 * The `ui5-tabcontainer` can hold two types of entities:
 *
 * - `ui5-tab` - contains all the information on an item (text and icon)
 * - `ui5-tab-separator` - used to separate tabs with a line
 *
 * ### Hierarchies
 * Multiple sub tabs could be placed underneath one main tab. Nesting allows deeper hierarchies with indentations
 * to indicate the level of each nested tab. When a tab has both sub tabs and own content its click area is split
 * to allow the user to display the content or alternatively to expand / collapse the list of sub tabs.
 *
 * ### Keyboard Handling
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TabContainer.js";`
 *
 * `import "@ui5/webcomponents/dist/Tab.js";` (for `ui5-tab`)
 *
 * `import "@ui5/webcomponents/dist/TabSeparator.js";` (for `ui5-tab-separator`)
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart content - Used to style the content of the component
 * @csspart tabstrip - Used to style the tabstrip of the component
 */
@customElement({
	tag: "ui5-tabcontainer",
	languageAware: true,
	fastNavigation: true,
	styles: [tabStyles, tabContainerCss],
	staticAreaStyles: [ResponsivePopoverCommonCss, staticAreaTabStyles],
	renderer: litRender,
	template: TabContainerTemplate,
	staticAreaTemplate: TabContainerPopoverTemplate,
	dependencies: [
		Button,
		Icon,
		List,
		ResponsivePopover,
		DropIndicator,
		CustomListItem,
	],
})
/**
 * Fired when a tab is selected.
 * @param {ITab} tab The selected `tab`.
 * @param {Integer} tabIndex The selected `tab` index in the flattened array of all tabs and their subTabs, provided by the `allItems` getter.
 * @public
 * @allowPreventDefault
 */
@event<TabContainerTabSelectEventDetail>("tab-select", {
	detail: {
		/**
		 * @public
		 */
		tab: { type: HTMLElement },
		/**
		 * @public
		 */
		tabIndex: { type: Number },
	},
})
class TabContainer extends UI5Element {
	/**
	 * Defines whether the tabs are in a fixed state that is not
	 * expandable/collapsible by user interaction.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	fixed!: boolean;

	/**
	 * Defines whether the tab content is collapsed.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	collapsed!: boolean;

	/**
	 * Defines whether the overflow select list is displayed.
	 *
	 * The overflow select list represents a list, where all tabs are displayed
	 * so that it's easier for the user to select a specific tab.
	 * @default false
	 * @public
	 * @deprecated Since the introduction of TabsOverflowMode, overflows will always be visible if there is not enough space for all tabs,
	 * all hidden tabs are moved to a select list in the respective overflows and are accessible via the `overflowButton` and / or `startOverflowButton` slots.
	 */
	@property({ type: Boolean })
	showOverflow!: boolean;

	/**
	 * Defines the alignment of the content and the `additionalText` of a tab.
	 *
	 * **Note:**
	 * The content and the `additionalText` would be displayed vertically by default,
	 * but when set to `Inline`, they would be displayed horizontally.
	 * @default "Standard"
	 * @public
	 */
	@property({ type: TabLayout, defaultValue: TabLayout.Standard })
	tabLayout!: `${TabLayout}`;

	/**
	 * Defines the overflow mode of the header (the tab strip). If you have a large number of tabs, only the tabs that can fit on screen will be visible.
	 * All other tabs that can 't fit on the screen are available in an overflow tab "More".
	 *
	 * **Note:**
	 * Only one overflow at the end would be displayed by default,
	 * but when set to `StartAndEnd`, there will be two overflows on both ends, and tab order will not change on tab selection.
	 * @default "End"
	 * @since 1.1.0
	 * @public
	 */
	@property({ type: TabsOverflowMode, defaultValue: TabsOverflowMode.End })
	tabsOverflowMode!: `${TabsOverflowMode}`;

	/**
	 * Sets the background color of the Tab Container's header as `Solid`, `Transparent`, or `Translucent`.
	 * @default "Solid"
	 * @since 1.10.0
	 * @public
	 */
	@property({ type: TabContainerBackgroundDesign, defaultValue: TabContainerBackgroundDesign.Solid })
	headerBackgroundDesign!: `${TabContainerBackgroundDesign}`;

	/**
	 * Sets the background color of the Tab Container's content as `Solid`, `Transparent`, or `Translucent`.
	 * @default "Solid"
	 * @since 1.10.0
	 * @public
	 */
	@property({ type: TabContainerBackgroundDesign, defaultValue: TabContainerBackgroundDesign.Solid })
	contentBackgroundDesign!: `${TabContainerBackgroundDesign}`;

	/**
	 * Defines the placement of the tab strip relative to the actual tabs' content.
	 *
	 * **Note:** By default the tab strip is displayed above the tabs' content area and this is the recommended
	 * layout for most scenarios. Set to `Bottom` only when the component is at the
	 * bottom of the page and you want the tab strip to act as a menu.
	 * @default "Top"
	 * @since 1.0.0-rc.7
	 * @private
	 */
	@property({ type: TabContainerTabsPlacement, defaultValue: TabContainerTabsPlacement.Top })
	tabsPlacement!: `${TabContainerTabsPlacement}`;

	/**
	 * Defines the current media query size.
	 * @private
	 */
	@property()
	mediaRange!: string;

	@property({ type: Object })
	_selectedTab!: Tab;

	@property({ type: Boolean, noAttribute: true })
	_animationRunning!: boolean;

	@property({ type: Boolean, noAttribute: true })
	_contentCollapsed!: boolean;

	@property({ noAttribute: true, defaultValue: "0" })
	_startOverflowText!: string;

	@property({ noAttribute: true, defaultValue: "More" })
	_endOverflowText!: string;

	@property({ type: Object, multiple: true })
	_popoverItemsFlat!: Array<ITab>;

	@property({ validator: Integer, noAttribute: true })
	_width?: number;

	/**
	 * Defines the tabs.
	 *
	 * **Note:** Use `ui5-tab` and `ui5-tab-separator` for the intended design.
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
	items!: Array<ITab>;

	/**
	 * Defines the button which will open the overflow menu. If nothing is provided to this slot,
	 * the default button will be used.
	 * @public
	 * @since 1.0.0-rc.9
	 */
	@slot()
	overflowButton!: Array<IButton>;

	/**
	 * Defines the button which will open the start overflow menu if available. If nothing is provided to this slot,
	 * the default button will be used.
	 * @public
	 * @since 1.1.0
	 */
	@slot()
	startOverflowButton!: Array<IButton>;

	_itemNavigation: ItemNavigation;
	_itemsFlat?: Array<ITab>;
	responsivePopover?: ResponsivePopover;
	_hasScheduledPopoverOpen = false;
	_handleResizeBound: () => void;
	_setDraggedElement?: SetDraggedElementFunction;
	_setDraggedElementInStaticArea?: SetDraggedElementFunction;

	static registerTabStyles(styles: StyleData) {
		tabStyles.push(styles);
	}

	static registerStaticAreaTabStyles(styles: StyleData) {
		staticAreaTabStyles.push(styles);
	}

	static i18nBundle: I18nBundle;

	constructor() {
		super();

		this._handleResizeBound = this._handleResize.bind(this);

		// Init ItemNavigation
		this._itemNavigation = new ItemNavigation(this, {
			getItemsCallback: () => this._getFocusableRefs(),
			skipItemsSize: PAGE_UP_DOWN_SIZE,
		});
	}

	onBeforeRendering() {
		this._itemsFlat = this._flatten(this.items);
		if (!this._itemsFlat.length) {
			return;
		}

		// update selected tab
		const selectedTabs = this._itemsFlat.filter(tab => tab.selected) as Array<Tab>;
		if (selectedTabs.length) {
			this._selectedTab.forcedSelected = false;
			this._selectedTab = selectedTabs[0];
		} else {
			this._selectedTab = this._itemsFlat[0] as Tab;
			this._selectedTab.forcedSelected = true;
		}

		this._setItemsPrivateProperties(this.items);

		if (!this._animationRunning) {
			this._contentCollapsed = this.collapsed;
		}

		if (this.showOverflow) {
			console.warn(`The "show-overflow" property is deprecated and will be removed in a future release.`); // eslint-disable-line
		}
	}

	onAfterRendering() {
		if (!this.items.length) {
			return;
		}

		this._setItemsForStrip();

		if (!this.shadowRoot!.contains(document.activeElement)) {
			const focusStart = this._getRootTab(this._selectedTab);

			if (focusStart) {
				this._itemNavigation.setCurrentItem(focusStart);
			}
		}

		if (this.responsivePopover?.opened) {
			const popoverItems = this._getPopoverItemsFor(this._getPopoverOwner(this.responsivePopover._opener!));

			if (popoverItems.length) {
				this._setPopoverItems(popoverItems);
			} else {
				this._closePopover();
			}
		}
	}

	onEnterDOM() {
		ResizeHandler.register(this._getHeader(), this._handleResizeBound);
		DragRegistry.subscribe(this);
		this._setDraggedElement = DragRegistry.addSelfManagedArea(this);
	}

	onExitDOM() {
		ResizeHandler.deregister(this._getHeader(), this._handleResizeBound);
		DragRegistry.unsubscribe(this);
		DragRegistry.removeSelfManagedArea(this);
		this._setDraggedElement = undefined;

		if (this.staticAreaItem && this._setDraggedElementInStaticArea) {
			DragRegistry.removeSelfManagedArea(this.staticAreaItem);
			this._setDraggedElementInStaticArea = undefined;
		}
	}

	_handleResize() {
		if (this.responsivePopover && this.responsivePopover.opened) {
			this._closePopover();
		}

		// invalidate
		this._width = this.offsetWidth;
		this._updateMediaRange(this._width);
	}

	_updateMediaRange(width: number) {
		this.mediaRange = MediaRange.getCurrentRange(MediaRange.RANGESETS.RANGE_4STEPS, width);
	}

	_setItemsPrivateProperties(items: Array<ITab>) {
		// set real dom ref to all items, then return only the tabs for further processing
		const allTabs = items.filter(item => {
			item.getElementInStrip = () => this.getDomRef()!.querySelector(`[id="${item._id}"]`);
			return !item.isSeparator;
		});

		allTabs.forEach((tab, index, arr) => {
			tab.isInline = this.tabLayout === TabLayout.Inline;
			tab.forcedMixedMode = this.mixedMode;
			tab.forcedPosinset = index + 1;
			tab.forcedSetsize = arr.length;
			tab.isTopLevelTab = items.some(i => i === tab);
		});

		walk(items, item => {
			if (!item.isSeparator) {
				(item as Tab)._selectedTabReference = this._selectedTab;
			}
		});

		this._setIndentLevels(items);
	}

	_onHeaderFocusin(e: FocusEvent) {
		const tab = getTab(e.target as HTMLElement);

		if (tab) {
			this._itemNavigation.setCurrentItem(tab.realTabReference);
		}
	}

	_onHeaderDragStart(e: DragEvent) {
		if (!e.dataTransfer || !(e.target instanceof HTMLElement)) {
			return;
		}

		e.dataTransfer.dropEffect = "move";
		e.dataTransfer.effectAllowed = "move";

		this._setDraggedElement!((e.target as Tab).realTabReference);
	}

	_onHeaderDragEnter(e: DragEvent) {
		e.preventDefault();
	}

	@longDragOverHandler("[data-ui5-stable=overflow-start],[data-ui5-stable=overflow-end],[role=tab]")
	_onHeaderDragOver(e: DragEvent, isLongDragOver: boolean) {
		if (!(e.target instanceof HTMLElement) || !e.target.closest("[data-ui5-stable=overflow-start],[data-ui5-stable=overflow-end],[role=tab],[role=separator]")) {
			this.dropIndicatorDOM!.targetReference = null;
			return;
		}

		const draggedElement = DragRegistry.getDraggedElement();
		const closestPosition = findClosestPosition(
			[...this._getTabStrip().querySelectorAll<HTMLElement>(`[role="tab"]:not([hidden])`)],
			e.clientX,
			Orientation.Horizontal,
		);
		const overflowButton = e.target.closest<HTMLElement>("[data-ui5-stable=overflow-start],[data-ui5-stable=overflow-end]");
		let popoverTarget = null;

		if (overflowButton) {
			popoverTarget = overflowButton;
			e.preventDefault();
		} else if (closestPosition) {
			const dropTarget = (closestPosition.element as Tab).realTabReference;
			let placements = closestPosition.placements;

			if (dropTarget === draggedElement) {
				placements = placements.filter(placement => placement !== MovePlacement.On);
			}

			const acceptedPlacement = placements.find(placement => {
				const dragOverPrevented = !this.fireEvent<TabContainerMoveEventDetail>("move-over", {
					source: {
						element: draggedElement!,
					},
					destination: {
						element: dropTarget,
						placement,
					},
				}, true);

				if (dragOverPrevented) {
					e.preventDefault();
					this.dropIndicatorDOM!.targetReference = closestPosition.element;
					this.dropIndicatorDOM!.placement = placement;
					return true;
				}

				return false;
			});

			if (acceptedPlacement === MovePlacement.On && (closestPosition.element as Tab).realTabReference.subTabs.length) {
				popoverTarget = closestPosition.element;
			} else if (!acceptedPlacement) {
				this.dropIndicatorDOM!.targetReference = null;
			}
		}

		if (popoverTarget && isLongDragOver) {
			this._showPopoverAt(popoverTarget, false, true);
		} else {
			this._closePopover();
		}
	}

	_onHeaderDrop(e: DragEvent) {
		e.preventDefault();
		const draggedElement = DragRegistry.getDraggedElement()!;

		this.fireEvent<TabContainerMoveEventDetail>("move", {
			source: {
				element: draggedElement,
			},
			destination: {
				element: (this.dropIndicatorDOM!.targetReference as Tab).realTabReference,
				placement: this.dropIndicatorDOM!.placement,
			},
		});

		this.dropIndicatorDOM!.targetReference = null;
		draggedElement.focus();
	}

	_onHeaderDragLeave(e: DragEvent) {
		if (e.relatedTarget instanceof Node && this.shadowRoot!.contains(e.relatedTarget)) {
			return;
		}

		this.dropIndicatorDOM!.targetReference = null;
	}

	_onPopoverListMoveOver(e: CustomEvent<ListMoveEventDetail>) {
		const { destination } = e.detail;
		const draggedElement = DragRegistry.getDraggedElement();
		const dropTarget = (destination.element as ITab).realTabReference;

		if (destination.placement === MovePlacement.On && (dropTarget.isSeparator || draggedElement === dropTarget)) {
			return;
		}

		const placementAccepted = !this.fireEvent<TabContainerMoveEventDetail>("move-over", {
			source: {
				element: draggedElement!,
			},
			destination: {
				element: dropTarget,
				placement: destination.placement,
			},
		}, true);

		if (placementAccepted) {
			e.preventDefault();
		} else {
			this.dropIndicatorDOM!.targetReference = null;
		}
	}

	_onPopoverListMove(e: CustomEvent<ListMoveEventDetail>) {
		const { destination } = e.detail;
		const draggedElement = DragRegistry.getDraggedElement()!;

		e.preventDefault();

		this.fireEvent<TabContainerMoveEventDetail>("move", {
			source: {
				element: draggedElement,
			},
			destination: {
				element: (destination.element as Tab).realTabReference,
				placement: destination.placement,
			},
		}, true);

		this.dropIndicatorDOM!.targetReference = null;
		draggedElement.focus();
	}

	async _onTabStripClick(e: Event) {
		const tab = getTab(e.target as HTMLElement);
		if (!tab || tab.realTabReference.disabled) {
			return;
		}

		e.stopPropagation();
		e.preventDefault();

		if ((e.target as HTMLElement).hasAttribute("ui5-button")) {
			this._onTabExpandButtonClick(e);
			return;
		}

		if (!tab.realTabReference.hasOwnContent && tab.realTabReference.tabs.length) {
			await this._togglePopover(tab);

			return;
		}

		this._onHeaderItemSelect(tab);
	}

	async _onTabExpandButtonClick(e: Event) {
		e.stopPropagation();
		e.preventDefault();

		let tabInstance: Tab;

		if (isTabInStrip(e.target as HTMLElement)) {
			tabInstance = e.target as Tab;
		} else {
			tabInstance = (e.target as TabContainerExpandButton).tab;
		}

		let opener = e.target as HTMLElement;

		if (tabInstance) {
			tabInstance.focus();
		}

		if (e.type === "keydown" && !(e.target as Tab).realTabReference.isSingleClickArea) {
			opener = (e.target as Tab).querySelector<TabContainerExpandButton>(".ui5-tab-expand-button [ui5-button]")!;
			tabInstance = (e.target as Tab).realTabReference;
		}

		// if clicked between the expand button and the tab
		if (!tabInstance) {
			this._onHeaderItemSelect(opener.parentElement as HTMLElement);
			return;
		}

		await this._togglePopover(opener, true);
	}

	_setPopoverInitialFocus() {
		const selectedTabInOverflow = this._getSelectedTabInOverflow();
		const tab = selectedTabInOverflow || this._getFirstFocusableItemInOverflow();

		this.responsivePopover!.initialFocus = `${tab.realTabReference._id}-li`;
	}

	_getSelectedTabInOverflow() {
		return <TabContainerTabInOverflow>(<List> this.responsivePopover!.content[0]).items.find(item => {
			return (<TabContainerTabInOverflow>item).realTabReference && (<TabContainerTabInOverflow>item).realTabReference.selected;
		});
	}

	_getFirstFocusableItemInOverflow() {
		return <TabContainerTabInOverflow>(<List> this.responsivePopover!.content[0]).items.find(item => item.classList.contains("ui5-tab-overflow-item"));
	}

	_onTabStripKeyDown(e: KeyboardEvent) {
		const tab = getTab(e.target as HTMLElement);
		if (!tab || tab.realTabReference.disabled) {
			return;
		}

		if (isEnter(e)) {
			if (tab.realTabReference.isSingleClickArea) {
				this._onTabStripClick(e);
			} else {
				this._onHeaderItemSelect(tab);
			}
		}

		if (isSpace(e)) {
			e.preventDefault(); // prevent scrolling
		}

		if (isDown(e) || isUp(e)) {
			if (tab.realTabReference.requiresExpandButton) {
				this._onTabExpandButtonClick(e);
			}
			if (tab.realTabReference.isSingleClickArea) {
				this._onTabStripClick(e);
			}
		}
	}

	_onTabStripKeyUp(e: KeyboardEvent) {
		const tab = getTab(e.target as HTMLElement);
		if (!tab || tab.realTabReference.disabled) {
			return;
		}

		if (isSpace(e)) {
			e.preventDefault();
			if (tab.realTabReference.isSingleClickArea) {
				this._onTabStripClick(e);
			} else {
				this._onHeaderItemSelect(tab);
			}
		}
	}

	_onHeaderItemSelect(tab: HTMLElement) {
		if (!tab.hasAttribute("disabled")) {
			this._onItemSelect(tab.id);
		}
	}

	async _onOverflowListItemClick(e: CustomEvent<ListItemClickEventDetail>) {
		e.preventDefault(); // cancel the item selection

		this._onItemSelect(e.detail.item.id.slice(0, -3)); // strip "-li" from end of id
		this._closePopover();
		await renderFinished();

		const selectedTopLevel = this._getRootTab(this._selectedTab);
		selectedTopLevel?.getTabInStripDomRef()!.focus();
	}

	/**
	 * Returns all slotted tabs and their subTabs in a flattened array.
	 * The order of tabs is depth-first.
	 *
	 * @public
	 * @default []
	 */
	get allItems() : Array<ITab> {
		return this._flatten(this.items);
	}

	_setIndentLevels(items: Array<ITab>, level = 1) {
		items.forEach(item => {
			if (item.hasAttribute("ui5-tab") || item.hasAttribute("ui5-tab-separator")) {
				item.forcedLevel = level;

				if (item.subTabs) {
					this._setIndentLevels(item.subTabs, level + 1);
				}
			}
		});
	}

	_flatten(items: Array<ITab>) {
		const result: Array<ITab> = [];

		walk(items, item => {
			if (item.hasAttribute("ui5-tab") || item.hasAttribute("ui5-tab-separator")) {
				result.push(item);
			}
		});

		return result;
	}

	_onItemSelect(selectedTabId: string) {
		const previousTab = this._selectedTab;
		const selectedTabIndex = this._itemsFlat!.findIndex(item => item.__id === selectedTabId);
		const selectedTab = this._itemsFlat![selectedTabIndex] as Tab;

		const selectionSuccessful = this.selectTab(selectedTab, selectedTabIndex);
		if (!selectionSuccessful) {
			return;
		}

		// update selected property on all items
		this._itemsFlat!.forEach((item, index) => {
			const selected = selectedTabIndex === index;
			item.selected = selected;

			if (item.forcedSelected) {
				item.forcedSelected = false;
			}
		});

		if (this.fixed) {
			return;
		}

		if (!this.shouldAnimate) {
			this.toggle(selectedTab, previousTab);
		} else {
			this.toggleAnimated(selectedTab, previousTab);
		}
	}

	async toggleAnimated(selectedTab: Tab, previousTab: Tab) {
		const content = this.shadowRoot!.querySelector<HTMLElement>(".ui5-tc__content")!;
		let animationPromise = null;

		this._animationRunning = true;

		if (selectedTab === previousTab) {
			// click on already selected tab - animate both directions
			this.collapsed = !this.collapsed;
			animationPromise = this.collapsed ? this.slideContentUp(content) : this.slideContentDown(content);
		} else {
			// click on new tab - animate if the content is currently collapsed
			animationPromise = this.collapsed ? this.slideContentDown(content) : Promise.resolve();
			this.collapsed = false;
		}

		await animationPromise;
		this._contentCollapsed = this.collapsed;
		this._animationRunning = false;
	}

	toggle(selectedTab: Tab, previousTab: Tab) {
		if (selectedTab === previousTab) {
			this.collapsed = !this.collapsed;
		} else {
			this.collapsed = false;
		}
	}

	/**
	 * Fires the `tab-select` event and changes the internal reference for the currently selected tab.
	 * If the event is prevented, the current tab is not changed.
	 * @private
	 * @param selectedTab selected tab instance
	 * @param selectedTabIndex selected tab index for an array containing all tabs and sub tabs. **Note:** Use the method `allTabs` to get this array.
	 * @returns true if the tab selection is successful, false if it was prevented
	 */
	selectTab(selectedTab: Tab, selectedTabIndex: number) {
		if (!this.fireEvent<TabContainerTabSelectEventDetail>("tab-select", { tab: selectedTab, tabIndex: selectedTabIndex }, true)) {
			return false;
		}

		// select the tab
		this._selectedTab = selectedTab;
		return true;
	}

	slideContentDown(element: HTMLElement) {
		return slideDown(element).promise();
	}

	slideContentUp(element: HTMLElement) {
		return slideUp(element).promise();
	}

	async _onOverflowClick(e: Event) {
		if ((e.target as HTMLElement).classList.contains("ui5-tc__overflow")) {
			// the empty area in the overflow was clicked
			return;
		}

		const overflow = e.currentTarget as HTMLElement;
		const isEndOverflow = overflow.classList.contains("ui5-tc__overflow--end");
		let opener;

		if (isEndOverflow) {
			opener = this.overflowButton[0] || this._getEndOverflowBtnDOM();
		} else {
			opener = this.startOverflowButton[0] || this._getStartOverflowBtnDOM();
		}

		await this._togglePopover(opener, true);
	}

	_addStyleIndent(itemsFlat: Array<ITab>) {
		const extraIndent = itemsFlat
			.filter(tab => !tab.isSeparator)
			.some(tab => tab.design !== SemanticColor.Default && tab.design !== SemanticColor.Neutral);

		itemsFlat.forEach(item => {
			let level = item.forcedLevel! - 1;

			if (item.isSeparator) {
				level += 1;
			}

			item.forcedStyle = {
				[getScopedVarName("--_ui5-tab-indentation-level")]: level,
				[getScopedVarName("--_ui5-tab-extra-indent")]: extraIndent ? 1 : null,
			};
		});
	}

	async _onOverflowKeyDown(e: KeyboardEvent) {
		const overflow = e.currentTarget as HTMLElement;
		const isEndOverflow = overflow.classList.contains("ui5-tc__overflow--end");
		const isStartOverflow = overflow.classList.contains("ui5-tc__overflow--start");

		if (isDown(e) || (isStartOverflow && isLeft(e)) || (isEndOverflow && isRight(e))) {
			e.stopPropagation();
			e.preventDefault();
			await this._onOverflowClick(e);
		}
	}

	_setItemsForStrip() {
		const tabStrip = this._getTabStrip();
		let allItemsWidth = 0;

		if (!this._selectedTab) {
			return;
		}

		const itemsDomRefs = this.items.map(item => item.getTabInStripDomRef()!);

		// make sure the overflows are hidden
		this._getStartOverflow().setAttribute("hidden", "");
		this._getEndOverflow().setAttribute("hidden", "");

		// show all tabs
		for (let i = 0; i < itemsDomRefs.length; i++) {
			itemsDomRefs[i].removeAttribute("hidden");
			itemsDomRefs[i].removeAttribute("start-overflow");
			itemsDomRefs[i].removeAttribute("end-overflow");
		}

		itemsDomRefs.forEach(item => {
			allItemsWidth += this._getItemWidth(item);
		});

		const hasOverflow = tabStrip.offsetWidth < allItemsWidth;
		if (!hasOverflow) {
			return;
		}

		if (this.isModeStartAndEnd) {
			this._updateStartAndEndOverflow(itemsDomRefs);
			this._updateOverflowCounters();
		} else {
			this._updateEndOverflow(itemsDomRefs);
		}
	}

	_getRootTab(tab: Tab | undefined): Tab | undefined {
		while (tab?.hasAttribute("ui5-tab")) {
			if (tab.parentElement?.hasAttribute("ui5-tabcontainer")) {
				break;
			}

			tab = (tab.parentElement ?? undefined) as Tab | undefined;
		}

		return tab;
	}

	_updateEndOverflow(itemsDomRefs: Array<ITab>) {
		// show end overflow
		this._getEndOverflow().removeAttribute("hidden");
		const selectedTab = this._getRootTab(this._selectedTab);
		const selectedTabDomRef = selectedTab?.getTabInStripDomRef() as ITab | undefined;
		const containerWidth = this._getTabStrip().offsetWidth;

		const selectedItemIndexAndWidth = this._getSelectedItemIndexAndWidth(itemsDomRefs, selectedTabDomRef);
		const lastVisibleTabIndex = this._findLastVisibleItem(itemsDomRefs, containerWidth, selectedItemIndexAndWidth.width);

		for (let i = lastVisibleTabIndex + 1; i < itemsDomRefs.length; i++) {
			itemsDomRefs[i].setAttribute("hidden", "");
			itemsDomRefs[i].setAttribute("end-overflow", "");
		}

		this._endOverflowText = this.overflowButtonText;
	}

	_updateStartAndEndOverflow(itemsDomRefs: Array<ITab>) {
		let containerWidth = this._getTabStrip().offsetWidth;
		const selectedTab = this._getRootTab(this._selectedTab);
		const selectedTabDomRef = selectedTab?.getTabInStripDomRef() as ITab | undefined;
		const selectedItemIndexAndWidth = this._getSelectedItemIndexAndWidth(itemsDomRefs, selectedTabDomRef);
		const hasStartOverflow = this._hasStartOverflow(containerWidth, itemsDomRefs, selectedItemIndexAndWidth);
		const hasEndOverflow = this._hasEndOverflow(containerWidth, itemsDomRefs, selectedItemIndexAndWidth);
		let firstVisible;
		let lastVisible;

		// has "end", but no "start" overflow
		if (!hasStartOverflow) {
			// show "end" overflow
			this._getEndOverflow().removeAttribute("hidden");
			// width is changed
			containerWidth = this._getTabStrip().offsetWidth;

			lastVisible = this._findLastVisibleItem(itemsDomRefs, containerWidth, selectedItemIndexAndWidth.width);

			for (let i = lastVisible + 1; i < itemsDomRefs.length; i++) {
				itemsDomRefs[i].setAttribute("hidden", "");
				itemsDomRefs[i].setAttribute("end-overflow", "");
			}

			return;
		}

		// has "start", but no "end" overflow
		if (!hasEndOverflow) {
			// show "start" overflow
			this._getStartOverflow().removeAttribute("hidden");
			// width is changed
			containerWidth = this._getTabStrip().offsetWidth;

			firstVisible = this._findFirstVisibleItem(itemsDomRefs, containerWidth, selectedItemIndexAndWidth.width);

			for (let i = firstVisible - 1; i >= 0; i--) {
				itemsDomRefs[i].setAttribute("hidden", "");
				itemsDomRefs[i].setAttribute("start-overflow", "");
			}

			return;
		}

		// show "start" overflow
		this._getStartOverflow().removeAttribute("hidden");
		// show "end" overflow
		this._getEndOverflow().removeAttribute("hidden");
		// width is changed
		containerWidth = this._getTabStrip().offsetWidth;

		firstVisible = this._findFirstVisibleItem(itemsDomRefs, containerWidth, selectedItemIndexAndWidth.width, selectedItemIndexAndWidth.index - 1);
		lastVisible = this._findLastVisibleItem(itemsDomRefs, containerWidth, selectedItemIndexAndWidth.width, firstVisible);

		for (let i = firstVisible - 1; i >= 0; i--) {
			itemsDomRefs[i].setAttribute("hidden", "");
			itemsDomRefs[i].setAttribute("start-overflow", "");
		}

		for (let i = lastVisible + 1; i < itemsDomRefs.length; i++) {
			itemsDomRefs[i].setAttribute("hidden", "");
			itemsDomRefs[i].setAttribute("end-overflow", "");
		}
	}

	_hasStartOverflow(containerWidth: number, itemsDomRefs: Array<ITab>, selectedItemIndexAndWidth: { width: number; index: number}) {
		if (selectedItemIndexAndWidth.index === 0) {
			return false;
		}

		let leftItemsWidth = 0;

		for (let i = selectedItemIndexAndWidth.index - 1; i >= 0; i--) {
			leftItemsWidth += this._getItemWidth(itemsDomRefs[i]);
		}

		let hasStartOverflow = containerWidth < leftItemsWidth + selectedItemIndexAndWidth.width;

		// if there is no "start" overflow, it has "end" overflow
		// check it again with the "end" overflow
		if (!hasStartOverflow) {
			this._getEndOverflow().removeAttribute("hidden");
			containerWidth = this._getTabStrip().offsetWidth;
			hasStartOverflow = containerWidth < leftItemsWidth + selectedItemIndexAndWidth.width;
			this._getEndOverflow().setAttribute("hidden", "");
		}

		return hasStartOverflow;
	}

	_hasEndOverflow(containerWidth: number, itemsDomRefs: Array<ITab>, selectedItemIndexAndWidth: { width: number; index: number}) {
		if (selectedItemIndexAndWidth.index >= itemsDomRefs.length) {
			return false;
		}

		let rightItemsWidth = 0;

		for (let i = selectedItemIndexAndWidth.index; i < itemsDomRefs.length; i++) {
			rightItemsWidth += this._getItemWidth(itemsDomRefs[i]);
		}

		let hasEndOverflow = containerWidth < rightItemsWidth + selectedItemIndexAndWidth.width;

		// if there is no "end" overflow, it has "start" overflow
		// check it again with the "start" overflow
		if (!hasEndOverflow) {
			this._getStartOverflow().removeAttribute("hidden");
			containerWidth = this._getTabStrip().offsetWidth;
			hasEndOverflow = containerWidth < rightItemsWidth + selectedItemIndexAndWidth.width;
			this._getStartOverflow().setAttribute("hidden", "");
		}

		return hasEndOverflow;
	}

	_getItemWidth(itemDomRef: HTMLElement) {
		const styles = window.getComputedStyle(itemDomRef);
		const margins = Number.parseInt(styles.marginLeft) + Number.parseInt(styles.marginRight);

		return itemDomRef.offsetWidth + margins;
	}

	_getSelectedItemIndexAndWidth(itemsDomRefs: Array<ITab>, selectedTabDomRef: ITab | undefined) {
		if (!selectedTabDomRef) {
			return {
				index: 0,
				width: 0,
			};
		}

		let index = itemsDomRefs.indexOf(selectedTabDomRef);
		let width = selectedTabDomRef.offsetWidth;
		let selectedSeparator;

		if (itemsDomRefs[index - 1] && itemsDomRefs[index - 1].isSeparator) {
			selectedSeparator = itemsDomRefs[index - 1];
			width += this._getItemWidth(selectedSeparator);
		}

		itemsDomRefs.splice(index, 1);

		// if previous item is a separator - remove it
		if (selectedSeparator) {
			itemsDomRefs.splice(index - 1, 1);
			index--;
		}

		return {
			index,
			width,
		};
	}

	_findFirstVisibleItem(itemsDomRefs: Array<ITab>, containerWidth: number, selectedItemWidth: number, startIndex?: number) {
		if (startIndex === undefined) {
			startIndex = itemsDomRefs.length - 1;
		}

		let lastVisible = startIndex + 1;

		for (let index = startIndex; index >= 0; index--) {
			const itemWidth = this._getItemWidth(itemsDomRefs[index]);

			if (containerWidth < selectedItemWidth + itemWidth) {
				break;
			}

			selectedItemWidth += itemWidth;
			lastVisible = index;
		}

		return lastVisible;
	}

	_findLastVisibleItem(itemsDomRefs: Array<ITab>, containerWidth: number, selectedItemWidth: number, startIndex = 0) {
		let lastVisibleIndex = startIndex - 1;
		let index = startIndex;

		for (; index < itemsDomRefs.length; index++) {
			const itemWidth = this._getItemWidth(itemsDomRefs[index]);

			if (containerWidth < selectedItemWidth + itemWidth) {
				break;
			}

			selectedItemWidth += itemWidth;
			lastVisibleIndex = index;
		}

		// if prev item is separator - hide it
		const prevItem = itemsDomRefs[index - 1];
		if (prevItem && prevItem.isSeparator) {
			lastVisibleIndex -= 1;
		}

		return lastVisibleIndex;
	}

	get isModeStartAndEnd() {
		return this.tabsOverflowMode === TabsOverflowMode.StartAndEnd;
	}

	_updateOverflowCounters() {
		let startOverflowItemsCount = 0;
		let endOverflowItemsCount = 0;

		this._getTabs()
			.map(tab => tab.getTabInStripDomRef()!)
			.forEach(tab => {
				if (tab.hasAttribute("start-overflow")) {
					startOverflowItemsCount++;
				}

				if (tab.hasAttribute("end-overflow")) {
					endOverflowItemsCount++;
				}
			});

		this._startOverflowText = `+${startOverflowItemsCount}`;
		this._endOverflowText = `+${endOverflowItemsCount}`;
	}

	_getFocusableRefs() {
		if (!this.getDomRef()) {
			return [];
		}

		const focusableRefs = [];

		if (!this._getStartOverflow().hasAttribute("hidden")) {
			focusableRefs.push(this.startOverflowButton[0] || this._getStartOverflowBtnDOM());
		}

		this._getTabs().forEach(tab => {
			const ref = tab.getTabInStripDomRef();
			const focusable = ref && !ref.hasAttribute("hidden");

			if (focusable) {
				focusableRefs.push(tab);
			}
		});

		if (!this._getEndOverflow().hasAttribute("hidden")) {
			focusableRefs.push(this.overflowButton[0] || this._getEndOverflowBtnDOM());
		}

		return focusableRefs;
	}

	_getHeader() {
		return this.shadowRoot!.querySelector<HTMLElement>(`#${this._id}-header`)!;
	}

	_getTabs(): Array<Tab> {
		return this.items.filter((item): item is Tab => !item.isSeparator);
	}

	_getPopoverOwner(opener: HTMLElement): TabContainerPopoverOwner {
		if (opener === this._getStartOverflowBtnDOM() || opener.slot === "startOverflowButton") {
			return "start-overflow";
		}

		if (opener === this._getEndOverflowBtnDOM() || opener.slot === "overflowButton") {
			return "end-overflow";
		}

		if (opener instanceof Button) {
			return (opener as TabContainerExpandButton).tab;
		}

		return (opener as Tab);
	}

	_getPopoverItemsFor(targetOwner: TabContainerPopoverOwner) {
		if (targetOwner === "start-overflow") {
			return this.items.filter(item => {
				const stripRef = item.getTabInStripDomRef();

				return stripRef && stripRef.hasAttribute("start-overflow");
			});
		}

		if (targetOwner === "end-overflow") {
			return this.items.filter(item => {
				const stripRef = item.getTabInStripDomRef();

				return stripRef && stripRef.hasAttribute("end-overflow");
			});
		}

		if (isTabInStrip(targetOwner)) {
			return targetOwner.realTabReference.subTabs;
		}

		return targetOwner.subTabs;
	}

	_setPopoverItems(items: Array<ITab>) {
		const newItemsFlat = this._flatten(items);

		if (!arraysAreEqual(this._popoverItemsFlat, newItemsFlat)) {
			this._popoverItemsFlat = newItemsFlat;
			this._addStyleIndent(this._popoverItemsFlat);
		}
	}

	async _togglePopover(opener: HTMLElement, setInitialFocus = false) {
		this.responsivePopover = await this._respPopover();

		if (this.responsivePopover.isOpen()) {
			this._closePopover();
		} else {
			await this._showPopoverAt(opener, setInitialFocus);
		}
	}

	async _showPopoverAt(opener: HTMLElement, setInitialFocus = false, preventInitialFocus = false) {
		this._hasScheduledPopoverOpen = true;
		this._setPopoverItems(this._getPopoverItemsFor(this._getPopoverOwner(opener)));
		this.responsivePopover = await this._respPopover();

		if (setInitialFocus) {
			this._setPopoverInitialFocus();
		}

		if (this._hasScheduledPopoverOpen) {
			await this.responsivePopover.showAt(opener, preventInitialFocus);
		}
	}

	get hasSubTabs(): boolean {
		const tabs = this._getTabs();

		for (let i = 0; i < tabs.length; i++) {
			if (tabs[i].subTabs.length > 0) {
				return true;
			}
		}

		return false;
	}

	_getTabStrip() {
		return this.shadowRoot!.querySelector<HTMLElement>(`#${this._id}-tabStrip`)!;
	}

	_getStartOverflow() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-tc__overflow--start")!;
	}

	_getEndOverflow() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-tc__overflow--end")!;
	}

	_getStartOverflowBtnDOM() {
		return this._getStartOverflow().querySelector<Button>("[ui5-button]");
	}

	_getEndOverflowBtnDOM() {
		return this._getEndOverflow().querySelector<Button>("[ui5-button]");
	}

	async _respPopover() {
		const staticAreaItemDomRef = await this.getStaticAreaItemDomRef();

		if (!this._setDraggedElementInStaticArea) {
			this._setDraggedElementInStaticArea = DragRegistry.addSelfManagedArea(this.staticAreaItem!);
			staticAreaItemDomRef!.addEventListener("dragstart", e => {
				this._setDraggedElementInStaticArea!((e.target as Tab).realTabReference);
			});
		}

		return staticAreaItemDomRef!.querySelector<ResponsivePopover>(`#${this._id}-overflowMenu`)!;
	}

	_closePopover() {
		this._hasScheduledPopoverOpen = false;
		this.responsivePopover?.close();
	}

	get dropIndicatorDOM(): DropIndicator | null {
		return this.shadowRoot!.querySelector("[ui5-drop-indicator]");
	}

	get classes() {
		return {
			root: {
				"ui5-tc-root": true,
				"ui5-tc--textOnly": this.textOnly,
				"ui5-tc--withAdditionalText": this.withAdditionalText,
				"ui5-tc--standardTabLayout": this.standardTabLayout,
			},
			header: {
				"ui5-tc__header": true,
			},
			tabStrip: {
				"ui5-tc__tabStrip": true,
			},
			separator: {
				"ui5-tc__separator": true,
			},
			content: {
				"ui5-tc__content": true,
				"ui5-tc__content--collapsed": this._contentCollapsed,
			},
		};
	}

	get mixedMode() {
		return this.items.some(item => item.icon) && this.items.some(item => item.text);
	}

	get textOnly() {
		return this.items.every(item => !item.icon);
	}

	get withAdditionalText() {
		return this.items.some(item => !!item.additionalText);
	}

	get standardTabLayout() {
		return this.tabLayout === TabLayout.Standard;
	}

	get previousIconACCName() {
		return TabContainer.i18nBundle.getText(TABCONTAINER_PREVIOUS_ICON_ACC_NAME);
	}

	get nextIconACCName() {
		return TabContainer.i18nBundle.getText(TABCONTAINER_NEXT_ICON_ACC_NAME);
	}

	get overflowMenuTitle() {
		return TabContainer.i18nBundle.getText(TABCONTAINER_OVERFLOW_MENU_TITLE);
	}

	get tabsAtTheBottom() {
		return this.tabsPlacement === TabContainerTabsPlacement.Bottom;
	}

	get overflowMenuIcon() {
		return this.tabsAtTheBottom ? "slim-arrow-up" : "slim-arrow-down";
	}

	get overflowButtonText() {
		return TabContainer.i18nBundle.getText(TABCONTAINER_END_OVERFLOW);
	}

	get popoverCancelButtonText() {
		return TabContainer.i18nBundle.getText(TABCONTAINER_POPOVER_CANCEL_BUTTON);
	}

	get accInvisibleText() {
		return TabContainer.i18nBundle.getText(TABCONTAINER_SUBTABS_DESCRIPTION);
	}

	get tablistAriaDescribedById() {
		return this.hasSubTabs ? `${this._id}-invisibleText` : undefined;
	}

	get shouldAnimate() {
		return getAnimationMode() !== AnimationMode.None;
	}

	static async onDefine() {
		TabContainer.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

const isTabInStrip = (el: HTMLElement) => el.localName === "div" && el.getAttribute("role") === "tab";

const getTab = (el: HTMLElement | null) => {
	while (el) {
		if (isTabInStrip(el)) {
			return el as Tab;
		}

		el = el.parentElement;
	}

	return false;
};

const walk = (tabs: Array<ITab>, callback: (_: ITab) => void) => {
	[...tabs].forEach(tab => {
		callback(tab);
		if (tab.subTabs) {
			walk(tab.subTabs, callback);
		}
	});
};

TabContainer.define();

export default TabContainer;
export type {
	ITab,
	TabContainerTabSelectEventDetail,
	TabContainerMoveEventDetail,
};
