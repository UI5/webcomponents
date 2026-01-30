import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";

// Template
import DynamicPageHeaderTemplate from "./DynamicPageHeaderTemplate.js";

// Styles
import DynamicPageHeaderCss from "./generated/themes/DynamicPageHeader.css.js";

// i18n
import {
	DYNAMIC_PAGE_ARIA_LABEL_EXPANDED_HEADER,
	DYNAMIC_PAGE_ARIA_LABEL_SNAPPED_HEADER,
} from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * Header of the DynamicPage.
 *
 * ### Overview
 *
 * The DynamicPageHeader `ui5-dynamic-page-header` is part of the DynamicPage family
 * and is used to serve as header of the `DynamicPage`.
 *
 * ### Usage
 *
 * The `DynamicPageHeader` can hold any layout control and has two states - expanded
 * and collapsed (snapped). The switching between these states happens when:
 *	- the user scrolls below its bottom margin
 *	- the user clicks on the `DynamicPageTitle`
 *	- through the `DynamicPage` property `headerSnapped`
 *
 * ### Responsive Behavior
 *
 * The responsive behavior of the `DynamicPageHeader` depends on the behavior of the
 * content that is displayed.
 *
 * ### Accessibility
 *
 * The `DynamicPageHeader` provides an accessible label for the header region.
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.0.0
 */
@customElement({
	tag: "ui5-dynamic-page-header",
	renderer: jsxRenderer,
	styles: DynamicPageHeaderCss,
	template: DynamicPageHeaderTemplate,
})
class DynamicPageHeader extends UI5Element {
	/**
	 * Defines the content of the Dynamic Page Header.
	 *
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement })
	content!: DefaultSlot<HTMLElement[]>;

	/**
	 * Defines if the header is snapped.
	 *
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	_snapped = false;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	/**
	 * Returns the aria-label for the header region.
	 * @internal
	 */
	get _headerRegionAriaLabel(): string {
		const defaultText = this._snapped
			? DYNAMIC_PAGE_ARIA_LABEL_SNAPPED_HEADER
			: DYNAMIC_PAGE_ARIA_LABEL_EXPANDED_HEADER;

		return DynamicPageHeader.i18nBundle.getText(defaultText);
	}
}

DynamicPageHeader.define();

export default DynamicPageHeader;
