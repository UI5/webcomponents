import Breadcrumbs from "../../../src/Breadcrumbs.js";
import BreadcrumbsItem from "../../../src/BreadcrumbsItem.js";

describe("Breadcrumbs visual", () => {
	it("basic state — Standard design", () => {
		cy.mount(
			<Breadcrumbs>
				<BreadcrumbsItem href="/">Root</BreadcrumbsItem>
				<BreadcrumbsItem href="/products">Products</BreadcrumbsItem>
				<BreadcrumbsItem href="/products/laptops">Laptops</BreadcrumbsItem>
				<BreadcrumbsItem>Current Page</BreadcrumbsItem>
			</Breadcrumbs>
		);
		cy.screenshot();
	});

	it("design — NoCurrentPage", () => {
		cy.mount(
			<Breadcrumbs design="NoCurrentPage">
				<BreadcrumbsItem href="/">Root</BreadcrumbsItem>
				<BreadcrumbsItem href="/products">Products</BreadcrumbsItem>
				<BreadcrumbsItem href="/products/laptops">Laptops</BreadcrumbsItem>
				<BreadcrumbsItem href="/products/laptops/detail">Detail</BreadcrumbsItem>
			</Breadcrumbs>
		);
		cy.screenshot();
	});

	it("separator — Slash (default)", () => {
		cy.mount(
			<Breadcrumbs separators="Slash">
				<BreadcrumbsItem href="/">Root</BreadcrumbsItem>
				<BreadcrumbsItem href="/section">Section</BreadcrumbsItem>
				<BreadcrumbsItem>Current</BreadcrumbsItem>
			</Breadcrumbs>
		);
		cy.screenshot();
	});

	it("separator — GreaterThan", () => {
		cy.mount(
			<Breadcrumbs separators="GreaterThan">
				<BreadcrumbsItem href="/">Root</BreadcrumbsItem>
				<BreadcrumbsItem href="/section">Section</BreadcrumbsItem>
				<BreadcrumbsItem>Current</BreadcrumbsItem>
			</Breadcrumbs>
		);
		cy.screenshot();
	});

	it("separator — BackSlash", () => {
		cy.mount(
			<Breadcrumbs separators="BackSlash">
				<BreadcrumbsItem href="/">Root</BreadcrumbsItem>
				<BreadcrumbsItem href="/section">Section</BreadcrumbsItem>
				<BreadcrumbsItem>Current</BreadcrumbsItem>
			</Breadcrumbs>
		);
		cy.screenshot();
	});

	it("separator — DoubleGreaterThan", () => {
		cy.mount(
			<Breadcrumbs separators="DoubleGreaterThan">
				<BreadcrumbsItem href="/">Root</BreadcrumbsItem>
				<BreadcrumbsItem href="/section">Section</BreadcrumbsItem>
				<BreadcrumbsItem>Current</BreadcrumbsItem>
			</Breadcrumbs>
		);
		cy.screenshot();
	});

	it("overflow — narrow container", () => {
		cy.mount(
			<div style={{ width: "250px" }}>
				<Breadcrumbs>
					<BreadcrumbsItem href="/">Root</BreadcrumbsItem>
					<BreadcrumbsItem href="/level1">Level 1</BreadcrumbsItem>
					<BreadcrumbsItem href="/level2">Level 2</BreadcrumbsItem>
					<BreadcrumbsItem href="/level3">Level 3</BreadcrumbsItem>
					<BreadcrumbsItem href="/level4">Level 4</BreadcrumbsItem>
					<BreadcrumbsItem>Current</BreadcrumbsItem>
				</Breadcrumbs>
			</div>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Breadcrumbs>
					<BreadcrumbsItem href="/">Root</BreadcrumbsItem>
					<BreadcrumbsItem href="/products">Products</BreadcrumbsItem>
					<BreadcrumbsItem>Current Page</BreadcrumbsItem>
				</Breadcrumbs>
			</div>
		);
		cy.screenshot();
	});
});
