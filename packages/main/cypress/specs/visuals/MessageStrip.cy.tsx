import MessageStrip from "../../../src/MessageStrip.js";

describe("MessageStrip visual", () => {
	it("design — Information", () => {
		cy.mount(<MessageStrip design="Information">This is an informational message.</MessageStrip>);
		cy.screenshot();
	});

	it("design — Positive", () => {
		cy.mount(<MessageStrip design="Positive">Operation completed successfully.</MessageStrip>);
		cy.screenshot();
	});

	it("design — Negative", () => {
		cy.mount(<MessageStrip design="Negative">An error has occurred.</MessageStrip>);
		cy.screenshot();
	});

	it("design — Critical", () => {
		cy.mount(<MessageStrip design="Critical">Please review your input.</MessageStrip>);
		cy.screenshot();
	});

	it("design — ColorSet1", () => {
		cy.mount(<MessageStrip design="ColorSet1">ColorSet1 message strip.</MessageStrip>);
		cy.screenshot();
	});

	it("design — ColorSet2", () => {
		cy.mount(<MessageStrip design="ColorSet2">ColorSet2 message strip.</MessageStrip>);
		cy.screenshot();
	});

	it("hide close button", () => {
		cy.mount(<MessageStrip design="Information" hideCloseButton>This message cannot be dismissed.</MessageStrip>);
		cy.screenshot();
	});

	it("all designs stacked", () => {
		cy.mount(
			<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
				<MessageStrip design="Information">Information</MessageStrip>
				<MessageStrip design="Positive">Positive</MessageStrip>
				<MessageStrip design="Negative">Negative</MessageStrip>
				<MessageStrip design="Critical">Critical</MessageStrip>
				<MessageStrip design="ColorSet1">ColorSet1</MessageStrip>
				<MessageStrip design="ColorSet2">ColorSet2</MessageStrip>
			</div>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<MessageStrip design="Negative">Compact error message.</MessageStrip>
			</div>
		);
		cy.screenshot();
	});
});
