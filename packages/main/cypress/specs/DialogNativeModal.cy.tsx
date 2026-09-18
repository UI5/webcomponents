import Dialog from "../../src/Dialog.js";
import Button from "../../src/Button.js";

describe("Dialog native modal", () => {
	it("opens as a modal dialog (top layer + :modal)", () => {
		cy.mount(
			<>
				<button id="outside">outside</button>
				<Dialog id="d"><Button id="inside">inside</Button></Dialog>
			</>
		);

		cy.get("#d").invoke("prop", "open", true);
		cy.get<Dialog>("#d").ui5DialogOpened();

		cy.get<Dialog>("#d").then($d => {
			const root = $d[0].shadowRoot!.querySelector("[root-element]") as HTMLDialogElement;
			expect(root.open).to.equal(true);
			expect(root.matches(":modal")).to.equal(true);
		});
	});

	it("makes background content inert while open", () => {
		cy.mount(
			<>
				<button id="outside">outside</button>
				<Dialog id="d2"><Button id="inside">inside</Button></Dialog>
			</>
		);

		cy.get("#d2").invoke("prop", "open", true);
		cy.get<Dialog>("#d2").ui5DialogOpened();

		cy.get("#outside").then($btn => {
			$btn[0].focus();
			expect(document.activeElement).to.not.equal($btn[0]);
		});
	});

	it("closes and restores focus", () => {
		cy.mount(
			<>
				<button id="opener">opener</button>
				<Dialog id="d3"><span>x</span></Dialog>
			</>
		);

		cy.get("#opener").then($b => $b[0].focus());
		cy.get("#d3").invoke("prop", "open", true);
		cy.get<Dialog>("#d3").ui5DialogOpened();
		cy.get("#d3").invoke("prop", "open", false);
		cy.get<Dialog>("#d3").ui5DialogClosed();

		cy.get("#opener").should("be.focused");
	});
});
