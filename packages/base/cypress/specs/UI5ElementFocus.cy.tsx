import Focusable from "../../test/test-elements/Focusable.js";

describe("UI5Element focus", () => {
	it("focuses synchronously when the shadow DOM is already rendered", () => {
		cy.mount(<>
			<Focusable id="webc"></Focusable>
			<button id="native">Native</button>
		</>);

		// Wait for the shadow DOM to render, then reproduce Component_Focus.html:
		// focus the UI5 element and then synchronously focus a native button.
		// focus() must be synchronous so the native button (focused last) wins and
		// is not stolen back on a later microtask. (With focus inside a shadow root,
		// a regression surfaces as activeElement === the host #webc.)
		cy.get("#webc").shadow().find("button").should("exist");

		cy.get("#webc").then($webc => {
			const webc = $webc.get(0)!;
			const native = webc.ownerDocument.getElementById("native")!;

			const focusPromise = webc.focus();
			native.focus();

			// Still focused once focus()'s promise settles (regression re-focuses here).
			return Cypress.Promise.resolve(focusPromise).then(() => {
				expect(webc.ownerDocument.activeElement).to.equal(native);
			});
		});
	});
});
