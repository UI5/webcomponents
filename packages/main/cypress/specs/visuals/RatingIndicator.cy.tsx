import RatingIndicator from "../../../src/RatingIndicator.js";
import heart from "@ui5/webcomponents-icons/dist/heart.js";
import heart2 from "@ui5/webcomponents-icons/dist/heart-2.js";

describe("RatingIndicator visual", () => {
	it("basic state — no value", () => {
		cy.mount(<RatingIndicator />);
		cy.screenshot();
	});

	it("with value", () => {
		cy.mount(<RatingIndicator value={3} />);
		cy.screenshot();
	});

	it("half-star value", () => {
		cy.mount(<RatingIndicator value={2.5} />);
		cy.screenshot();
	});

	it("readonly", () => {
		cy.mount(<RatingIndicator value={3.5} readonly />);
		cy.screenshot();
	});

	it("disabled", () => {
		cy.mount(<RatingIndicator value={3} disabled />);
		cy.screenshot();
	});

	it("required", () => {
		cy.mount(<RatingIndicator required />);
		cy.screenshot();
	});

	it("custom max", () => {
		cy.mount(<RatingIndicator value={6} max={10} />);
		cy.screenshot();
	});

	it("size S", () => {
		cy.mount(<RatingIndicator value={3} size="S" />);
		cy.screenshot();
	});

	it("size L", () => {
		cy.mount(<RatingIndicator value={3} size="L" />);
		cy.screenshot();
	});

	it("custom icons", () => {
		cy.mount(<RatingIndicator value={3} ratedIcon={heart} unratedIcon={heart2} />);
		cy.screenshot();
	});

	it("custom icons — half-star", () => {
		cy.mount(<RatingIndicator value={2.5} ratedIcon={heart} unratedIcon={heart2} />);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<RatingIndicator value={3} />
			</div>
		);
		cy.screenshot();
	});
});
