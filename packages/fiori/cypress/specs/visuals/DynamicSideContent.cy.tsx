import DynamicSideContent from "../../../src/DynamicSideContent.js";

describe("DynamicSideContent visual", () => {
	it("basic state", () => {
		cy.mount(
			<DynamicSideContent style={{ height: "300px" }}>
				<div style={{ padding: "16px" }}>
					<h2>Main Content</h2>
					<p>This is the main content area.</p>
				</div>
				<div slot="sideContent" style={{ padding: "16px" }}>
					<h2>Side Content</h2>
					<p>This is the side content area.</p>
				</div>
			</DynamicSideContent>
		);
		cy.screenshot();
	});

	it("sideContentPosition — Start", () => {
		cy.mount(
			<DynamicSideContent sideContentPosition="Start" style={{ height: "300px" }}>
				<div style={{ padding: "16px" }}>
					<h2>Main Content</h2>
					<p>Side content appears before main content.</p>
				</div>
				<div slot="sideContent" style={{ padding: "16px" }}>
					<h2>Side Content</h2>
					<p>Side is on the left (LTR).</p>
				</div>
			</DynamicSideContent>
		);
		cy.screenshot();
	});

	it("equalSplit", () => {
		cy.mount(
			<DynamicSideContent equalSplit style={{ height: "300px" }}>
				<div style={{ padding: "16px" }}>
					<h2>Main Content</h2>
					<p>Takes 50% of width.</p>
				</div>
				<div slot="sideContent" style={{ padding: "16px" }}>
					<h2>Side Content</h2>
					<p>Takes 50% of width.</p>
				</div>
			</DynamicSideContent>
		);
		cy.screenshot();
	});

	it("hideMainContent", () => {
		cy.mount(
			<DynamicSideContent hideMainContent style={{ height: "300px" }}>
				<div style={{ padding: "16px" }}>
					<h2>Main Content</h2>
					<p>This should be hidden.</p>
				</div>
				<div slot="sideContent" style={{ padding: "16px" }}>
					<h2>Side Content</h2>
					<p>Only side content is visible.</p>
				</div>
			</DynamicSideContent>
		);
		cy.screenshot();
	});

	it("hideSideContent", () => {
		cy.mount(
			<DynamicSideContent hideSideContent style={{ height: "300px" }}>
				<div style={{ padding: "16px" }}>
					<h2>Main Content</h2>
					<p>Only main content is visible.</p>
				</div>
				<div slot="sideContent" style={{ padding: "16px" }}>
					<h2>Side Content</h2>
					<p>This should be hidden.</p>
				</div>
			</DynamicSideContent>
		);
		cy.screenshot();
	});

	it("sideContentVisibility — AlwaysShow at S breakpoint", () => {
		cy.viewport(600, 500);
		cy.mount(
			<DynamicSideContent sideContentVisibility="AlwaysShow" style={{ height: "400px" }}>
				<div style={{ padding: "16px" }}>
					<h2>Main Content</h2>
					<p>Mobile viewport — side content falls below main.</p>
				</div>
				<div slot="sideContent" style={{ padding: "16px" }}>
					<h2>Side Content</h2>
					<p>Always shown, even on mobile.</p>
				</div>
			</DynamicSideContent>
		);
		cy.screenshot();
	});

	it("sideContentVisibility — NeverShow", () => {
		cy.mount(
			<DynamicSideContent sideContentVisibility="NeverShow" style={{ height: "300px" }}>
				<div style={{ padding: "16px" }}>
					<h2>Main Content</h2>
					<p>Side content is never shown.</p>
				</div>
				<div slot="sideContent" style={{ padding: "16px" }}>
					<h2>Side Content</h2>
					<p>This should never appear.</p>
				</div>
			</DynamicSideContent>
		);
		cy.screenshot();
	});

	it("sideContentFallDown — BelowXL at L breakpoint", () => {
		cy.viewport(1300, 700);
		cy.mount(
			<DynamicSideContent sideContentFallDown="BelowXL" style={{ height: "400px" }}>
				<div style={{ padding: "16px" }}>
					<h2>Main Content</h2>
					<p>At L breakpoint, side content falls below.</p>
				</div>
				<div slot="sideContent" style={{ padding: "16px" }}>
					<h2>Side Content</h2>
					<p>Appears below main content at L.</p>
				</div>
			</DynamicSideContent>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<DynamicSideContent style={{ height: "300px" }}>
					<div style={{ padding: "8px" }}>
						<h2>Main Content</h2>
						<p>Compact mode.</p>
					</div>
					<div slot="sideContent" style={{ padding: "8px" }}>
						<h2>Side Content</h2>
						<p>Compact mode.</p>
					</div>
				</DynamicSideContent>
			</div>
		);
		cy.screenshot();
	});

	it("S breakpoint — side content hidden by default", () => {
		cy.viewport(600, 500);
		cy.mount(
			<DynamicSideContent style={{ height: "300px" }}>
				<div style={{ padding: "16px" }}>
					<h2>Main Content</h2>
					<p>At S breakpoint, side content is hidden.</p>
				</div>
				<div slot="sideContent" style={{ padding: "16px" }}>
					<h2>Side Content</h2>
					<p>Hidden on mobile by default.</p>
				</div>
			</DynamicSideContent>
		);
		cy.screenshot();
	});

	it("XL breakpoint — 75/25 split", () => {
		cy.viewport(1600, 700);
		cy.mount(
			<DynamicSideContent style={{ height: "300px" }}>
				<div style={{ padding: "16px" }}>
					<h2>Main Content</h2>
					<p>Takes ~75% of the width at XL breakpoint.</p>
				</div>
				<div slot="sideContent" style={{ padding: "16px" }}>
					<h2>Side Content</h2>
					<p>Takes ~25% of the width at XL breakpoint.</p>
				</div>
			</DynamicSideContent>
		);
		cy.screenshot();
	});

	it("M breakpoint — fixed side content width", () => {
		cy.viewport(900, 500);
		cy.mount(
			<DynamicSideContent style={{ height: "300px" }}>
				<div style={{ padding: "16px" }}>
					<h2>Main Content</h2>
					<p>Main content fills the remaining space.</p>
				</div>
				<div slot="sideContent" style={{ padding: "16px" }}>
					<h2>Side Content</h2>
					<p>Fixed 340px width at M breakpoint.</p>
				</div>
			</DynamicSideContent>
		);
		cy.screenshot();
	});
});
