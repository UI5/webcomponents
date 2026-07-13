import DynamicPage from "../../../src/DynamicPage.js";
import DynamicPageTitle from "../../../src/DynamicPageTitle.js";
import DynamicPageHeader from "../../../src/DynamicPageHeader.js";
import Bar from "@ui5/webcomponents/dist/Bar.js";
import Button from "@ui5/webcomponents/dist/Button.js";

describe("DynamicPage visual", () => {
	it("basic state — header expanded", () => {
		cy.mount(
			<DynamicPage style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
					<div slot="subheading">Page Subtitle</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div style={{ padding: "16px" }}>Header content area</div>
				</DynamicPageHeader>
				<div style={{ padding: "16px" }}>Main page content</div>
			</DynamicPage>
		);
		cy.screenshot();
	});

	it("header snapped", () => {
		cy.mount(
			<DynamicPage headerSnapped={true} style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
					<div slot="snappedHeading">Snapped Title</div>
					<div slot="subheading">Page Subtitle</div>
					<div slot="snappedSubheading">Snapped Subtitle</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div style={{ padding: "16px" }}>Header content area</div>
				</DynamicPageHeader>
				<div style={{ padding: "16px" }}>Main page content</div>
			</DynamicPage>
		);
		cy.screenshot();
	});

	it("header pinned", () => {
		cy.mount(
			<DynamicPage headerPinned={true} style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div style={{ padding: "16px" }}>Pinned header content</div>
				</DynamicPageHeader>
				<div style={{ padding: "16px", height: "800px" }}>Scrollable content area</div>
			</DynamicPage>
		);
		cy.screenshot();
	});

	it("with footer visible", () => {
		cy.mount(
			<DynamicPage showFooter={true} style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div style={{ padding: "16px" }}>Header content</div>
				</DynamicPageHeader>
				<div style={{ padding: "16px" }}>Main page content</div>
				<Bar slot="footerArea" design="FloatingFooter">
					<Button slot="endContent" design="Emphasized">Save</Button>
					<Button slot="endContent">Cancel</Button>
				</Bar>
			</DynamicPage>
		);
		cy.screenshot();
	});

	it("without header area", () => {
		cy.mount(
			<DynamicPage style={{ height: "400px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title Without Header</div>
					<div slot="subheading">Only title area is present</div>
				</DynamicPageTitle>
				<div style={{ padding: "16px" }}>Content without a collapsible header</div>
			</DynamicPage>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<DynamicPage style={{ height: "500px" }}>
					<DynamicPageTitle slot="titleArea">
						<div slot="heading">Compact Page Title</div>
						<div slot="subheading">Compact Subtitle</div>
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
