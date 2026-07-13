import IllustratedMessage from "../../../src/IllustratedMessage.js";
import "../../../src/illustrations/AllIllustrations.js";

describe("IllustratedMessage visual", () => {
	it("basic state — BeforeSearch", () => {
		cy.mount(<IllustratedMessage name="BeforeSearch" />);
		cy.screenshot();
	});

	it("illustration — NoData", () => {
		cy.mount(<IllustratedMessage name="NoData" />);
		cy.screenshot();
	});

	it("illustration — UnableToUpload", () => {
		cy.mount(<IllustratedMessage name="UnableToUpload" />);
		cy.screenshot();
	});

	it("illustration — SuccessScreen", () => {
		cy.mount(<IllustratedMessage name="SuccessScreen" />);
		cy.screenshot();
	});

	it("design — ExtraSmall", () => {
		cy.mount(<IllustratedMessage name="BeforeSearch" design="ExtraSmall" />);
		cy.screenshot();
	});

	it("design — Small", () => {
		cy.mount(<IllustratedMessage name="BeforeSearch" design="Small" />);
		cy.screenshot();
	});

	it("design — Medium", () => {
		cy.mount(<IllustratedMessage name="BeforeSearch" design="Medium" />);
		cy.screenshot();
	});

	it("design — Large", () => {
		cy.mount(<IllustratedMessage name="BeforeSearch" design="Large" />);
		cy.screenshot();
	});

	it("custom title and subtitle", () => {
		cy.mount(
			<IllustratedMessage
				name="NoData"
				titleText="No results found"
				subtitleText="Try adjusting your search or filter criteria."
			/>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<IllustratedMessage name="NoData" design="Small" />
			</div>
		);
		cy.screenshot();
	});
});
