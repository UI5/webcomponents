import StepInput from "../../../src/StepInput.js";

describe("StepInput visual", () => {
	it("basic state", () => {
		cy.mount(<StepInput value={5} />);
		cy.screenshot();
	});

	it("with placeholder", () => {
		cy.mount(<StepInput placeholder="Enter number" />);
		cy.screenshot();
	});

	it("at minimum value", () => {
		cy.mount(<StepInput min={0} max={10} value={0} />);
		cy.screenshot();
	});

	it("at maximum value", () => {
		cy.mount(<StepInput min={0} max={10} value={10} />);
		cy.screenshot();
	});

	it("with decimal precision", () => {
		cy.mount(<StepInput value={3.14} valuePrecision={2} step={0.01} />);
		cy.screenshot();
	});

	it("value state — Negative", () => {
		cy.mount(<StepInput value={5} valueState="Negative" />);
		cy.screenshot();
	});

	it("value state — Critical", () => {
		cy.mount(<StepInput value={5} valueState="Critical" />);
		cy.screenshot();
	});

	it("value state — Positive", () => {
		cy.mount(<StepInput value={5} valueState="Positive" />);
		cy.screenshot();
	});

	it("value state — Information", () => {
		cy.mount(<StepInput value={5} valueState="Information" />);
		cy.screenshot();
	});

	it("disabled", () => {
		cy.mount(<StepInput value={5} disabled />);
		cy.screenshot();
	});

	it("readonly", () => {
		cy.mount(<StepInput value={5} readonly />);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<StepInput value={5} />
			</div>
		);
		cy.screenshot();
	});
});
