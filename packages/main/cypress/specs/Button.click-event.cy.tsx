import Button from "../../src/Button.js";

describe("Button click event", () => {
	it("fires click event when button is clicked", () => {
		cy.mount(<Button onClick={cy.stub().as("click")}>Click me</Button>);

		cy.get<Button>("[ui5-button]")
			.realClick();

		cy.get("@click")
			.should("have.been.calledOnce");
	});

	it("fires click event on Space key press", () => {
		cy.mount(<Button onClick={cy.stub().as("click")}>Click me</Button>);

		cy.get<Button>("[ui5-button]")
			.realClick();

		cy.realPress("Space");

		cy.get("@click")
			.should("have.been.calledTwice");
	});

	it("fires click event on Enter key press", () => {
		cy.mount(<Button onClick={cy.stub().as("click")}>Click me</Button>);

		cy.get<Button>("[ui5-button]")
			.realClick();

		cy.realPress("Enter");

		cy.get("@click")
			.should("have.been.calledTwice");
	});

	it("does not fire click event on disabled button", () => {
		cy.mount(<Button disabled onClick={cy.stub().as("click")}>Disabled</Button>);

		cy.get<Button>("[ui5-button]")
			.realClick({ force: true });

		cy.get("@click")
			.should("not.have.been.called");
	});
});
