import UI5Element from "../../src/UI5Element.js";
import customElement from "../../src/decorators/customElement.js";
import jsxRenderer from "../../src/renderer/JsxRenderer.js";

@customElement({
	tag: "ui5-test-focusable",
	renderer: jsxRenderer,
})
class Focusable extends UI5Element {
	static get template() {
		return () => <div>
				<button data-sap-focus-ref>Inner</button>
			</div>;
	}
}

Focusable.define();

export default Focusable;
