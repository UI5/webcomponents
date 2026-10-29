import UI5Element from "../../src/UI5Element.js";
import customElement from "../../src/decorators/customElement.js";
import jsxRenderer from "../../src/renderer/JsxRenderer.js";
import SlotAccessor from "./SlotAccessor.js";

/**
 * Forwards its light DOM children into a nested component through chained `<slot>` elements.
 */
@customElement({
	tag: "ui5-test-slot-forwarder",
	renderer: jsxRenderer,
})
class SlotForwarder extends UI5Element {
	static get template() {
		return () => <SlotAccessor id="inner">
			<slot name="header" slot="header"></slot>
			<slot></slot>
		</SlotAccessor>;
	}
}

SlotForwarder.define();

export default SlotForwarder;
