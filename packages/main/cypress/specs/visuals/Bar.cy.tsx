import Bar from "../../../src/Bar.js";
import Button from "../../../src/Button.js";

describe("Bar visual", () => {
	it("basic state — Header design", () => {
		cy.mount(
			<Bar>
				<Button slot="startContent">Back</Button>
				<div>Page Title</div>
				<Button slot="endContent">Settings</Button>
			</Bar>
		);
		cy.screenshot();
	});

	it("compact mode — Header design", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Bar>
					<Button slot="startContent">Back</Button>
					<div>Page Title</div>
					<Button slot="endContent">Settings</Button>
				</Bar>
			</div>
		);
		cy.screenshot();
	});

	it("design — Subheader", () => {
		cy.mount(
			<Bar design="Subheader">
				<Button slot="startContent">Menu</Button>
				<div>Subheader Title</div>
				<Button slot="endContent">Profile</Button>
			</Bar>
		);
		cy.screenshot();
	});

	it("design — Footer", () => {
		cy.mount(
			<Bar design="Footer">
				<Button slot="startContent">Help</Button>
				<div>Footer Content</div>
				<Button slot="endContent">Contact</Button>
			</Bar>
		);
		cy.screenshot();
	});

	it("design — FloatingFooter", () => {
		cy.mount(
			<Bar design="FloatingFooter">
				<Button slot="startContent">Cancel</Button>
				<Button slot="endContent">Save</Button>
			</Bar>
		);
		cy.screenshot();
	});

	it("start content only", () => {
		cy.mount(
			<Bar>
				<Button slot="startContent">Back</Button>
			</Bar>
		);
		cy.screenshot();
	});

	it("end content only", () => {
		cy.mount(
			<Bar>
				<Button slot="endContent">Save</Button>
			</Bar>
		);
		cy.screenshot();
	});

	it("middle content only", () => {
		cy.mount(
			<Bar>
				<div>Centered Title</div>
			</Bar>
		);
		cy.screenshot();
	});

	it("long content — shrinked layout", () => {
		cy.mount(
			<Bar style={{ width: "300px" }}>
				<Button slot="startContent">Very Long Button Label Here</Button>
				<div>A Very Long Page Title That Takes Up Space</div>
				<Button slot="endContent">Another Long Label</Button>
			</Bar>
		);
		cy.screenshot();
	});
});
