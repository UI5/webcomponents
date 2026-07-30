import Input from "../../../src/Input.js";

describe("Input visual", () => {
	it("basic state", () => {
		cy.mount(<Input placeholder="Enter text" />);
		cy.screenshot();
	});

	it("with value", () => {
		cy.mount(<Input value="Hello World" />);
		cy.screenshot();
	});

	it("type — Password", () => {
		cy.mount(<Input type="Password" value="secret123" />);
		cy.screenshot();
	});

	it("type — Number", () => {
		cy.mount(<Input type="Number" value="42" />);
		cy.screenshot();
	});

	it("type — Search", () => {
		cy.mount(<Input type="Search" placeholder="Search..." />);
		cy.screenshot();
	});

	it("disabled state", () => {
		cy.mount(<Input value="Disabled input" disabled />);
		cy.screenshot();
	});

	it("readonly state", () => {
		cy.mount(<Input value="Read-only input" readonly />);
		cy.screenshot();
	});

	it("value state — Negative", () => {
		cy.mount(
			<Input value="invalid@" valueState="Negative">
				<span slot="valueStateMessage">Invalid input</span>
			</Input>
		);
		cy.screenshot();
	});

	it("value state — Negative — focused", () => {
		cy.mount(
			<Input value="invalid@" valueState="Negative">
				<span slot="valueStateMessage">Invalid input</span>
			</Input>
		);
		cy.get("[ui5-input]").shadow().find("input").realClick();
		cy.screenshot();
	});

	it("value state — Critical", () => {
		cy.mount(
			<Input value="warning text" valueState="Critical">
				<span slot="valueStateMessage">Please review</span>
			</Input>
		);
		cy.screenshot();
	});

	it("value state — Critical — focused", () => {
		cy.mount(
			<Input value="warning text" valueState="Critical">
				<span slot="valueStateMessage">Please review</span>
			</Input>
		);
		cy.get("[ui5-input]").shadow().find("input").realClick();
		cy.screenshot();
	});

	it("value state — Positive", () => {
		cy.mount(
			<Input value="valid input" valueState="Positive">
				<span slot="valueStateMessage">Looks good</span>
			</Input>
		);
		cy.screenshot();
	});

	it("value state — Positive — focused", () => {
		cy.mount(
			<Input value="valid input" valueState="Positive">
				<span slot="valueStateMessage">Looks good</span>
			</Input>
		);
		cy.get("[ui5-input]").shadow().find("input").realClick();
		cy.screenshot();
	});

	it("value state — Information", () => {
		cy.mount(
			<Input value="info text" valueState="Information">
				<span slot="valueStateMessage">Additional info</span>
			</Input>
		);
		cy.screenshot();
	});

	it("value state — Information — focused", () => {
		cy.mount(
			<Input value="info text" valueState="Information">
				<span slot="valueStateMessage">Additional info</span>
			</Input>
		);
		cy.get("[ui5-input]").shadow().find("input").realClick();
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
				<Input placeholder="Compact input" />
				<Input value="Compact with value" />
			</div>
		);
		cy.screenshot();
	});
});
