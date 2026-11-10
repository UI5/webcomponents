import UI5Element from "../../src/UI5Element.js";
import type { DefaultSlot, Slot } from "../../src/UI5Element.js";
import customElement from "../../src/decorators/customElement.js";
import slot from "../../src/decorators/slot-strict.js";
import jsxRenderer from "../../src/renderer/JsxRenderer.js";

@customElement({
	tag: "ui5-test-slot-accessor",
	renderer: jsxRenderer,
})
class SlotAccessor extends UI5Element {
	@slot({ type: HTMLElement, "default": true })
	get content(): DefaultSlot<HTMLElement> {
		return this.getSlottedNodes<HTMLElement>("content") as DefaultSlot<HTMLElement>;
	}

	@slot({ type: HTMLElement })
	get header(): Slot<HTMLElement> {
		return this.getSlottedNodes<HTMLElement>("header") as Slot<HTMLElement>;
	}

	static get template() {
		return () => <div>
			<slot name="header"></slot>
			<slot></slot>
		</div>;
	}
}

SlotAccessor.define();

export default SlotAccessor;
