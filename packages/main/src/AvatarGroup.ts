import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type { AccessibilityAttributes } from "@ui5/webcomponents-base/dist/types.js";

import {
	isEnter,
	isSpace,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import type Button from "./Button.js";
import AvatarSize from "./types/AvatarSize.js";
import AvatarGroupType from "./types/AvatarGroupType.js";
import AvatarColorScheme from "./types/AvatarColorScheme.js";
import type { IButton } from "./Button.js";

import {
	AVATAR_GROUP_DISPLAYED_HIDDEN_LABEL,
	AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL,
	AVATAR_GROUP_ARIA_LABEL_INDIVIDUAL,
	AVATAR_GROUP_ARIA_LABEL_GROUP,
	AVATAR_GROUP_MOVE,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import AvatarGroupCss from "./generated/themes/AvatarGroup.css.js";

// Template
import AvatarGroupTemplate from "./AvatarGroupTemplate.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";

/**
 * Interface for components that represent an avatar and may be slotted in numerous higher-order components such as `ui5-avatar-group`
 * @public
 */
interface IAvatarGroupItem extends HTMLElement, ITabbable {
	effectiveBackgroundColor: AvatarColorScheme;
	size: `${AvatarSize}`;
	effectiveSize: AvatarSize;
	interactive: boolean;
}

const OVERFLOW_BTN_CLASS = "ui5-avatar-group-overflow-btn";
const AVATAR_GROUP_OVERFLOW_BTN_SELECTOR = `.${OVERFLOW_BTN_CLASS}`;

// based on RTL/LTR a margin-left/right is set respectfully
const offsets = {
	[AvatarSize.XS]: {
		[AvatarGroupType.Individual]: "0.0625rem",
		[AvatarGroupType.Group]: "-0.5rem",
	},
	[AvatarSize.S]: {
		[AvatarGroupType.Individual]: "0.125rem",
		[AvatarGroupType.Group]: "-1.25rem",
	},
	[AvatarSize.M]: {
		[AvatarGroupType.Individual]: "0.125rem",
		[AvatarGroupType.Group]: "-1.625rem",
	},
	[AvatarSize.L]: {
		[AvatarGroupType.Individual]: "0.125rem",
		[AvatarGroupType.Group]: "-2rem",
	},
	[AvatarSize.XL]: {
		[AvatarGroupType.Individual]: "0.25rem",
		[AvatarGroupType.Group]: "-2.75rem",
	},
};

type AvatarGroupAccessibilityAttributes = Pick<AccessibilityAttributes, "hasPopup">;

type AvatarGroupClickEventDetail = {
	targetRef: HTMLElement,
	overflowButtonClicked: boolean,
};

/**
 * @class
 *
 * ### Overview
 *
 * Displays a group of avatars arranged horizontally. It is useful to visually
 * showcase a group of related avatars, such as, project team members or employees.
 *
 * The component allows you to display the avatars in different sizes,
 * depending on your use case.
 *
 * The `AvatarGroup` component has two group types:
 *
 * - `Group` type: The avatars are displayed as partially overlapped on
 * top of each other and the entire group has one click/tap area.
 * - `Individual` type: The avatars are displayed side-by-side and each
 * avatar has its own click/tap area.
 *
 * ### Usage
 *
 * Use the `AvatarGroup` if:
 *
 * - You want to display a group of avatars.
 * - You want to display several avatars which have something in common.
 *
 * Do not use the `AvatarGroup` if:
 *
 * - You want to display a single avatar.
 * - You want to display a gallery for simple images.
 * - You want to use it for other visual content than avatars.
 *
 * ### Responsive Behavior
 *
 * When the available space is less than the width required to display all avatars,
 * an overflow visualization appears as a button placed at the end with the same shape
 * and size as the avatars. The visualization displays the number of avatars that have overflowed
 * and are not currently visible.
 *
 * ### Keyboard Handling
 * The component provides advanced keyboard handling.
 * When focused, the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 *
 * `type` Individual:
 *
 * - [Tab] - Move focus to the overflow button
 * - [Left] - Navigate one avatar to the left
 * - [Right] - Navigate one avatar to the right
 * - [Home] - Navigate to the first avatar
 * - [End] - Navigate to the last avatar
 * - [Space] / [Enter] or [Return] - Trigger `ui5-click` event
 *
 * `type` Group:
 *
 * - [Tab] - Move focus to the next interactive element after the component
 * - [Space] / [Enter] or [Return] - Trigger `ui5-click` event
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.11
 * @public
 */

@customElement({
	tag: "ui5-avatar-group",
	renderer: jsxRenderer,
	template: AvatarGroupTemplate,
	styles: AvatarGroupCss,
})
/**
 * Fired when the component is activated either with a
 * click/tap or by using the Enter or Space key.
 * @param {HTMLElement} targetRef The DOM ref of the clicked item.
 * @param {boolean} overflowButtonClicked indicates if the overflow button is clicked
 * @public
 * @since 1.0.0-rc.11
 */
@event("click")

/**
 * Fired when the count of visible `ui5-avatar` elements in the
 * component has changed
 * @public
 * @since 1.0.0-rc.13
 */
@event("overflow")
class AvatarGroup extends UI5Element {
	eventDetails!: {
		"click": AvatarGroupClickEventDetail
		"overflow": void
	}

	slotDetails!: {
		overflowButton: IButton;
		items: IAvatarGroupItem;
	}

	/**
	 * Defines the mode of the `AvatarGroup`.
	 * @default "Group"
	 * @public
	 */
	@property()
	type: `${AvatarGroupType}` = "Group"

	/**
	 * Defines the additional accessibility attributes that will be applied to the component.
	 * The following field is supported:
	 *
	 * - **hasPopup**: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button.
	 * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
	 *
	 * @public
	 * @since 2.0.0
	 * @default {}
	 */
	@property({ type: Object })
	accessibilityAttributes: AvatarGroupAccessibilityAttributes = {};

	/**
	 * @private
	 */
	@property({ noAttribute: true })
	_overflowButtonText?: string;

	/**
 	* Defines the accessible name of the AvatarGroup.
 	* When provided, this will override the default aria-label text.
 	* @default undefined
 	* @public
 	* @since 2.12.0
 	*/
	@property()
	accessibleName?: string;

	/**
 	* Receives id(s) of the elements that describe the AvatarGroup.
 	* When provided, this will be used as aria-labelledby instead of aria-label.
 	* @default undefined
 	* @public
 	* @since 2.12.0
 	*/
	@property()
	accessibleNameRef?: string;

	/**
	 * Defines the items of the component. Use the `ui5-avatar` component as an item.
	 *
	 * **Note:** The UX guidelines recommends using avatars with "Circle" shape.
	 *
	 * Moreover, if you use avatars with "Square" shape, there will be visual inconsistency
	 * as the built-in overflow action has "Circle" shape.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	items!: DefaultSlot<IAvatarGroupItem>;

	/**
	 * Defines the overflow button of the component.
	 *
	 * **Note:** We recommend using the `ui5-button` component.
	 *
	 * **Note:** If this slot is not used, the component will display the built-in overflow button.
	 * @public
	 * @since 1.0.0-rc.13
	 */
	@slot()
	overflowButton!: Slot<IButton>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;
	_onResizeHandler: () => void;
	_colorIndex = 0;
	_hiddenItems = 0;
	_itemNavigation: ItemNavigation;

	/**
	 * Returns the actual avatar items, handling transitive slotting.
	 * @private
	 */
	get _slottedItems(): IAvatarGroupItem[] {
		return this.getSlottedNodes<IAvatarGroupItem>("items");
	}

	constructor() {
		super();

		this._itemNavigation = new ItemNavigation(this, {
			getItemsCallback: () => {
				return this._isGroup ? [] : this._slottedItems.slice(0, this._hiddenStartIndex);
			},
		});
		this._onResizeHandler = this._onResize.bind(this);
	}

	/**
	 * Returns an array containing the `ui5-avatar` instances that are currently not displayed due to lack of space.
	 * @default []
	 * @public
	 */
	get hiddenItems(): IAvatarGroupItem[] {
		return this._slottedItems.slice(this._hiddenStartIndex);
	}

	/**
	 * Returns an array containing the `AvatarColorScheme` values that correspond to the avatars in the component.
	 * @default []
	 * @public
	 */
	get colorScheme(): AvatarColorScheme[] {
		return this._slottedItems.map(avatar => avatar.effectiveBackgroundColor);
	}

	get _customOverflowButton() {
		return this.overflowButton.length ? this.overflowButton[0] : undefined;
	}

	get _ariaLabelText() {
		if (this.accessibleName || this.accessibleNameRef) {
			return getEffectiveAriaLabelText(this);
		}
		// Fallback to existing default behavior
		const hiddenItemsCount = this.hiddenItems.length;
		const typeLabelKey = this._isGroup ? AVATAR_GROUP_ARIA_LABEL_GROUP : AVATAR_GROUP_ARIA_LABEL_INDIVIDUAL;

		// avatar type label
		let text = AvatarGroup.i18nBundle.getText(typeLabelKey);

		// add displayed-hidden avatars label
		text += ` ${AvatarGroup.i18nBundle.getText(AVATAR_GROUP_DISPLAYED_HIDDEN_LABEL, this._itemsCount - hiddenItemsCount, hiddenItemsCount)}`;

		if (this._isGroup) {
			// the container role is "button", add the message for complete list activation
			text += ` ${AvatarGroup.i18nBundle.getText(AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL)}`;
		} else {
			// the container role is "group", add the "how to navigate" message
			text += ` ${AvatarGroup.i18nBundle.getText(AVATAR_GROUP_MOVE)}`;
		}

		return text;
	}

	get _overflowButtonAriaLabelText() {
		return this._isGroup ? undefined : AvatarGroup.i18nBundle.getText(AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL);
	}

	get _containerAriaHasPopup() {
		return this._isGroup ? this._getAriaHasPopup() : undefined;
	}

	get _overflowButtonAccAttributes() {
		return {
			hasPopup: this._isGroup ? undefined : this._getAriaHasPopup(),
		};
	}

	get _role() {
		return this._isGroup ? "button" : "group";
	}

	get _hiddenStartIndex() {
		return this._itemsCount - this._hiddenItems;
	}

	get _overflowBtnHidden() {
		return this._hiddenItems === 0;
	}

	get _isGroup() {
		return this.type === AvatarGroupType.Group;
	}

	get _itemsCount() {
		return this._slottedItems.length;
	}

	get _groupTabIndex() {
		return this._isGroup ? 0 : -1;
	}

	get _overflowButton() {
		return this.shadowRoot!.querySelector<Button>(AVATAR_GROUP_OVERFLOW_BTN_SELECTOR);
	}

	/**
	 * Return the effective overflow button width
	 * Differences are that when in "Group" type the button is offset and overlaps the avatars
	 *
	 * 1) In case of "Group", (LTR/RTL aware) button width is qual to second item offset left/right
	 * 2) In case of "Individual" group type width is directly taken from button element
	 * @private
	 */
	get _overflowButtonEffectiveWidth() {
		const button = this._customOverflowButton ? this._customOverflowButton : this._overflowButton;
		// if in "Group" mode overflow button size is equal to the offset from second item

		if (!button) {
			return 0;
		}

		if (this._isGroup) {
			let item: HTMLElement = this._slottedItems[1];
			const ltrEffectiveWidth = item.offsetLeft - this.offsetLeft;

			// in some cases when second avatar is overflowed the offset of the button is the right one
			if (!item || item.hidden) {
				item = button;
			}

			return this.effectiveDir === "rtl" ? this._getWidthToItem(item) : ltrEffectiveWidth;
		}

		return button.offsetWidth;
	}

	get firstAvatarSize() {
		return this._slottedItems[0]?.size ?? AvatarSize.S;
	}

	onAfterRendering() {
		this._overflowItems();
	}

	onBeforeRendering() {
		if (this._customOverflowButton) {
			this._customOverflowButton.nonInteractive = this._isGroup;
		}

		this._prepareAvatars();
	}

	onEnterDOM() {
		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}

		ResizeHandler.register(this, this._onResizeHandler);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._onResizeHandler);
	}

	_onResize() {
		this._overflowItems();
	}

	_onkeydown(e: KeyboardEvent) {
		if (this._isGroup) {
			if (isEnter(e)) {
				this._fireGroupEvent(e.target as HTMLElement);
			} else if (isSpace(e)) {
				e.preventDefault();
			}
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (!e.shiftKey && isSpace(e) && this._isGroup) {
			this._fireGroupEvent(e.target as HTMLElement);
			e.preventDefault();
		}
	}

	_fireGroupEvent(targetRef: HTMLElement) {
		const isOverflowButtonClicked = targetRef.classList.contains(OVERFLOW_BTN_CLASS) || targetRef === this._customOverflowButton;

		this.fireDecoratorEvent("click", {
			targetRef,
			overflowButtonClicked: isOverflowButtonClicked,
		});
	}

	_onClick(e: MouseEvent) {
		e.stopPropagation();
		this._isGroup && this._fireGroupEvent(e.target as HTMLElement);
	}

	onAvatarClick(e: MouseEvent) {
		e.stopPropagation();
		this.fireDecoratorEvent("click", {
			targetRef: e.target as HTMLElement,
			overflowButtonClicked: false,
		});
	}

	onAvatarUI5Click(e: MouseEvent) {
		// AvatrGroup fires click and ui5-click - Avatar's ui5-click should be stopped.
		e.stopPropagation();
	}

	onOverflowButtonClick(e: UI5CustomEvent<Button, "click">) {
		e.stopPropagation();

		this.fireDecoratorEvent("click", {
			targetRef: e.target as HTMLElement,
			overflowButtonClicked: true,
		});
	}

	/**
	 * Modifies avatars to the needs of avatar group properties. Respects already set size and background color.
	 * Set the margins (offsets) based on RTL/LTR.
	 * @private
	 */
	_prepareAvatars() {
		this._colorIndex = 0;

		this._slottedItems.forEach((avatar, index) => {
			const colorIndex = this._getNextBackgroundColor();
			avatar.interactive = !this._isGroup;

			if (avatar.getAttribute("_color-scheme") === AvatarColorScheme.Auto) {
				// AvatarGroup respects colors set to ui5-avatar
				avatar.setAttribute("_color-scheme", AvatarColorScheme[`Accent${colorIndex}` as keyof typeof AvatarColorScheme]);
			}

			// last avatar should not be offset as it breaks the container width and focus styles are no set correctly
			if (index !== this._itemsCount - 1 || this._customOverflowButton) {
				// based on RTL the browser automatically sets left or right margin to avatars
				avatar.style.marginInlineEnd = offsets[avatar.effectiveSize][this.type];
			} else {
				avatar.style.marginInlineEnd = "";
			}
		});
	}

	_onfocusin(e: FocusEvent) {
		this._itemNavigation.setCurrentItem(e.target as IAvatarGroupItem);
	}

	getFocusDomRef() {
		return this._itemNavigation._getCurrentItem();
	}

	/**
	 * Returns the total width to item excluding the item width
	 * RTL/LTR aware
	 * @private
	 * @param item
	 */
	_getWidthToItem(item: HTMLElement) {
		const isRTL = this.effectiveDir === "rtl";
		const ltrWidthToItem = item.offsetLeft - this.offsetLeft;

		if (isRTL) {
			const itemOffsetParent = item.offsetParent as HTMLElement;

			// in RTL the total width is equal to difference of the parent container width and
			// how much is the item offset to the left minus its offsetWidth

			if (!itemOffsetParent) {
				return 0;
			}

			return itemOffsetParent.offsetWidth - item.offsetLeft - item.offsetWidth;
		}

		return ltrWidthToItem;
	}

	/**
	 * Overflows items that were not able to fit the container
	 * @private
	 */
	_overflowItems() {
		if (this._slottedItems.length < 2) {
			// no need to overflow avatars
			this._setHiddenItems(0);
			return;
		}

		let hiddenItems = 0;

		for (let index = 0; index < this._itemsCount; index++) {
			const item: IAvatarGroupItem = this._slottedItems[index];

			// show item to determine if it will fit the new container size
			item.hidden = false;

			// container width to current item + item width (avatar)
			// used to determine whether the following items will fit the container or not
			let totalWidth = this._getWidthToItem(item) + item.offsetWidth;

			if (index !== this._itemsCount - 1 || this._customOverflowButton) {
				totalWidth += this._overflowButtonEffectiveWidth;
			}

			if (totalWidth > this.offsetWidth) {
				hiddenItems = this._itemsCount - index;
				break;
			}
		}

		// hide the items that did not fit the container size
		this._setHiddenItems(hiddenItems);
	}

	_getNextBackgroundColor() {
		// counter is to automatically assign background colors to avatars, `Accent10` is the highest color value
		if (++this._colorIndex > 10) {
			this._colorIndex = 1;
		}
		return this._colorIndex;
	}

	_setHiddenItems(hiddenItems: number) {
		const shouldFireEvent = this._hiddenItems !== hiddenItems;

		this._hiddenItems = hiddenItems;

		this._slottedItems.forEach((item, index) => {
			item.hidden = index >= this._hiddenStartIndex;
		});

		this._overflowButtonText = `+${hiddenItems > 99 ? 99 : hiddenItems}`;

		if (shouldFireEvent) {
			this.fireDecoratorEvent("overflow");
		}
	}

	_getAriaHasPopup() {
		return this.accessibilityAttributes.hasPopup;
	}
}

AvatarGroup.define();

export default AvatarGroup;
export type {
	AvatarGroupClickEventDetail,
	AvatarGroupAccessibilityAttributes,
	IAvatarGroupItem,
};
