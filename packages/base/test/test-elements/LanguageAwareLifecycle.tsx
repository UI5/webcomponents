import UI5Element from "../../src/UI5Element.js";
import customElement from "../../src/decorators/customElement.js";
import jsxRenderer from "../../src/renderer/JsxRenderer.js";

/**
 * Language-aware test element that records how many times each lifecycle hook fires.
 * Used by base/cypress/specs/LanguageAwareLifecycle.cy.tsx to verify that onEnterDOM
 * still fires exactly once, even when connectedCallback runs while a language change
 * is pending (see fix for the PR #13602 regression).
 */
@customElement({
	tag: "ui5-language-aware-lifecycle",
	renderer: jsxRenderer,
	languageAware: true,
})
class LanguageAwareLifecycle extends UI5Element {
	enterDOMCount = 0;
	exitDOMCount = 0;
	afterRenderingCount = 0;

	onEnterDOM() {
		this.enterDOMCount++;
	}

	onExitDOM() {
		this.exitDOMCount++;
	}

	onAfterRendering() {
		this.afterRenderingCount++;
	}

	static get template() {
		return () => <div>lifecycle</div>;
	}
}

LanguageAwareLifecycle.define();

export default LanguageAwareLifecycle;
