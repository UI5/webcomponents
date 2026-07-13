import ExpandableText from "../../../src/ExpandableText.js";

const SHORT_TEXT = "Short text that fits within limit.";
const LONG_TEXT =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";

describe("ExpandableText visual", () => {
	it("text within maxCharacters — no toggle shown", () => {
		cy.mount(
			<ExpandableText text={SHORT_TEXT} maxCharacters={100} />
		);
		cy.screenshot();
	});

	it("text exceeds maxCharacters — collapsed (Show More)", () => {
		cy.mount(
			<ExpandableText text={LONG_TEXT} maxCharacters={100} />
		);
		cy.screenshot();
	});

	it("text exceeds maxCharacters — expanded (Show Less)", () => {
		cy.mount(
			<ExpandableText text={LONG_TEXT} maxCharacters={100} />
		);
		cy.get("[ui5-expandable-text]").shadow().find(".ui5-exp-text-toggle").realClick();
		cy.screenshot();
	});

	it("overflow mode — Popover (collapsed)", () => {
		cy.mount(
			<ExpandableText text={LONG_TEXT} maxCharacters={100} overflowMode="Popover" />
		);
		cy.screenshot();
	});

	it("overflow mode — Popover (open)", () => {
		cy.mount(
			<ExpandableText text={LONG_TEXT} maxCharacters={100} overflowMode="Popover" />
		);
		cy.get("[ui5-expandable-text]").shadow().find(".ui5-exp-text-toggle").realClick();
		cy.get("[ui5-expandable-text]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("empty indicator mode — On", () => {
		cy.mount(
			<ExpandableText text="" emptyIndicatorMode="On" />
		);
		cy.screenshot();
	});

	it("custom maxCharacters — 50", () => {
		cy.mount(
			<ExpandableText text={LONG_TEXT} maxCharacters={50} />
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<ExpandableText text={LONG_TEXT} maxCharacters={100} />
			</div>
		);
		cy.screenshot();
	});
});
