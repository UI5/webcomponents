import { setAnimationMode } from "../../src/config/AnimationMode.js";
import { duration } from "../../src/animations/animate.js";
import { getComponentStyles } from "../../src/theming/componentStyles.js";
import Generic from "../../test/test-elements/Generic.js";

describe("AnimationMode - duration", () => {
	it("is 0 when animation mode is none", () => {
		cy.wrap({ setAnimationMode }).invoke("setAnimationMode", "none");

		cy.wrap({ duration }).invoke("duration").should("equal", 0);
	});

	it("is 400 when animation mode is full", () => {
		cy.wrap({ setAnimationMode }).invoke("setAnimationMode", "full");

		cy.wrap({ duration }).invoke("duration").should("equal", 400);
	});
});

describe("AnimationMode - CommonStyles", () => {
	it("common styles sheet exists in the shadow root of a component", () => {
		cy.mount(<Generic />);

		cy.get("[ui5-test-generic]").shadow().should($shadow => {
			const shadowRoot = $shadow[0].getRootNode() as ShadowRoot;
			const componentStylesSheet = getComponentStyles();
			expect(shadowRoot.adoptedStyleSheets).to.include(componentStylesSheet);
			expect(componentStylesSheet.cssRules).not.be.empty;
		});
	});

	it("common styles sheet contains the animation-mode rule", () => {
		cy.mount(<Generic />);

		cy.wrap(null).should(() => {
			const sheet = getComponentStyles();
			const rules = Array.from(sheet.cssRules).map(r => r.cssText);
			expect(rules.some(r => r.includes("--_ui5-animation-mode"))).to.be.true;
		})
	});
});
