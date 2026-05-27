import Bar from "../../src/Bar.js";
import Button from "../../src/Button.js";

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