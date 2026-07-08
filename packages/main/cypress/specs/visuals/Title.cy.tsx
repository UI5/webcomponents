import Title from "../../../src/Title.js";

describe("Title visual", () => {
	it("all heading levels", () => {
		cy.mount(
			<div>
				<Title level="H1">Title H1</Title>
				<Title level="H2">Title H2</Title>
				<Title level="H3">Title H3</Title>
				<Title level="H4">Title H4</Title>
				<Title level="H5">Title H5</Title>
				<Title level="H6">Title H6</Title>
			</div>
		);
		cy.screenshot();
	});

	it("all size variants", () => {
		cy.mount(
			<div>
				<Title size="H1">Title size H1</Title>
				<Title size="H2">Title size H2</Title>
				<Title size="H3">Title size H3</Title>
				<Title size="H4">Title size H4</Title>
				<Title size="H5">Title size H5</Title>
				<Title size="H6">Title size H6</Title>
			</div>
		);
		cy.screenshot();
	});

	it("default level and size", () => {
		cy.mount(<Title>Default Title</Title>);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Title level="H1">Title H1</Title>
				<Title level="H2">Title H2</Title>
				<Title level="H3">Title H3</Title>
				<Title level="H4">Title H4</Title>
				<Title level="H5">Title H5</Title>
				<Title level="H6">Title H6</Title>
			</div>
		);
		cy.screenshot();
	});

	it("wrappingType None — truncated", () => {
		cy.mount(
			<div style={{ width: "200px" }}>
				<Title wrappingType="None">This long title should be truncated and not wrap to the next line</Title>
			</div>
		);
		cy.screenshot();
	});

	it("wrappingType Normal — wraps", () => {
		cy.mount(
			<div style={{ width: "200px" }}>
				<Title wrappingType="Normal">This long title should wrap to multiple lines in the available space</Title>
			</div>
		);
		cy.screenshot();
	});
});
