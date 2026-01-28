import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import {
	isSpace, isEnter, isDelete, isF2,
} from "@ui5/webcomponents-base/dist/Keys.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import { getFirstFocusableElement } from "@ui5/webcomponents-base/dist/util/FocusableElements.js";
import { getTabbableElements } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import type { AccessibilityAttributes, AriaRole, AriaHasPopup } from "@ui5/webcomponents-base";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import DragRegistry from "@ui5/webcomponents-base/dist/util/dragAndDrop/DragRegistry.js";
import Highlight from "./types/Highlight.js";
import ListItemType from "./types/ListItemType.js";
import ListSelectionMode from "./types/ListSelectionMode.js";
import ListItemBase from "./ListItemBase.js";
import type RadioButton from "./RadioButton.js";
import type CheckBox from "./CheckBox.js";
import type { IButton } from "./Button.js";
import {
	DELETE,
	ARIA_LABEL_LIST_ITEM_CHECKBOX,
	ARIA_LABEL_LIST_ITEM_RADIO_BUTTON,
	LIST_ITEM_ACTIVE,
	LIST_ITEM_SELECTED,
	LIST_ITEM_NOT_SELECTED,
} from "./generated/i18n/i18n-defaults.js";
import type ListItemAccessibleRole from "./types/ListItemAccessibleRole.js";

// Styles
import styles from "./generated/themes/ListItem.css.js";
import listItemAdditionalTextCss from "./generated/themes/ListItemAdditionalText.css.js";

// Icons
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";

interface IAccessibleListItem {
	accessibleName?: string;
	accessibleNameRef?: string;
}

type SelectionRequestEventDetail = {
	item: ListItemBase,
	selectionComponentPressed: boolean,
	selected?: boolean,
	key?: string,
}

type AccInfo = {
	role?: AriaRole | undefined;
	ariaExpanded?: boolean;
	ariaLevel?: number;
	ariaLabel: string;
	ariaLabelRadioButton: string;
	ariaSelectedText?: string;
	ariaHaspopup?: `${AriaHasPopup}`;
	posinset?: number;
	setsize?: number;
	ariaSelected?: boolean;
	ariaChecked?: boolean;
	listItemAriaLabel?: string;
	ariaOwns?: string;
	tooltip?: string;
	ariaKeyShortcuts?: string;
}

type ListItemAccessibilityAttributes = Pick<AccessibilityAttributes, "hasPopup" | "ariaSetsize" | "ariaPosinset">;

/**
 * @class
 * A class to serve as a base
 * for the `ListItemStandard` and `ListItemCustom` classes.
 * @constructor
 * @abstract
 * @extends ListItemBase
 * @public
 */
@customElement({
	languageAware: true,
	renderer: jsxRenderer,
	styles: [
		ListItemBase.styles,
		listItemAdditionalTextCss,
		styles,
	],
})
/**
 * Fired when the user clicks on the detail button when type is `Detail`.
 * @public
 */
@event("detail-click", {
	bubbles: true,
})
@event("selection-requested", {
	bubbles: true,
})
abstract class ListItem extends ListItemBase {
	eventDetails!: ListItemBase["eventDetails"] & {
		"detail-click": { item: ListItem, selected: boolean };
		"selection-requested": SelectionRequestEventDetail,
	}
	/**
	 * Defines the visual indication and behavior of the list items.
	 * Available options are `Active` (by default), `Inactive`, `Detail` and `Navigation`.
	 *
	 * **Note:** When set to `Active` or `Navigation`, the item will provide visual response upon press and hover,
	 * while with type `Inactive` and `Detail` - will not.
	 * @default "Active"
	 * @public
	*/
	@property()
	type: `${ListItemType}` = "Active";

	/**
	 * Defines the additional accessibility attributes that will be applied to the component.
	 * The following fields are supported:
	 *
	 * - **ariaSetsize**: Defines the number of items in the current set  when not all items in the set are present in the DOM.
	 * **Note:** The value is an integer reflecting the number of items in the complete set. If the size of the entire set is unknown, set `-1`.
	 *
	 * 	- **ariaPosinset**: Defines an element's number or position in the current set when not all items are present in the DOM.
	 * 	**Note:** The value is an integer greater than or equal to 1, and less than or equal to the size of the set when that size is known.
	 *
	 * @default {}
	 * @public
	 * @since 1.15.0
	 */
	@property({ type: Object })
	accessibilityAttributes: ListItemAccessibilityAttributes = {};

	/**
	 * The navigated state of the list item.
	 * If set to `true`, a navigation indicator is displayed at the end of the list item.
	 * @default false
	 * @public
	 * @since 1.10.0
	 */
	@property({ type: Boolean })
	navigated = false;

	/**
	 * Defines the text of the tooltip that would be displayed for the list item.
	 * @default undefined
	 * @public
	 * @since 1.23.0
	 */
	@property()
	tooltip?: string;

	/**
	 * Indicates if the list item is active, e.g pressed down with the mouse or the keyboard keys.
	 * @private
	*/
	@property({ type: Boolean })
	active = false;

	/**
	 * Defines the highlight state of the list items.
	 * Available options are: `"None"` (by default), `"Positive"`, `"Critical"`, `"Information"` and `"Negative"`.
	 * @default "None"
	 * @public
	 * @since 1.24
	 */
	@property()
	highlight: `${Highlight}` = "None";

	/**
	 * Defines the selected state of the component.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	declare selected: boolean;

	/**
	 * Used to define the role of the list item.
	 * @private
	 * @default "ListItem"
	 * @since 1.3.0
	 *
	 */
	@property()
	accessibleRole: `${ListItemAccessibleRole}` = "ListItem";

	@property()
	_forcedAccessibleRole?: string;

	@property()
	_selectionMode: `${ListSelectionMode}` = "None";

	/**
	 * Defines the current media query size.
	 * @default "S"
	 * @private
	 */
	@property()
	mediaRange = "S";

	/**
	 * Defines the delete button, displayed in "Delete" mode.
	 * **Note:** While the slot allows custom buttons, to match
	 * design guidelines, please use the `ui5-button` component.
	 * **Note:** When the slot is not present, a built-in delete button will be displayed.
	 * @since 1.9.0
	 * @public
	*/
	@slot()
	deleteButton!: Slot<IButton[]>;

	deactivateByKey: (e: KeyboardEvent) => void;
	deactivate: () => void;
	// used in template, implemented in TreeItemBase, ListItemStandard
	accessibleName?: string;
	// used in ListItem template but implemented in TreeItemBase
	indeterminate?: boolean;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	constructor() {
		super();

		this.deactivateByKey = (e: KeyboardEvent) => {
			if (isEnter(e)) {
				this.deactivate();
			}
		};

		this.deactivate = () => {
			if (this.active) {
				this.active = false;
			}
		};
	}

	onBeforeRendering() {
		super.onBeforeRendering();
		this.actionable = (this.type === ListItemType.Active || this.type === ListItemType.Navigation) && (this._selectionMode !== ListSelectionMode.Delete);
	}

	onEnterDOM() {
		super.onEnterDOM();
		document.addEventListener("mouseup", this.deactivate);
		document.addEventListener("touchend", this.deactivate);
		document.addEventListener("keyup", this.deactivateByKey);
	}

	onExitDOM() {
		document.removeEventListener("mouseup", this.deactivate);
		document.removeEventListener("keyup", this.deactivateByKey);
		document.removeEventListener("touchend", this.deactivate);
	}

	_onkeydown(e: KeyboardEvent) {
		const isInternalElementFocused = e.target !== this.getFocusDomRef();

		if ((isSpace(e) || isEnter(e)) && isInternalElementFocused) {
			return;
		}

		super._onkeydown(e);

		const itemActive = this.type === ListItemType.Active,
			itemNavigated = this.typeNavigation;

		if ((isSpace(e) || isEnter(e)) && (itemActive || itemNavigated)) {
			this.activate();
		}

		if (isF2(e)) {
			this._handleF2();
		}
	}

	_onkeyup(e: KeyboardEvent) {
		super._onkeyup(e);

		if (isSpace(e) || isEnter(e)) {
			this.deactivate();
		}

		if (this.modeDelete && isDelete(e)) {
			this.onDelete();
		}
	}

	_onmousedown() {
		this.activate();
	}

	_onmouseup() {
		if (this.getFocusDomRef()!.matches(":has(:focus-within)")) {
			return;
		}
		this.deactivate();
	}

	_ontouchend() {
		this._onmouseup();
	}

	_onfocusin(e: FocusEvent) {
		super._onfocusin(e);

		if (e.target !== this.getFocusDomRef()) {
			this.deactivate();
		}
	}

	_onfocusout(e: FocusEvent) {
		if (e.target !== this.getFocusDomRef()) {
			return;
		}

		this.deactivate();
	}

	_ondragstart(e: DragEvent) {
		if (!e.dataTransfer) {
			return;
		}

		if (e.target === this._listItem) {
			DragRegistry.setDraggedElement(this);
			this.setAttribute("data-moving", "");
			e.dataTransfer.dropEffect = "move";
			e.dataTransfer.effectAllowed = "move";
		}
	}

	_ondragend(e: DragEvent) {
		if (e.target === this._listItem) {
			DragRegistry.clearDraggedElement();
			this.removeAttribute("data-moving");
		}
	}

	/**
	 * Called when selection components in Single (ui5-radio-button)
	 * and Multi (ui5-checkbox) selection modes are used.
	 */
	onMultiSelectionComponentPress(e: CustomEvent) {
		if (this.isInactive) {
			return;
		}

		this.fireDecoratorEvent("selection-requested", { item: this, selected: (e.target as CheckBox).checked, selectionComponentPressed: true });
	}

	onSingleSelectionComponentPress(e: CustomEvent) {
		if (this.isInactive) {
			return;
		}

		this.fireDecoratorEvent("selection-requested", { item: this, selected: !(e.target as RadioButton).checked, selectionComponentPressed: true });
	}

	activate() {
		if (this.type === ListItemType.Active || this.type === ListItemType.Navigation) {
			this.active = true;
		}
	}

	onDelete() {
		this.fireDecoratorEvent("selection-requested", { item: this, selectionComponentPressed: false });
	}

	onDetailClick() {
		this.fireDecoratorEvent("detail-click", { item: this, selected: this.selected });
	}

	fireItemPress(e: Event) {
		if (this.isInactive) {
			return;
		}
		super.fireItemPress(e);
		if (document.activeElement !== this) {
			this.focus();
		}
	}

	get isInactive() {
		return this.type === ListItemType.Inactive || this.type === ListItemType.Detail;
	}

	get placeSelectionElementBefore() {
		return this._selectionMode === ListSelectionMode.Multiple
			|| this._selectionMode === ListSelectionMode.SingleStart;
	}

	get placeSelectionElementAfter() {
		return !this.placeSelectionElementBefore
			&& (this._selectionMode === ListSelectionMode.SingleEnd || this._selectionMode === ListSelectionMode.Delete);
	}

	get modeSingleSelect() {
		return [
			ListSelectionMode.SingleStart,
			ListSelectionMode.SingleEnd,
			ListSelectionMode.Single,
		].includes(this._selectionMode as ListSelectionMode);
	}

	get modeMultiple() {
		return this._selectionMode === ListSelectionMode.Multiple;
	}

	get modeDelete() {
		return this._selectionMode === ListSelectionMode.Delete;
	}

	get typeDetail() {
		return this.type === ListItemType.Detail;
	}

	get typeNavigation() {
		return this.type === ListItemType.Navigation;
	}

	get typeActive() {
		return this.type === ListItemType.Active;
	}

	get _ariaSelected() {
		if (this.modeMultiple || this.modeSingleSelect) {
			return this.selected;
		}

		return undefined;
	}

	get listItemAccessibleRole() {
		return (this._forcedAccessibleRole || this.accessibleRole.toLowerCase()) as AriaRole | undefined;
	}

	get ariaSelectedText() {
		let ariaSelectedText;

		// Selected state needs to be supported separately since now the role mapping is list -> listitem[]
		// to avoid the issue of nesting interactive elements, ex. (option -> radio/checkbox);
		// The text is added to aria-describedby because as part of the aria-labelledby
		// the whole content of the item is readout when the aria-labelledby value is changed.
		if (this._ariaSelected !== undefined) {
			ariaSelectedText = this._ariaSelected ? ListItem.i18nBundle.getText(LIST_ITEM_SELECTED) : ListItem.i18nBundle.getText(LIST_ITEM_NOT_SELECTED);
		}

		return ariaSelectedText;
	}

	get deleteText() {
		return ListItem.i18nBundle.getText(DELETE);
	}

	get hasDeleteButtonSlot() {
		return !!this.deleteButton.length;
	}

	get _accessibleNameRef(): string {
		if ((this as IAccessibleListItem).accessibleName) {
			// accessibleName is set - return labels excluding content
			return `${this._id}-invisibleText`;
		}

		// accessibleName is not set - return _accInfo.listItemAriaLabel including content
		return `${this._id}-content ${this._id}-invisibleText`;
	}

	get ariaLabelledByText() {
		const texts = [
			this._accInfo.listItemAriaLabel,
			this.accessibleName,
			this.typeActive ? ListItem.i18nBundle.getText(LIST_ITEM_ACTIVE) : undefined,
		].filter(Boolean);

		return texts.join(" ");
	}

	get _accInfo(): AccInfo {
		return {
			role: this.listItemAccessibleRole,
			ariaExpanded: undefined,
			ariaLevel: undefined,
			ariaLabel: ListItem.i18nBundle.getText(ARIA_LABEL_LIST_ITEM_CHECKBOX),
			ariaLabelRadioButton: ListItem.i18nBundle.getText(ARIA_LABEL_LIST_ITEM_RADIO_BUTTON),
			ariaSelectedText: this.ariaSelectedText,
			ariaHaspopup: this.accessibilityAttributes.hasPopup,
			setsize: this.accessibilityAttributes.ariaSetsize,
			posinset: this.accessibilityAttributes.ariaPosinset,
			tooltip: this.tooltip,
		};
	}

	get _hasHighlightColor() {
		return this.highlight !== Highlight.None;
	}

	get hasConfigurableMode() {
		return true;
	}

	get _listItem() {
		return this.shadowRoot!.querySelector("li");
	}

	async _handleF2() {
		const focusDomRef = this.getFocusDomRef()!;
		const activeElement = getActiveElement();

		const focusables = this._getFocusableElements().length > 0;
		if (!focusables) {
			return;
		}

		if (activeElement === focusDomRef) {
			const firstFocusable = await getFirstFocusableElement(focusDomRef);
			firstFocusable?.focus();
		} else {
			focusDomRef.focus();
		}
	}

	_getFocusableElements(): HTMLElement[] {
		const focusDomRef = this.getFocusDomRef()!;
		return getTabbableElements(focusDomRef);
	}

	_getFocusedElementIndex(): number {
		const focusables = this._getFocusableElements();
		const activeElement = getActiveElement() as HTMLElement;
		return focusables.indexOf(activeElement);
	}

	_hasFocusableElements(): boolean {
		return this._getFocusableElements().length > 0;
	}

	_isFocusOnInternalElement(): boolean {
		const focusables = this._getFocusableElements();
		const currentElementIndex = focusables.indexOf(getActiveElement() as HTMLElement);
		return currentElementIndex !== -1;
	}

	_focusInternalElement(targetIndex: number) {
		const focusables = this._getFocusableElements();
		if (!focusables.length) {
			return;
		}

		const safeIndex = Math.min(targetIndex, focusables.length - 1);
		const elementToFocus = focusables[safeIndex];

		elementToFocus.focus();

		return safeIndex;
	}
}

export default ListItem;
export type {
	IAccessibleListItem,
	SelectionRequestEventDetail,
	ListItemAccessibilityAttributes,
};
