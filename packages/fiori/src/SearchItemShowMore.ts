import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import SearchItemShowMoreTemplate from "./SearchItemShowMoreTemplate.js";
import SearchItemCss from "./generated/themes/SearchItem.css.js";
import SearchItemShowMoreCss from "./generated/themes/SearchItemShowMore.css.js";
import { SEARCH_ITEM_SHOW_MORE_COUNT, SEARCH_ITEM_SHOW_MORE_NO_COUNT } from "./generated/i18n/i18n-defaults.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";

type ShowMoreItemClickEventDetail = {
	fromKeyboard: boolean;
}

/**
 * @class
 * ### Overview
 *
 * A `ui5-search-item-show-more` is a special type of ui5-li that acts as a button to progressively reveal additional (overflow) items within a group.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SearchItemShowMore.js";`
 *
 * @constructor
 * @extends ListItemBase
 * @public
 * @since 2.14.0
 * @experimental
 */
@customElement({
	tag: "ui5-search-item-show-more",
	languageAware: true,
	renderer: jsxRenderer,
	template: SearchItemShowMoreTemplate,
	styles: [
		ListItemBase.styles,
		SearchItemCss,
		SearchItemShowMoreCss,
	],
})

/**
 * Fired when the component is activated, either with a mouse/tap
 * or by pressing the Enter or Space keys.
 *
 * @public
 * @param {boolean} fromKeyboard Indicates whether the event was fired
 * due to keyboard interaction (Enter or Space) rather than mouse/tap.
 */
@event("click", {
	bubbles: true,
	cancelable: true,
})

class SearchItemShowMore extends ListItemBase {
	eventDetails!: ListItemBase["eventDetails"] & {
		"click": ShowMoreItemClickEventDetail;
	}
	/**
	 * Specifies the number of additional items available to show.
If no value is defined, the control shows "Show more" (without any counter). 
	 * If a number is provided, the control shows “Show more (N)”, where N is the provided value.
	 * @public
	 * @default undefined
	 */
	@property()
	itemsToShowCount ?: number;

	/**
	 * Defines whether the show more item is selected.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected = false;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	get showMoreTextCount() {
		if (this.itemsToShowCount) {
			return SearchItemShowMore.i18nBundle.getText(SEARCH_ITEM_SHOW_MORE_COUNT, this.itemsToShowCount);
		}

		return SearchItemShowMore.i18nBundle.getText(SEARCH_ITEM_SHOW_MORE_NO_COUNT);
	}

	_onfocusin(e: FocusEvent) {
		super._onfocusin(e);
		this.selected = true;
	}

	_onfocusout() {
		this.selected = false;
	}

	_onclick(e: MouseEvent | KeyboardEvent, fromKeyboard = false) {
		e.stopImmediatePropagation();
		this.fireDecoratorEvent("click", { fromKeyboard });
	}

	_onkeydown(e: KeyboardEvent) {
		if (isEnter(e)) {
			this._onclick(e, true);
			e.preventDefault();
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._onclick(e, true);
			e.preventDefault();
		}
	}
}

SearchItemShowMore.define();

export default SearchItemShowMore;

export type {
	ShowMoreItemClickEventDetail,
};
