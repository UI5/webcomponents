import Dialog from "../../src/Dialog.js";
import Button from "../../src/Button.js";
import Popover from "../../src/Popover.js";

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

describe("Dialog native cancel/ESC", () => {
	it("closes on Escape via native cancel", () => {
		cy.mount(<Dialog id="e1"><span>x</span></Dialog>);
		cy.get("#e1").invoke("prop", "open", true);
		cy.get<Dialog>("#e1").ui5DialogOpened();

		cy.realPress("Escape");
		cy.get<Dialog>("#e1").ui5DialogClosed();
		cy.get("#e1").should("have.prop", "open", false);
	});

	it("stays open when before-close is prevented on Escape", () => {
		cy.mount(<Dialog id="e2"><span>x</span></Dialog>);
		cy.get<Dialog>("#e2").then($d => {
			$d[0].addEventListener("ui5-before-close", (e: Event) => e.preventDefault());
		});
		cy.get("#e2").invoke("prop", "open", true);
		cy.get<Dialog>("#e2").ui5DialogOpened();

		cy.realPress("Escape");
		// Settle window: confirm the prevented cancel does not close the dialog
		// on a later tick (asserting a non-event, so a fixed wait is required).
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(100);
		cy.get("#e2").should("have.prop", "open", true);
	});

	it("Escape closes only the popup layered above the dialog, not the dialog", () => {
		// Regression: a native modal <dialog> owns the topmost CloseWatcher, so
		// its "cancel" fires on Escape even when a non-native popup (dropdown /
		// Popover) is open above it. The dialog must not close while that popup
		// is dismissed by the OpenedPopupsRegistry.
		cy.mount(
			<>
				<Dialog id="ld">
					<Button id="lo">opener</Button>
				</Dialog>
				<Popover id="lp" opener="lo"><span>popover content</span></Popover>
			</>
		);

		cy.get("#ld").invoke("prop", "open", true);
		cy.get<Dialog>("#ld").ui5DialogOpened();

		// Fresh user activation is needed for the native <dialog>'s "cancel"
		// to be cancelable; without it Escape force-closes the dialog. Clicking
		// keeps the first Escape's cancel cancelable so the dialog stays open.
		cy.get("#lo").realClick();

		// Open a non-native popup on top of the dialog.
		cy.get("#lp").invoke("prop", "open", true);
		cy.get("#lp").should("have.prop", "open", true);

		// Escape dismisses only the layered popup; the dialog stays open.
		cy.realPress("Escape");

		cy.get("#lp").should("have.prop", "open", false);
		cy.get("#ld").should("have.prop", "open", true);

		// A second Escape now closes the dialog itself.
		cy.realPress("Escape");
		cy.get<Dialog>("#ld").ui5DialogClosed();
		cy.get("#ld").should("have.prop", "open", false);
	});
});
