import Page from "../../../src/Page.js";
import Bar from "@ui5/webcomponents/dist/Bar.js";
import Button from "@ui5/webcomponents/dist/Button.js";

describe("Page visual", () => {
	it("basic state", () => {
		cy.mount(
			<Page style={{ height: "300px" }}>
				<div style={{ padding: "16px" }}>Page content goes here.</div>
			</Page>
		);
		cy.screenshot();
	});

	it("with header and footer", () => {
		cy.mount(
			<Page style={{ height: "300px" }}>
				<Bar slot="header"><div slot="startContent"><strong>Page Title</strong></div></Bar>
				<div style={{ padding: "16px" }}>Page with header and footer.</div>
				<Bar slot="footer"><Button slot="endContent" design="Emphasized">Save</Button><Button slot="endContent">Cancel</Button></Bar>
			</Page>
		);
		cy.screenshot();
	});

	it("backgroundDesign — Solid", () => {
		cy.mount(
			<Page backgroundDesign="Solid" style={{ height: "300px" }}>
				<div style={{ padding: "16px" }}>Solid background.</div>
			</Page>
		);
		cy.screenshot();
	});

	it("backgroundDesign — List", () => {
		cy.mount(
			<Page backgroundDesign="List" style={{ height: "300px" }}>
				<div style={{ padding: "16px" }}>List background.</div>
			</Page>
		);
		cy.screenshot();
	});

	it("backgroundDesign — Transparent", () => {
		cy.mount(
			<Page backgroundDesign="Transparent" style={{ height: "300px" }}>
				<div style={{ padding: "16px" }}>Transparent background.</div>
			</Page>
		);
		cy.screenshot();
	});

	it("fixed footer", () => {
		cy.mount(
			<Page style={{ height: "300px" }} fixedFooter>
				<Bar slot="header"><div slot="startContent"><strong>Fixed Footer Page</strong></div></Bar>
				<div style={{ padding: "16px" }}>Content with a fixed footer that stays at the bottom.</div>
				<Bar slot="footer"><Button slot="endContent" design="Emphasized">Confirm</Button></Bar>
			</Page>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Page style={{ height: "200px" }}>
					<Bar slot="header"><div slot="startContent"><strong>Compact Page</strong></div></Bar>
					<div style={{ padding: "8px" }}>Compact mode content.</div>
					<Bar slot="footer"><Button slot="endContent">OK</Button></Bar>
				</Page>
			</div>
		);
		cy.screenshot();
	});
});
