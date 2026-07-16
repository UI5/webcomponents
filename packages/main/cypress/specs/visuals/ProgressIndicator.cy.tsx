import ProgressIndicator from "../../../src/ProgressIndicator.js";
import { setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";

describe("ProgressIndicator visual", () => {
	before(() => {
		cy.wrap({ setAnimationMode }).then(api => api.setAnimationMode("none"));
	});

	it("0% — empty", () => {
		cy.mount(<ProgressIndicator value={0} />);
		cy.screenshot();
	});

	it("25%", () => {
		cy.mount(<ProgressIndicator value={25} />);
		cy.screenshot();
	});

	it("50%", () => {
		cy.mount(<ProgressIndicator value={50} />);
		cy.screenshot();
	});

	it("75%", () => {
		cy.mount(<ProgressIndicator value={75} />);
		cy.screenshot();
	});

	it("100% — full", () => {
		cy.mount(<ProgressIndicator value={100} />);
		cy.screenshot();
	});

	it("custom displayValue", () => {
		cy.mount(<ProgressIndicator value={60} displayValue="Step 3 of 5" />);
		cy.screenshot();
	});

	it("value state — Negative", () => {
		cy.mount(<ProgressIndicator value={40} valueState="Negative" />);
		cy.screenshot();
	});

	it("value state — Critical", () => {
		cy.mount(<ProgressIndicator value={60} valueState="Critical" />);
		cy.screenshot();
	});

	it("value state — Positive", () => {
		cy.mount(<ProgressIndicator value={80} valueState="Positive" />);
		cy.screenshot();
	});

	it("value state — Information", () => {
		cy.mount(<ProgressIndicator value={50} valueState="Information" />);
		cy.screenshot();
	});

	it("disabled", () => {
		cy.mount(<ProgressIndicator value={50} disabled />);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<ProgressIndicator value={50} />
			</div>
		);
		cy.screenshot();
	});
});
