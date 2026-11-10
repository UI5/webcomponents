import customElement from "../../src/decorators/customElement.js";
import property from "../../src/decorators/property.js";
import jsxRenderer from "../../src/renderer/JsxRenderer.js";
import UI5Element from "../../src/UI5Element.js";

@customElement({
	tag: "ui5-invalidation",
	renderer: jsxRenderer,
})
class Invalidation extends UI5Element {
	@property()
	myProp?: string;

	@property()
	silentInvalidation?: string;

	count: number = 0;

	onBeforeRendering() {
		this.silentInvalidation = `on-before-rendering:${++this.count}`;
	}

	render() {
		return (
			<>
				<div>{`${this.myProp}`}</div>
				<div>{`${this.silentInvalidation}`}</div>
			</>
		);
	}
}

Invalidation.define();

export default Invalidation;
