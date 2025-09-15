import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import SearchItemShowMoreTemplate from "./SearchItemShowMoreTemplate.js";
import SearchItemCss from "./generated/themes/SearchItem.css.js";
import SearchItemShowMoreCss from "./generated/themes/SearchItemShowMore.css.js";
import { SEARCH_ITEM_SHOW_MORE_COUNT, SEARCH_ITEM_SHOW_MORE_NO_COUNT } from "./generated/i18n/i18n-defaults.js";

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

class SearchItemShowMore extends ListItemBase {
	/**
	 * Specifies the number of additional items available to show.
	 * This value replaces the placeholder (N) in the "Show more (N)" text.
	 * If not set, the placeholder will remain as (N).
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
}

SearchItemShowMore.define();

export default SearchItemShowMore;
