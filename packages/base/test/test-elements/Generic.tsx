import UI5Element, { DefaultSlot, Slot } from "../../src/UI5Element.js";
import customElement from "../../src/decorators/customElement.js";
import slot from "../../src/decorators/slot-strict.js";
import property from "../../src/decorators/property.js";
import jsxRenderer from "../../src/renderer/JsxRenderer.js";

@customElement({
	tag: "ui5-test-generic",
	renderer: jsxRenderer,
})
class Generic extends UI5Element {
	@property()
	strProp?: string;

	@property({ type: Boolean })
	boolProp = false;

	@property({ type: Object })
	objectProp?: object;

	@property({ type: String, noAttribute: true })
	noAttributeProp?: string;

	@property({ type: Array })
	multiProp?: Array<string>;

	@property()
	defaultValueProp = "Hello";

	@slot({ type: Node, "default": true })
	content!: DefaultSlot<Node[]>;

	@slot({ type: HTMLElement })
	other!: Slot<HTMLElement[]>

	@slot({ type: HTMLElement, individualSlots: true })
	individual!: Slot<HTMLElement[]>

	@slot({ type: HTMLElement, propertyName: "items" })
	named!: Slot<HTMLElement[]>

	@slot({ type: HTMLElement })
	"row-header"!: Slot<HTMLElement[]>

	static get template() {
		return () => <div>
				<p>
					<slot></slot>
					<slot name="other"></slot>
					<slot name="individual-1"></slot>
					<slot name="individual-2"></slot>
				</p>
			</div>;
	}

	static get styles() {
		return `:host {
                    display: inline-block;
                    border: 1px solid black;
                    color: var(--var1);
                }`;
	}
}

Generic.define();

export default Generic;
