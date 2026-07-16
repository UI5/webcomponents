import DynamicPage from "../../../src/DynamicPage.js";
import DynamicPageTitle from "../../../src/DynamicPageTitle.js";
import DynamicPageHeader from "../../../src/DynamicPageHeader.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Label from "@ui5/webcomponents/dist/Label.js";

describe("DynamicPageHeader visual", () => {
	it("basic state — expanded", () => {
		cy.mount(
			<DynamicPage style={{ height: "500px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div style={{ padding: "16px" }}>Header content area</div>
				</DynamicPageHeader>
				<div style={{ padding: "16px" }}>Page content</div>
			</DynamicPage>
		);
		cy.screenshot();
	});

	it("snapped state", () => {
		cy.mount(
			<DynamicPage headerSnapped={true} style={{ height: "500px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
					<div slot="snappedHeading">Snapped Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div style={{ padding: "16px" }}>Header content area</div>
				</DynamicPageHeader>
				<div style={{ padding: "16px" }}>Page content</div>
			</DynamicPage>
		);
		cy.screenshot();
	});

	it("with rich content", () => {
		cy.mount(
			<DynamicPage style={{ height: "500px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Employee Profile</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div style={{ display: "flex", gap: "32px", padding: "16px" }}>
						<div>
							<Label>Name</Label>
							<div>John Doe</div>
						</div>
						<div>
							<Label>Department</Label>
							<div>Engineering</div>
						</div>
						<div>
							<Label>Location</Label>
							<div>Berlin</div>
						</div>
					</div>
				</DynamicPageHeader>
				<div style={{ padding: "16px" }}>Page content</div>
			</DynamicPage>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<DynamicPage style={{ height: "400px" }}>
					<DynamicPageTitle slot="titleArea">
						<div slot="heading">Compact Title</div>
					</DynamicPageTitle>
					<DynamicPageHeader slot="headerArea">
						<div style={{ padding: "8px" }}>Compact header content</div>
					</DynamicPageHeader>
					<div style={{ padding: "8px" }}>Compact content</div>
				</DynamicPage>
			</div>
		);
		cy.screenshot();
	});
});
