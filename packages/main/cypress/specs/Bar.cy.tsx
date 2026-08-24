import Bar from "../../src/Bar.js";
import Button from "../../src/Button.js";
import Input from "../../src/Input.js";

describe("Bar Accessibility", () => {
	it("Should use accessibleName property as aria-label", () => {
		cy.mount(
			<Bar accessibleName="Navigation Bar">
				<Button slot="startContent">Back</Button>
				<div>Page Title</div>
				<Button slot="endContent">Settings</Button>
			</Bar>
		);

		cy.get("[ui5-bar]")
			.shadow()
			.find(".ui5-bar-root")
			.should("have.attr", "aria-label", "Navigation Bar");
	});

	it("Should fallback to design property when accessibleName is not provided", () => {
		cy.mount(
			<Bar design="Header">
				<Button slot="startContent">Menu</Button>
				<div>Application Header</div>
				<Button slot="endContent">Profile</Button>
			</Bar>
		);

		cy.get("[ui5-bar]")
			.shadow()
			.find(".ui5-bar-root")
			.should("have.attr", "aria-label", "Header");
	});

	it("Should use accessibleName over design property when both are provided", () => {
		cy.mount(
			<Bar design="Footer" accessibleName="Custom Footer Label">
				<Button slot="startContent">Help</Button>
				<div>Footer Content</div>
				<Button slot="endContent">Contact</Button>
			</Bar>
		);

		cy.get("[ui5-bar]")
			.shadow()
			.find(".ui5-bar-root")
			.should("have.attr", "aria-label", "Custom Footer Label");
	});

	it("Should use accessibleNameRef over accessibleName when both are provided", () => {
		cy.mount(
			<div>
				<div id="external-label">External Navigation Label</div>
				<Bar accessibleName="Internal Label" accessibleNameRef="external-label">
					<Button slot="startContent">Back</Button>
					<div>Content</div>
					<Button slot="endContent">Forward</Button>
				</Bar>
			</div>
		);

		cy.get("[ui5-bar]")
			.shadow()
			.find(".ui5-bar-root")
			.should("have.attr", "aria-label", "External Navigation Label");
	});
});

describe("Bar Keyboard Navigation", () => {
	it("ArrowRight moves focus forward through all three slots", () => {
		cy.mount(
			<Bar>
				<Button id="btn-start" slot="startContent">Start</Button>
				<Button id="btn-mid">Middle</Button>
				<Button id="btn-end" slot="endContent">End</Button>
			</Bar>
		);

		cy.get("#btn-start").realClick().should("be.focused");
		cy.realPress("ArrowRight");
		cy.get("#btn-mid").should("be.focused");
		cy.realPress("ArrowRight");
		cy.get("#btn-end").should("be.focused");
	});

	it("ArrowLeft moves focus backward", () => {
		cy.mount(
			<Bar>
				<Button id="btn-start" slot="startContent">Start</Button>
				<Button id="btn-mid">Middle</Button>
				<Button id="btn-end" slot="endContent">End</Button>
			</Bar>
		);

		cy.get("#btn-start").realClick().should("be.focused");
		cy.realPress("ArrowRight");
		cy.get("#btn-mid").should("be.focused");
		cy.realPress("ArrowRight");
		cy.get("#btn-end").should("be.focused");
		cy.realPress("ArrowLeft");
		cy.get("#btn-mid").should("be.focused");
		cy.realPress("ArrowLeft");
		cy.get("#btn-start").should("be.focused");
	});

	it("ArrowRight at last item does not move focus", () => {
		cy.mount(
			<Bar>
				<Button id="btn-start" slot="startContent">Start</Button>
				<Button id="btn-end" slot="endContent">End</Button>
			</Bar>
		);

		cy.get("#btn-start").realClick().should("be.focused");
		cy.realPress("ArrowRight");
		cy.get("#btn-end").should("be.focused");
		cy.realPress("ArrowRight");
		cy.get("#btn-end").should("be.focused");
	});

	it("ArrowLeft at first item does not move focus", () => {
		cy.mount(
			<Bar>
				<Button id="btn-start" slot="startContent">Start</Button>
				<Button id="btn-end" slot="endContent">End</Button>
			</Bar>
		);

		cy.get("#btn-start").realClick().should("be.focused");
		cy.realPress("ArrowLeft");
		cy.get("#btn-start").should("be.focused");
	});

	it("End key jumps to last focusable item", () => {
		cy.mount(
			<Bar>
				<Button id="btn-start" slot="startContent">Start</Button>
				<Button id="btn-mid">Middle</Button>
				<Button id="btn-end" slot="endContent">End</Button>
			</Bar>
		);

		cy.get("#btn-start").realClick().should("be.focused");
		cy.realPress("End");
		cy.get("#btn-end").should("be.focused");
	});

	it("Home key jumps to first focusable item", () => {
		cy.mount(
			<Bar>
				<Button id="btn-start" slot="startContent">Start</Button>
				<Button id="btn-mid">Middle</Button>
				<Button id="btn-end" slot="endContent">End</Button>
			</Bar>
		);

		cy.get("#btn-start").realClick().should("be.focused");
		cy.realPress("End");
		cy.get("#btn-end").should("be.focused");
		cy.realPress("Home");
		cy.get("#btn-start").should("be.focused");
	});

	it("ArrowRight inside input with mid-text caret does not move focus", () => {
		cy.mount(
			<Bar>
				<Input id="input-start" slot="startContent" value="hello"></Input>
				<Button id="btn-end" slot="endContent">End</Button>
			</Bar>
		);

		cy.get("#input-start").realClick();
		// place caret at position 2 (middle of "hello")
		cy.get("#input-start").shadow().find("input").then($input => {
			$input[0].setSelectionRange(2, 2);
		});
		cy.realPress("ArrowRight");
		cy.get("#btn-end").should("not.be.focused");
	});

	it("ArrowRight at end of input text moves focus to next item", () => {
		cy.mount(
			<Bar>
				<Input id="input-start" slot="startContent" value="hello"></Input>
				<Button id="btn-end" slot="endContent">End</Button>
			</Bar>
		);

		cy.get("#input-start").realClick();
		cy.get("#input-start").shadow().find("input").then($input => {
			$input[0].setSelectionRange(5, 5); // end of "hello"
		});
		cy.realPress("ArrowRight");
		cy.get("#btn-end").should("be.focused");
	});

	it("Navigation is disabled when accessibleRole is None", () => {
		cy.mount(
			<Bar accessibleRole="None">
				<Button id="btn-start" slot="startContent">Start</Button>
				<Button id="btn-end" slot="endContent">End</Button>
			</Bar>
		);

		cy.get("#btn-start").realClick().should("be.focused");
		cy.realPress("ArrowRight");
		cy.get("#btn-end").should("not.be.focused");
	});
});