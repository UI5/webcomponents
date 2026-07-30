import Text from "../../../src/Text.js";

const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet";

describe("Text visual", () => {
	it("basic state", () => {
		cy.mount(<Text>Simple text</Text>);
		cy.screenshot();
	});

	it("long wrapping text — full width", () => {
		cy.mount(<Text>{LOREM}</Text>);
		cy.screenshot();
	});

	it("long wrapping text — narrow (6rem)", () => {
		cy.mount(
			<div style={{ width: "6rem" }}>
				<Text>{LOREM}</Text>
			</div>
		);
		cy.screenshot();
	});

	it("maxLines = 1 — full width", () => {
		cy.mount(<Text maxLines={1}>{LOREM}</Text>);
		cy.screenshot();
	});

	it("maxLines = 1 — narrow (6rem)", () => {
		cy.mount(
			<div style={{ width: "6rem" }}>
				<Text maxLines={1}>{LOREM}</Text>
			</div>
		);
		cy.screenshot();
	});

	it("maxLines = 2 — full width", () => {
		cy.mount(<Text maxLines={2}>{LOREM}</Text>);
		cy.screenshot();
	});

	it("maxLines = 2 — narrow (6rem)", () => {
		cy.mount(
			<div style={{ width: "6rem" }}>
				<Text maxLines={2}>{LOREM}</Text>
			</div>
		);
		cy.screenshot();
	});

	it("maxLines = 3 — full width", () => {
		cy.mount(<Text maxLines={3}>{LOREM}</Text>);
		cy.screenshot();
	});

	it("maxLines = 3 — narrow (6rem)", () => {
		cy.mount(
			<div style={{ width: "6rem" }}>
				<Text maxLines={3}>{LOREM}</Text>
			</div>
		);
		cy.screenshot();
	});

	it("maxLines = 4 — full width", () => {
		cy.mount(<Text maxLines={4}>{LOREM}</Text>);
		cy.screenshot();
	});

	it("maxLines = 4 — narrow (6rem)", () => {
		cy.mount(
			<div style={{ width: "6rem" }}>
				<Text maxLines={4}>{LOREM}</Text>
			</div>
		);
		cy.screenshot();
	});

	it("empty indicator mode On", () => {
		cy.mount(<Text emptyIndicatorMode="On"></Text>);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Text>{LOREM}</Text>
			</div>
		);
		cy.screenshot();
	});
});
