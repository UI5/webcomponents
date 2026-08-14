import HeroBanner from "../../../src/HeroBanner.js";

describe("HeroBanner visual", () => {
	it("basic state — header only", () => {
		cy.mount(
			<HeroBanner headerText="Hello, John" />
		);
		cy.screenshot();
	});

	it("with overline text", () => {
		cy.mount(
			<HeroBanner headerText="Hello, John" overlineText="Monday, March 6, 2026" />
		);
		cy.screenshot();
	});

	it("with start content", () => {
		cy.mount(
			<HeroBanner headerText="Hello, John" overlineText="Monday, March 6, 2026">
				<div style={{ padding: "16px", background: "var(--sapTile_Background)", borderRadius: "8px" }}>
					<strong>KPI Card</strong>
					<p>Open tasks: 12</p>
				</div>
			</HeroBanner>
		);
		cy.screenshot();
	});

	it("columnsRatio — FirstWider with end content", () => {
		cy.mount(
			<HeroBanner headerText="Hello, John" overlineText="Monday, March 6, 2026" columnsRatio="FirstWider">
				<div style={{ padding: "16px", background: "var(--sapTile_Background)", borderRadius: "8px" }}>
					<strong>Start Content</strong>
					<p>This block is wider (2/3).</p>
				</div>
				<div slot="endContent" style={{ padding: "16px", background: "var(--sapTile_Background)", borderRadius: "8px" }}>
					<strong>End Content</strong>
					<p>This block is narrower (1/3).</p>
				</div>
			</HeroBanner>
		);
		cy.screenshot();
	});

	it("columnsRatio — Equal with end content", () => {
		cy.mount(
			<HeroBanner headerText="Hello, John" columnsRatio="Equal">
				<div style={{ padding: "16px", background: "var(--sapTile_Background)", borderRadius: "8px" }}>
					<strong>Start Content</strong>
					<p>50% width.</p>
				</div>
				<div slot="endContent" style={{ padding: "16px", background: "var(--sapTile_Background)", borderRadius: "8px" }}>
					<strong>End Content</strong>
					<p>50% width.</p>
				</div>
			</HeroBanner>
		);
		cy.screenshot();
	});

	it("with actions — actionsPlacement TopEnd (default)", () => {
		cy.mount(
			<HeroBanner headerText="Hello, John" overlineText="Monday, March 6, 2026">
				<button slot="actions">Manage</button>
				<button slot="actions">Settings</button>
			</HeroBanner>
		);
		cy.screenshot();
	});

	it("with actions — actionsPlacement BottomStart", () => {
		cy.mount(
			<HeroBanner headerText="Hello, John" overlineText="Monday, March 6, 2026" actionsPlacement="BottomStart">
				<button slot="actions">Manage</button>
				<button slot="actions">Settings</button>
			</HeroBanner>
		);
		cy.screenshot();
	});

	it("headerBlockPlacement — Bottom with end content only", () => {
		cy.mount(
			<HeroBanner headerText="Hello, John" overlineText="Monday, March 6, 2026" columnsRatio="Equal" headerBlockPlacement="Bottom">
				<div slot="endContent" style={{ padding: "16px", background: "var(--sapTile_Background)", borderRadius: "8px", height: "120px" }}>
					<strong>End Content</strong>
					<p>Header is pushed to bottom of column 1.</p>
				</div>
			</HeroBanner>
		);
		cy.screenshot();
	});

	it("headerBlockPlacement — Bottom with actionsPlacement BottomStart", () => {
		cy.mount(
			<HeroBanner headerText="Hello, John" columnsRatio="Equal" headerBlockPlacement="Bottom" actionsPlacement="BottomStart">
				<button slot="actions">Manage</button>
				<div slot="endContent" style={{ padding: "16px", background: "var(--sapTile_Background)", borderRadius: "8px", height: "120px" }}>
					<strong>End Content</strong>
					<p>Spans full height when both Bottom placements are set.</p>
				</div>
			</HeroBanner>
		);
		cy.screenshot();
	});

	it("no headerText and no overlineText — content only", () => {
		cy.mount(
			<HeroBanner>
				<div style={{ padding: "16px", background: "var(--sapTile_Background)", borderRadius: "8px" }}>
					<strong>Start Content Only</strong>
					<p>No header or overline.</p>
				</div>
			</HeroBanner>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<HeroBanner headerText="Hello, John" overlineText="Monday, March 6, 2026">
					<div style={{ padding: "8px", background: "var(--sapTile_Background)", borderRadius: "8px" }}>
						<strong>Start Content</strong>
					</div>
				</HeroBanner>
			</div>
		);
		cy.screenshot();
	});

	it("narrow viewport — single stacked column", () => {
		cy.viewport(600, 500);
		cy.mount(
			<HeroBanner headerText="Hello, John" overlineText="March 6, 2026" columnsRatio="Equal">
				<div style={{ padding: "16px", background: "var(--sapTile_Background)", borderRadius: "8px" }}>
					<strong>Start Content</strong>
					<p>Stacks vertically on small screens.</p>
				</div>
				<div slot="endContent" style={{ padding: "16px", background: "var(--sapTile_Background)", borderRadius: "8px" }}>
					<strong>End Content</strong>
					<p>Also stacked.</p>
				</div>
			</HeroBanner>
		);
		cy.screenshot();
	});
});
