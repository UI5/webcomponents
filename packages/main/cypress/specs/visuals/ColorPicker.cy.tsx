import ColorPicker from "../../../src/ColorPicker.js";

describe("ColorPicker visual", () => {
	it("basic state — default color", () => {
		cy.mount(
			<ColorPicker value="rgba(255,255,255,1)" />
		);
		cy.screenshot();
	});

	it("with red color selected", () => {
		cy.mount(
			<ColorPicker value="rgba(255,0,0,1)" />
		);
		cy.screenshot();
	});

	it("with blue color selected", () => {
		cy.mount(
			<ColorPicker value="darkblue" />
		);
		cy.screenshot();
	});

	it("with semi-transparent color", () => {
		cy.mount(
			<ColorPicker value="rgba(0,128,0,0.5)" />
		);
		cy.screenshot();
	});

	it("simplified mode — no alpha or RGB inputs", () => {
		cy.mount(
			<ColorPicker simplified value="rgba(255,0,0,1)" />
		);
		cy.screenshot();
	});

	it("HSL mode toggled", () => {
		cy.mount(
			<ColorPicker value="rgba(255,0,0,1)" />
		);
		cy.get("[ui5-color-picker]").shadow().find("#toggle-picker-mode").realClick();
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<ColorPicker value="rgba(255,0,0,1)" />
			</div>
		);
		cy.screenshot();
	});
});
