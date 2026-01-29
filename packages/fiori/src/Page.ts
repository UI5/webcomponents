import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScopeUtils.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import type PageBackgroundDesign from "./types/PageBackgroundDesign.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";

// Template
import PageTemplate from "./PageTemplate.js";

// Styles
import PageCss from "./generated/themes/Page.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-page` is a container component that holds one whole screen of an application.
 * The page has three distinct areas that can hold content - a header, content area and a footer.
 * ### Structure
 * #### Header
 * The top most area of the page is occupied by the header. The standard header includes a navigation button and a title.
 * #### Content
 * The content occupies the main part of the page. Only the content area is scrollable by default.
 * This can be prevented by setting `noScrolling` to `true`.
 * #### Footer
 * The footer is optional and occupies the part above the bottom part of the content. Alternatively, the footer can be fixed at the bottom of the page by enabling the `fixedFooter` property.
 *
 * **Note:** `ui5-page` occipues the whole available space of its parent. In order to achieve the intended design you have to make sure
 * that there is enough space for the `ui5-page` to be rendered.
 * **Note:** In order for the `ui5-page` to be displayed, the parent element should have fixed height.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/Page.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.12
 * @public
 * @csspart content - Used to style the content section of the component
 */
@customElement({
	tag: "ui5-page",
	languageAware: true,
	renderer: jsxRenderer,
	styles: [
		PageCss,
	],
	template: PageTemplate,
})
class Page extends UI5Element {
	/**
	 * Defines the background color of the `ui5-page`.
	 *
	 * **Note:** When a ui5-list is placed inside the page, we recommend using “List” to ensure better color contrast.
	 * @default "Solid"
	 * @public
	 */
	@property()
	backgroundDesign: `${PageBackgroundDesign}` = "Solid";

	/**
	 * Disables vertical scrolling of page content.
	 * If set to true, there will be no vertical scrolling at all.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	noScrolling = false;

	/**
	 * Defines if the footer is fixed at the very bottom of the page.
	 *
	 * **Note:** When set to true the footer is fixed at the very bottom of the page, otherwise it floats over the content with a slight offset from the bottom.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	fixedFooter = false;

	/**
	 * Defines the footer visibility.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideFooter = false;

	/**
	 * Defines the header HTML Element.
	 * @public
	 */
	@slot()
	header!: Slot<HTMLElement[]>;

	/**
	 * Defines the content HTML Element.
	 * @public
	 */
	@slot({ type: Node, "default": true })
	content!: DefaultSlot<Node[]>;

	/**
	 * Defines the footer HTML Element.
	 * @public
	 */
	@slot()
	footer!: Slot<HTMLElement[]>;

	constructor() {
		super();
	}

	onEnterDOM(): void {
		this.style.setProperty(getScopedVarName("--_ui5-page-animation-duration"), getAnimationMode() === AnimationMode.None ? "0s" : "0.35s");
	}

	get _contentBottom() {
		return this.fixedFooter && !this.hideFooter ? "2.75rem" : "0";
	}

	get _contentPaddingBottom() {
		return !this.fixedFooter && !this.hideFooter ? "3.5rem" : "0";
	}

	get _contentTop() {
		return this.header.length ? "2.75rem" : "0rem";
	}
}

Page.define();

export default Page;
