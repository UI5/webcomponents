import Switch from "../../../src/Switch.js";

describe("Switch visual", () => {
	it("Textual design — unchecked", () => {
		cy.mount(<Switch design="Textual" accessibleName="Notifications" />);
		cy.screenshot();
	});

	it("Textual design — checked", () => {
		cy.mount(<Switch design="Textual" checked accessibleName="Notifications" />);
		cy.screenshot();
	});

	it("Textual design — custom labels", () => {
		cy.mount(<Switch design="Textual" textOn="ON" textOff="OFF" />);
		cy.screenshot();
	});

	it("Textual design — custom labels checked", () => {
		cy.mount(<Switch design="Textual" textOn="ON" textOff="OFF" checked />);
		cy.screenshot();
	});

	it("Graphical design — unchecked", () => {
		cy.mount(<Switch design="Graphical" accessibleName="Dark mode" />);
		cy.screenshot();
	});

	it("Graphical design — checked", () => {
		cy.mount(<Switch design="Graphical" checked accessibleName="Dark mode" />);
		cy.screenshot();
	});

	it("disabled — unchecked", () => {
		cy.mount(<Switch design="Textual" disabled accessibleName="Disabled switch" />);
		cy.screenshot();
	});

	it("disabled — checked", () => {
		cy.mount(<Switch design="Textual" checked disabled accessibleName="Disabled switch" />);
		cy.screenshot();
	});

	it("readonly — checked", () => {
		cy.mount(<Switch design="Textual" checked readonly accessibleName="Readonly switch" />);
		cy.screenshot();
	});

	it("both designs side by side", () => {
		cy.mount(
			<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
				<Switch design="Textual" textOn="Yes" textOff="No" checked />
				<Switch design="Graphical" checked accessibleName="Graphical" />
			</div>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size style={{ display: "flex", gap: "16px" }}>
				<Switch design="Textual" accessibleName="Compact off" />
				<Switch design="Textual" checked accessibleName="Compact on" />
			</div>
		);
		cy.screenshot();
	});
});
