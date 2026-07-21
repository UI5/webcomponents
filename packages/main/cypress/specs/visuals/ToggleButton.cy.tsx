import ToggleButton from "../../../src/ToggleButton.js";
import favorite from "@ui5/webcomponents-icons/dist/favorite.js";

describe("ToggleButton visual", () => {
	it("basic state", () => {
		cy.mount(<ToggleButton>Toggle Button</ToggleButton>);
		cy.screenshot();
	});

	it("pressed state", () => {
		cy.mount(<ToggleButton pressed>Toggle Button</ToggleButton>);
		cy.screenshot();
	});

	it("disabled state", () => {
		cy.mount(<ToggleButton disabled>Toggle Button</ToggleButton>);
		cy.screenshot();
	});

	it("disabled pressed state", () => {
		cy.mount(<ToggleButton disabled pressed>Toggle Button</ToggleButton>);
		cy.screenshot();
	});

	it("with icon — unpressed", () => {
		cy.mount(<ToggleButton icon={favorite}>Favorite</ToggleButton>);
		cy.screenshot();
	});

	it("with icon — pressed", () => {
		cy.mount(<ToggleButton icon={favorite} pressed>Favorite</ToggleButton>);
		cy.screenshot();
	});

	it("icon only — unpressed", () => {
		cy.mount(<ToggleButton icon={favorite} />);
		cy.screenshot();
	});

	it("icon only — pressed", () => {
		cy.mount(<ToggleButton icon={favorite} pressed />);
		cy.screenshot();
	});

	it("design Emphasized — unpressed", () => {
		cy.mount(<ToggleButton design="Emphasized">Emphasized</ToggleButton>);
		cy.screenshot();
	});

	it("design Emphasized — pressed", () => {
		cy.mount(<ToggleButton design="Emphasized" pressed>Emphasized</ToggleButton>);
		cy.screenshot();
	});

	it("design Positive — unpressed", () => {
		cy.mount(<ToggleButton design="Positive">Positive</ToggleButton>);
		cy.screenshot();
	});

	it("design Positive — pressed", () => {
		cy.mount(<ToggleButton design="Positive" pressed>Positive</ToggleButton>);
		cy.screenshot();
	});

	it("design Negative — unpressed", () => {
		cy.mount(<ToggleButton design="Negative">Negative</ToggleButton>);
		cy.screenshot();
	});

	it("design Negative — pressed", () => {
		cy.mount(<ToggleButton design="Negative" pressed>Negative</ToggleButton>);
		cy.screenshot();
	});

	it("design Transparent — unpressed", () => {
		cy.mount(<ToggleButton design="Transparent">Transparent</ToggleButton>);
		cy.screenshot();
	});

	it("design Transparent — pressed", () => {
		cy.mount(<ToggleButton design="Transparent" pressed>Transparent</ToggleButton>);
		cy.screenshot();
	});

	it("design Attention — unpressed", () => {
		cy.mount(<ToggleButton design="Attention">Attention</ToggleButton>);
		cy.screenshot();
	});

	it("design Attention — pressed", () => {
		cy.mount(<ToggleButton design="Attention" pressed>Attention</ToggleButton>);
		cy.screenshot();
	});

	it("compact mode — basic", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<ToggleButton>Toggle Button</ToggleButton>
			</div>
		);
		cy.screenshot();
	});

	it("compact mode — pressed", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<ToggleButton pressed>Toggle Button</ToggleButton>
			</div>
		);
		cy.screenshot();
	});

	it("focused — unpressed", () => {
		cy.mount(<ToggleButton>Toggle Button</ToggleButton>);
		cy.get("[ui5-toggle-button]").shadow().find(".ui5-button-root").focus();
		cy.screenshot();
	});

	it("focused — pressed", () => {
		cy.mount(<ToggleButton pressed>Toggle Button</ToggleButton>);
		cy.get("[ui5-toggle-button]").shadow().find(".ui5-button-root").focus();
		cy.screenshot();
	});
});
