import ShellBar from "../../src/ShellBar.js";
import ShellBarSearch from "../../src/ShellBarSearch.js";
import ShellBarSpacer from "../../src/ShellBarSpacer.js";
import Input from "@ui5/webcomponents/dist/Input.js";

// Safe buffer over the implementation's 100ms throttle (matches the pattern in ShellBar.cy.tsx).
const RESIZE_THROTTLE_RATE = 300; // ms

describe("Mobile Behaviour", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice();
	});

	it("Test self-collapsible search is not auto-opened on initial load", () => {
		cy.mount(
			<ShellBar id="shellbar" showSearchField={true}>
				<ShellBarSearch id="search" slot="searchField"></ShellBarSearch>
			</ShellBar>
		);

		// On initial load, search should stay collapsed even with showSearchField=true
		// to prevent the full-screen search dialog from appearing unexpectedly
		cy.get("#search").should("have.prop", "open", false);
	});

	it("Test self-collapsible search opens when user clicks the search field", () => {
		cy.mount(
			<ShellBar id="shellbar">
				<ShellBarSearch id="search" slot="searchField"></ShellBarSearch>
			</ShellBar>
		);

		// Click search field to open search dialog
		cy.get("#search").click();
		cy.get("#search").should("have.prop", "open", true);
	});

	it("Test shellbar should have show-search-field when search is open", () => {
		cy.mount(
			<ShellBar id="shellbar">
				<ShellBarSearch id="search" slot="searchField" open={true}></ShellBarSearch>
			</ShellBar>
		);

		cy.get("#shellbar").should("have.prop", "showSearchField", true);
	});

	it("Test search does not auto-expand from resize on mobile", () => {
		// Matches the reproduction layout: spacer-only content gives the spacer
		// enough width in landscape to cross the 25rem expand threshold.
		cy.mount(
			<ShellBar id="shellbar">
				<ShellBarSpacer slot="content"></ShellBarSpacer>
				<ShellBarSearch id="search" slot="searchField"></ShellBarSearch>
			</ShellBar>
		);

		// Start in portrait — search is collapsed, no full-screen dialog.
		cy.viewport(440, 956);
		// Wait for the initial resize cycle to clear the `initialRender` flag.
		cy.wait(RESIZE_THROTTLE_RATE);

		// Simulate orientation change to landscape (same as rotating the device).
		cy.viewport(956, 440);
		cy.wait(RESIZE_THROTTLE_RATE);

		// Search must stay collapsed — no auto-expand from a resize/orientation event on non-desktop.
		cy.get("#shellbar").should("have.prop", "showSearchField", false);
		cy.get("#search").should("have.prop", "open", false);
	});

	it("Test legacy search does not auto-expand from resize on mobile", () => {
		// Same scenario with a legacy ui5-input in the searchField slot (ShellBarSearchLegacy path).
		cy.mount(
			<ShellBar id="shellbar">
				<ShellBarSpacer slot="content"></ShellBarSpacer>
				<Input id="search" slot="searchField"></Input>
			</ShellBar>
		);

		cy.viewport(440, 956);
		cy.wait(RESIZE_THROTTLE_RATE);

		cy.viewport(956, 440);
		cy.wait(RESIZE_THROTTLE_RATE);

		cy.get("#shellbar").should("have.prop", "showSearchField", false);
	});
});
