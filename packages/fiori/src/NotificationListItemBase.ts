import { isSpace, isF2 } from "@ui5/webcomponents-base/dist/Keys.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getTabbableElements } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import { getFirstFocusableElement } from "@ui5/webcomponents-base/dist/util/FocusableElements.js";

// Texts
import {
	NOTIFICATION_LIST_ITEM_LOADING,
} from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * The base class of the `NotificationListItem` and `NotificationListGroupItem`.
 * @constructor
 * @extends ListItemBase
 * @since 1.0.0-rc.8
 * @public
 */
@customElement({})
class NotificationListItemBase extends ListItemBase {
	eventDetails!: ListItemBase["eventDetails"];
	/**
	 * Defines the `titleText` of the item.
	 * @default undefined
	 * @public
	 */
	@property()
	titleText?: string;

	/**
	 * Defines if the `notification` is new or has been already read.
	 *
	 * **Note:** if set to `false` the `titleText` has bold font,
	 * if set to true - it has a normal font.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	read = false;

	/**
	 * Defines if a busy indicator would be displayed over the item.
	 * @default false
	 * @public
	 * @since 1.0.0-rc.8
	 */
	@property({ type: Boolean })
	loading = false;

	/**
	 * Defines the delay in milliseconds, after which the busy indicator will show up for this component.
	 * @default 1000
	 * @public
	 */
	@property({ type: Number })
	loadingDelay = 1000;

	@i18n("@ui5/webcomponents-fiori")
	static i18nFioriBundle: I18nBundle;

	get hasTitleText() {
		return !!this.titleText?.length;
	}

	get loadingText() {
		return NotificationListItemBase.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_LOADING);
	}

	/**
	 * Event handlers
	 */
	async _onkeydown(e: KeyboardEvent) {
		super._onkeydown(e);

		if (isSpace(e) && this.getFocusDomRef()!.matches(":has(:focus-within)")) {
			e.preventDefault();
			return;
		}

		if (isF2(e)) {
			e.stopImmediatePropagation();

			const activeElement = getActiveElement();
			const focusDomRef = this.getHeaderDomRef()!;

			if (activeElement === focusDomRef) {
				const firstFocusable = await getFirstFocusableElement(focusDomRef);
				firstFocusable?.focus();
			} else {
				focusDomRef.focus();
			}
		}
	}

	getHeaderDomRef() {
		return this.getFocusDomRef();
	}

	shouldForwardTabAfter() {
		const aContent = getTabbableElements(this.getHeaderDomRef()!);

		return aContent.length === 0 || (aContent[aContent.length - 1] === getActiveElement());
	}
}

export default NotificationListItemBase;
