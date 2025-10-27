import ResponsivePopover from "../../src/ResponsivePopover.js";
import Button from "../../src/Button.js";
import Input from "../../src/Input.js";
import Label from "../../src/Label.js";

describe("ResponsivePopover mobile general interaction", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice();
	});

	it("tests opening a popover from a responsive popover", () => {
		cy.mount(
			<>
				<Button id="btnOpen">open me</Button>
				<ResponsivePopover open={true} opener="btnOpen"></ResponsivePopover>
			</>
		);

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.should("be.visible");
	});

	it("tests showing of the dialog on phone", () => {
		cy.mount(<ResponsivePopover open={true} />);

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.should("be.visible");

		cy.get("[ui5-responsive-popover]")
			.should("not.be.visible");
	});
});

describe("Accessibility", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice();
	});

	it("tests accessible-role - Default", () => {
		cy.mount(
			<>
				<Button id="btnOpen">open me</Button>
				<ResponsivePopover open={true} opener="btnOpen"></ResponsivePopover>
			</>
		);

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "role", "dialog");

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "aria-modal", "true");
	});

	it("tests accessible-role - AlertDialog", () => {
		cy.mount(
			<>
				<Button id="btnOpen">open me</Button>
				<ResponsivePopover open={true} opener="btnOpen" accessibleRole="AlertDialog"></ResponsivePopover>
			</>
		);

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "role", "alertdialog");

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "aria-modal", "true");
	});

	it("tests accessible-role - None", () => {
		cy.mount(
			<>
				<Button id="btnOpen">open me</Button>
				<ResponsivePopover open={true} opener="btnOpen" accessibleRole="None"></ResponsivePopover>
			</>
		);

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.shadow()
			.find(".ui5-popup-root")
			.should("not.have.attr", "role", "alertdialog");

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.shadow()
			.find(".ui5-popup-root")
			.should("not.have.attr", "aria-modal", "true");
	});

	it("tests initial focus", () => {
		cy.mount(
			<>
				<Button id="btnOpen">open me</Button>
				<ResponsivePopover open={true} opener="btnOpen" initialFocus="emailInput">
					<Input id="emailInput"></Input>
				</ResponsivePopover>
			</>
		);

		cy.get("#emailInput")
			.should("be.focused");
	});

	it("Responsive popover accessibleDescriptionRef Tests", () => {
		cy.mount(
			<>
				<Label id="lblDesc1">FirstDesc</Label>
				<Label id="lblDesc2">SecondDesc</Label>
				<Label id="lblDesc3">ThirdDesc</Label>
				<ResponsivePopover id="respPopover" accessibleDescriptionRef="lblDesc1 lblDesc3"></ResponsivePopover>
			</>
		);

		// assert
		cy.get("#respPopover")
			.shadow()
			.find("ui5-dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "FirstDesc ThirdDesc");

		// act - update text of referenced label
		cy.get("#lblDesc1")
			.then($el => {
				$el.get(0).innerHTML = "First Label Desc";
			});

		// assert
		cy.get("#respPopover")
			.shadow()
			.find("ui5-dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "First Label Desc ThirdDesc");

		// act - update accessible-description-ref
		cy.get("#respPopover")
			.invoke("attr", "accessible-description-ref", "lblDesc2");

		// assert
		cy.get("#respPopover")
			.shadow()
			.find("ui5-dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "SecondDesc");

		// act - update accessible-description-ref
		cy.get("#respPopover")
			.invoke("attr", "accessible-description-ref", "lblDesc3");

		// assert
		cy.get("#respPopover")
			.shadow()
			.find("ui5-dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "ThirdDesc");

		// act - remove accessible-description-ref
		cy.get("#respPopover")
			.invoke("removeAttr", "accessible-description-ref");

		// assert
		cy.get("#respPopover")
			.shadow()
			.find("ui5-dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("not.have.text", "");
	});

	it("Responsive popover accessibleDescription Tests", () => {
		cy.mount(
			<>
				<ResponsivePopover id="respPopover" accessibleDescription="Some description added by accessibleDescription"></ResponsivePopover>
			</>
		);
		// assert
		cy.get("#respPopover")
			.shadow()
			.find("ui5-dialog")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "aria-describedby",  "accessibleDescription");

		cy.get("#respPopover")
			.shadow()
			.find("ui5-dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "Some description added by accessibleDescription");

		// act - update accessible-description
		cy.get("#respPopover")
			.invoke("attr", "accessible-description", "Some description added by accessibleDescription");

		// assert
		cy.get("#respPopover")
			.shadow()
			.find("ui5-dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "Some description added by accessibleDescription");

		// act - remove accessible-description
		cy.get("#respPopover")
			.invoke("removeAttr", "accessible-description");

		// assert
		cy.get("#respPopover")
			.shadow()
			.find("ui5-dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("not.have.text", "");
	});

	// both
	it("Responsive popover accessibleDescriptionRef and accessibleDescription Tests", () => {
		cy.mount(
			<>
				<Label id="lblDesc1">FirstDesc</Label>
				<Label id="lblDesc2">SecondDesc</Label>
				<ResponsivePopover id="respPopover" accessibleDescriptionRef="lblDesc1" accessibleDescription="Some description added by accessibleDescription"></ResponsivePopover>
			</>
		);

		// assert - accessibleDescription is used
		cy.get("#respPopover")
			.shadow()
			.find("ui5-dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "FirstDesc");

		// act - update text of referenced label
		cy.get("#lblDesc1")
			.then($el => {
				$el.get(0).innerHTML = "First Label Desc";
			});

		// assert - accessibleDescriptionRef is used
		cy.get("#respPopover")
			.shadow()
			.find("ui5-dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "First Label Desc");

		// act - remove accessible-description-ref
		cy.get("#respPopover")
			.invoke("removeAttr", "accessible-description-ref");

		// assert - accessibleDescription is used
		cy.get("#respPopover")
			.shadow()
			.find("ui5-dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "Some description added by accessibleDescription");

		// act - remove accessible-description
		cy.get("#respPopover")
			.invoke("removeAttr", "accessible-description");

		// assert - accessibleDescriptionRef is used
		cy.get("#respPopover")
			.shadow()
			.find("ui5-dialog")
			.shadow()
			.find("#accessibleDescription")
			.should("not.have.text", "");
	});
});
