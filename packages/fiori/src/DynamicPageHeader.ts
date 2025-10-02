import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

// Template
import DynamicPageHeaderTemplate from "./DynamicPageHeaderTemplate.js";

// Styles
import DynamicPageHeaderCss from "./generated/themes/DynamicPageHeader.css.js";

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
	content!: HTMLElement[];
}

DynamicPageHeader.define();

export default DynamicPageHeader;
