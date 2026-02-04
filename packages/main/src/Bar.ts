import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import type BarDesign from "./types/BarDesign.js";
import type BarAccessibleRole from "./types/BarAccessibleRole.js";

// Template
import BarTemplate from "./BarTemplate.js";

// Styles
import BarCss from "./generated/themes/Bar.css.js";
import type { AriaRole } from "@ui5/webcomponents-base/dist/types.js";

/**
 * @class
 *
 * ### Overview
 * The Bar is a container which is primarily used to hold titles, buttons and input elements
 * and its design and functionality is the basis for page headers and footers.
 * The component consists of three areas to hold its content - startContent slot, default slot and endContent slot.
 * It has the capability to center content, such as a title, while having other components on the left and right side.
 *
 * ### Usage
 * With the use of the design property, you can set the style of the Bar to appear designed like a Header, Subheader, Footer and FloatingFooter.
 *
 * **Note:** Do not place a Bar inside another Bar or inside any bar-like component. Doing so may cause unpredictable behavior.
 *
 * ### Responsive Behavior
 * The default slot will be centered in the available space between the startContent and the endContent areas,
 * therefore it might not always be centered in the entire bar.
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
 * `import "@ui5/webcomponents/dist/Bar.js";`
 * @csspart bar - Used to style the wrapper of the content of the component
 * @csspart startContent - Used to style the wrapper of the start content of the component
 * @csspart midContent - Used to style the wrapper of the middle content of the component
 * @csspart endContent - Used to style the wrapper of the end content of the component
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.11
 */
@customElement({
	tag: "ui5-bar",
	fastNavigation: true,
	renderer: jsxRenderer,
	styles: BarCss,
	template: BarTemplate,
})
class Bar extends UI5Element {
	/**
	 * Defines the component's design.
	 * @default "Header"
	 * @public
	 */
	@property()
	design: `${BarDesign}` = "Header";

	/**
	 * Specifies the ARIA role applied to the component for accessibility purposes.
	 *
	 * **Note:**
	 *
	 * - Set accessibleRole to "toolbar" only when the component contains two or more active, interactive elements (such as buttons, links, or input fields) within the bar.
	 *
	 * - If there is only one or no active element, it is recommended to avoid using the "toolbar" role, as it implies a grouping of multiple interactive controls.
	 *
	 * @public
	 * @default "Toolbar"
	 * @since 2.10.0
	 *
	 */
	@property()
	accessibleRole: `${BarAccessibleRole}` = "Toolbar";

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @since 2.16.0
	 * @public
	 */
	@property()
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the bar.
	 * @default undefined
	 * @since 2.16.0
	 * @public
	 */
	@property()
	accessibleNameRef?: string;

	/**
	* Defines the content at the start of the bar.
	* @public
	*/
	@slot()
	startContent!: Slot<HTMLElement>;

	/**
	* Defines the content in the middle of the bar.
	* @public
	*/
	@slot()
	middleContent!: Slot<HTMLElement>

	/**
	* Defines the content at the end of the bar.
	* @public
	*/
	@slot()
	endContent!: Slot<HTMLElement>

	_handleResizeBound: () => void;

	get accInfo() {
		return {
			"label": this.ariaLabelText,
			"role": this.effectiveRole,
		};
	}

	get ariaLabelText(): string | undefined {
		if (this.accessibleName || this.accessibleNameRef) {
			return getEffectiveAriaLabelText(this);
		}

		return this.design;
	}

	constructor() {
		super();

		this._handleResizeBound = this.handleResize.bind(this);
	}

	handleResize() {
		const bar = this.getDomRef()!;
		const barWidth = bar.offsetWidth;
		const needShrinked = Array.from(bar.children).some(child => {
			return (child as HTMLElement).offsetWidth > barWidth / 3;
		});

		bar.classList.toggle("ui5-bar-root-shrinked", needShrinked);
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResizeBound);

		this.getDomRef()!.querySelectorAll(".ui5-bar-content-container").forEach(child => {
			ResizeHandler.register(child as HTMLElement, this._handleResizeBound);
		}, this);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResizeBound);

		this.getDomRef()!.querySelectorAll(".ui5-bar-content-container").forEach(child => {
			ResizeHandler.deregister(child as HTMLElement, this._handleResizeBound);
		}, this);
	 }

	 get effectiveRole() {
		return this.accessibleRole.toLowerCase() === "toolbar" ? "toolbar" as AriaRole : undefined;
	 }
}

Bar.define();

export default Bar;
