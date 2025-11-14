import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type BusyIndicatorSize from "./types/BusyIndicatorSize.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-busy-state` component is an abstract data provider component that configures
 * busy state behavior in other components. It does not render anything itself, but provides
 * configuration properties that parent components read to display busy indicators.
 *
 * ### Usage
 *
 * This component is meant to be slotted into components that support busy state configuration,
 * such as `ui5-shellbar-search`.
 *
 * ```html
 * <ui5-shellbar-search>
 *   <ui5-busy-state slot="busyState" active size="M"></ui5-busy-state>
 * </ui5-shellbar-search>
 * ```
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/BusyState.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.17.0
 */
@customElement({
	tag: "ui5-busy-state",
})
class BusyState extends UI5Element {
	/**
	 * Defines whether the busy state is active.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	active = false;

	/**
	 * Defines the size of the busy indicator.
	 * @default "Auto"
	 * @public
	 */
	@property()
	size: `${BusyIndicatorSize}` = "Auto";
}

BusyState.define();

export default BusyState;
