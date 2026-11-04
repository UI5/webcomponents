import UI5Element from "../../src/UI5Element.js";
import customElement from "../../src/decorators/customElement.js";
import property from "../../src/decorators/property.js";
import jsxRenderer from "../../src/renderer/JsxRenderer.js";

/**
 * Test element that modifies a property during onBeforeRendering.
 * Used to verify that onInvalidation and the "invalidate" event
 * still fire when _suppressRendering is true (i.e. during onBeforeRendering),
 * while re-rendering is not scheduled again.
 */
@customElement({
	tag: "ui5-test-invalidate-on-before-rendering",
	renderer: jsxRenderer,
})
class InvalidateOnBeforeRendering extends UI5Element {
	@property()
	strProp?: string;

	// Derived from strProp; assigned during onBeforeRendering to trigger _invalidate
	// while _suppressRendering is true.
	@property({ noAttribute: true })
	derivedProp?: string;

	override onBeforeRendering() {
		if (this.strProp !== undefined) {
			this.derivedProp = `derived:${this.strProp}`;
		}
	}

	static get template() {
		return () => <div>{this.strProp}</div>;
	}
}

InvalidateOnBeforeRendering.define();

export default InvalidateOnBeforeRendering;
