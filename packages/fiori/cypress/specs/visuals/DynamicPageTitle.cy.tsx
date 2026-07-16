import DynamicPage from "../../../src/DynamicPage.js";
import DynamicPageTitle from "../../../src/DynamicPageTitle.js";
import DynamicPageHeader from "../../../src/DynamicPageHeader.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButton from "@ui5/webcomponents/dist/ToolbarButton.js";
import ToolbarSpacer from "@ui5/webcomponents/dist/ToolbarSpacer.js";
import Breadcrumbs from "@ui5/webcomponents/dist/Breadcrumbs.js";
import BreadcrumbsItem from "@ui5/webcomponents/dist/BreadcrumbsItem.js";
import edit from "@ui5/webcomponents-icons/dist/edit.js";
import share from "@ui5/webcomponents-icons/dist/share.js";

describe("DynamicPageTitle visual", () => {
	it("basic state — heading only", () => {
		cy.mount(
			<DynamicPage style={{ height: "400px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div style={{ padding: "16px" }}>Header content</div>
				</DynamicPageHeader>
				<div style={{ padding: "16px" }}>Page content</div>
			</DynamicPage>
		);
		cy.screenshot();
	});

	it("with heading and subheading", () => {
		cy.mount(
			<DynamicPage style={{ height: "400px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
					<div slot="subheading">Page Subtitle description text</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div style={{ padding: "16px" }}>Header content</div>
				</DynamicPageHeader>
				<div style={{ padding: "16px" }}>Page content</div>
			</DynamicPage>
		);
		cy.screenshot();
	});

	it("with actions bar", () => {
		cy.mount(
			<DynamicPage style={{ height: "400px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
					<Toolbar slot="actionsBar">
						<ToolbarSpacer />
						<ToolbarButton icon={edit} text="Edit" />
						<ToolbarButton icon={share} text="Share" />
					</Toolbar>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div style={{ padding: "16px" }}>Header content</div>
				</DynamicPageHeader>
				<div style={{ padding: "16px" }}>Page content</div>
			</DynamicPage>
		);
		cy.screenshot();
	});

	it("with breadcrumbs", () => {
		cy.mount(
			<DynamicPage style={{ height: "400px" }}>
				<DynamicPageTitle slot="titleArea">
					<Breadcrumbs slot="breadcrumbs">
						<BreadcrumbsItem href="#">Home</BreadcrumbsItem>
						<BreadcrumbsItem href="#">Section</BreadcrumbsItem>
						<BreadcrumbsItem>Current Page</BreadcrumbsItem>
					</Breadcrumbs>
					<div slot="heading">Page Title</div>
					<div slot="subheading">Page Subtitle</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div style={{ padding: "16px" }}>Header content</div>
				</DynamicPageHeader>
				<div style={{ padding: "16px" }}>Page content</div>
			</DynamicPage>
		);
		cy.screenshot();
	});

	it("snapped state — with snappedHeading and snappedSubheading", () => {
		cy.mount(
			<DynamicPage headerSnapped={true} style={{ height: "400px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Expanded Heading</div>
					<div slot="snappedHeading">Snapped Heading</div>
					<div slot="subheading">Expanded Subtitle</div>
					<div slot="snappedSubheading">Snapped Subtitle</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div style={{ padding: "16px" }}>Header content</div>
				</DynamicPageHeader>
				<div style={{ padding: "16px" }}>Page content</div>
			</DynamicPage>
		);
		cy.screenshot();
	});

	it("snapped state — with actions bar", () => {
		cy.mount(
			<DynamicPage headerSnapped={true} style={{ height: "400px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
					<div slot="snappedHeading">Snapped Title</div>
					<Toolbar slot="actionsBar">
						<ToolbarSpacer />
						<ToolbarButton icon={edit} text="Edit" />
					</Toolbar>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div style={{ padding: "16px" }}>Header content</div>
				</DynamicPageHeader>
				<div style={{ padding: "16px" }}>Page content</div>
			</DynamicPage>
		);
		cy.screenshot();
	});

	it("full setup — all slots", () => {
		cy.mount(
			<DynamicPage style={{ height: "500px" }}>
				<DynamicPageTitle slot="titleArea">
					<Breadcrumbs slot="breadcrumbs">
						<BreadcrumbsItem href="#">Home</BreadcrumbsItem>
						<BreadcrumbsItem>Details</BreadcrumbsItem>
					</Breadcrumbs>
					<div slot="heading">Full Page Title</div>
					<div slot="snappedHeading">Full Snapped Title</div>
					<div slot="subheading">Full page subtitle with more details</div>
					<div slot="snappedSubheading">Snapped subtitle</div>
					<Toolbar slot="actionsBar">
						<ToolbarSpacer />
						<ToolbarButton icon={edit} text="Edit" />
						<ToolbarButton icon={share} text="Share" />
					</Toolbar>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div style={{ padding: "16px" }}>Header content</div>
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
						<div slot="subheading">Compact Subtitle</div>
						<Toolbar slot="actionsBar">
							<ToolbarSpacer />
							<ToolbarButton icon={edit} text="Edit" />
						</Toolbar>
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
