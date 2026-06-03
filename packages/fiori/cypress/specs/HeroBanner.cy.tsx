import HeroBanner from "../../src/HeroBanner.js";

describe("HeroBanner", () => {
	describe("Rendering", () => {
		it("renders with default configuration", () => {
			cy.mount(
				<HeroBanner headerText="Hello, John"></HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-root")
				.should("exist");

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-heading")
				.should("have.text", "Hello, John");
		});

		it("renders salutation text", () => {
			cy.mount(
				<HeroBanner headerText="Good Morning, Jane"></HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-heading")
				.should("have.text", "Good Morning, Jane");
		});

		it("renders date text when provided", () => {
			cy.mount(
				<HeroBanner headerText="Hello, John" overlineText="March 6, 2026"></HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-overline")
				.should("have.text", "March 6, 2026");
		});

		it("does not render date element when overlineText is not set", () => {
			cy.mount(
				<HeroBanner headerText="Hello, John"></HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-overline")
				.should("not.exist");
		});

		it("does not render heading element when headerText is not set", () => {
			cy.mount(
				<HeroBanner></HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-heading")
				.should("not.exist");
		});
	});

	describe("Layout", () => {
		it("applies OneColumn layout by default", () => {
			cy.mount(
				<HeroBanner headerText="Hello, John">
					<div>Start</div>
				</HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-layout-OneColumn")
				.should("exist");
		});

		it("applies OneOneColumns layout", () => {
			cy.mount(
				<HeroBanner headerText="Hello" layout="OneOneColumns">
					<div>Start</div>
					<div slot="endContent">End</div>
				</HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-layout-OneOneColumns")
				.should("exist");
		});

		it("applies TwoOneColumns layout", () => {
			cy.mount(
				<HeroBanner headerText="Hello" layout="TwoOneColumns">
					<div>Start</div>
					<div slot="endContent">End</div>
				</HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-layout-TwoOneColumns")
				.should("exist");
		});
	});

	describe("Slots", () => {
		it("renders startContent slot", () => {
			cy.mount(
				<HeroBanner headerText="Hello">
					<div id="start-block">Start Content</div>
				</HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.find("#start-block")
				.should("exist")
				.and("have.text", "Start Content");
		});

		it("renders endContent slot", () => {
			cy.mount(
				<HeroBanner headerText="Hello">
					<div slot="endContent" id="end-block">End Content</div>
				</HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.find("#end-block")
				.should("exist")
				.and("have.text", "End Content");
		});

		it("renders both startContent and endContent in OneOneColumns layout", () => {
			cy.mount(
				<HeroBanner headerText="Hello" layout="OneOneColumns">
					<div id="start">Left</div>
					<div slot="endContent" id="end">Right</div>
				</HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.find("#start")
				.should("exist");

			cy.get("[ui5-hero-banner]")
				.find("#end")
				.should("exist");

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-block-start")
				.should("exist");

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-block-end")
				.should("exist");
		});

		it("renders actions slot", () => {
			cy.mount(
				<HeroBanner headerText="Hello">
					<div slot="actions" id="action1">Action 1</div>
					<div slot="actions" id="action2">Action 2</div>
				</HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.find("#action1")
				.should("exist");

			cy.get("[ui5-hero-banner]")
				.find("#action2")
				.should("exist");

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-actions")
				.should("exist");
		});

		it("does not render actions wrapper when no actions are provided", () => {
			cy.mount(
				<HeroBanner headerText="Hello"></HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-actions")
				.should("not.exist");
		});
	});

	describe("Background Image", () => {
		it("applies background image via CSS variable", () => {
			cy.mount(
				<HeroBanner headerText="Hello"></HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.invoke("attr", "style", "--_ui5_banner_background_image: url(https://example.com/image.jpg)");

			cy.get("[ui5-hero-banner]")
				.should("have.attr", "style")
				.and("include", "--_ui5_banner_background_image");
		});
	});

	describe("Height constraints", () => {
		it("respects minimum height", () => {
			cy.mount(
				<HeroBanner headerText="Hello"></HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-root")
				.invoke("css", "min-height")
				.should("equal", "92px"); // 5.75rem = 92px at default font-size
		});
	});

	describe("Accessibility", () => {
		it("has role banner on the root element", () => {
			cy.mount(
				<HeroBanner headerText="Hello, John"></HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-root")
				.should("have.attr", "role", "banner");
		});
	});

	describe("Properties", () => {
		it("updates headerText dynamically", () => {
			cy.mount(
				<HeroBanner headerText="Hello, John"></HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-heading")
				.should("have.text", "Hello, John");

			cy.get("[ui5-hero-banner]")
				.invoke("prop", "headerText", "Hello, Jane");

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-heading")
				.should("have.text", "Hello, Jane");
		});

		it("updates overlineText dynamically", () => {
			cy.mount(
				<HeroBanner headerText="Hello" overlineText="March 6"></HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-overline")
				.should("have.text", "March 6");

			cy.get("[ui5-hero-banner]")
				.invoke("prop", "overlineText", "March 7");

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-overline")
				.should("have.text", "March 7");
		});

		it("updates layout dynamically", () => {
			cy.mount(
				<HeroBanner headerText="Hello" layout="OneColumn">
					<div>Start</div>
				</HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-layout-OneColumn")
				.should("exist");

			cy.get("[ui5-hero-banner]")
				.invoke("prop", "layout", "OneOneColumns");

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-layout-OneOneColumns")
				.should("exist");
		});
	});

	describe("headerTextBlockPlacement", () => {
		it("reflects Top as the default value", () => {
			cy.mount(
				<HeroBanner headerText="Hello"></HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.should("have.attr", "header-text-block-placement", "Top");
		});

		it("reflects Bottom value as attribute", () => {
			cy.mount(
				<HeroBanner headerText="Hello" headerTextBlockPlacement="Bottom"></HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.should("have.attr", "header-text-block-placement", "Bottom");
		});

		it("header-text block exists in both positions", () => {
			cy.mount(
				<HeroBanner headerText="Hello" headerTextBlockPlacement="Bottom"></HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-header-text")
				.should("exist");
		});

		it("updates headerTextBlockPlacement dynamically", () => {
			cy.mount(
				<HeroBanner headerText="Hello"></HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.should("have.attr", "header-text-block-placement", "Top");

			cy.get("[ui5-hero-banner]")
				.invoke("prop", "headerTextBlockPlacement", "Bottom");

			cy.get("[ui5-hero-banner]")
				.should("have.attr", "header-text-block-placement", "Bottom");
		});
	});

	describe("actionsPlacement", () => {
		it("reflects TopEnd as the default value", () => {
			cy.mount(
				<HeroBanner headerText="Hello">
					<div slot="actions">Action</div>
				</HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.should("have.attr", "actions-placement", "TopEnd");
		});

		it("renders actions inside header row when TopEnd", () => {
			cy.mount(
				<HeroBanner headerText="Hello" actionsPlacement="TopEnd">
					<div slot="actions" id="action">Action</div>
				</HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-header > .ui5-banner-actions")
				.should("exist");

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-header-text .ui5-banner-actions")
				.should("not.exist");
		});

		it("renders actions inside header-text block when BottomStart", () => {
			cy.mount(
				<HeroBanner headerText="Hello" actionsPlacement="BottomStart">
					<div slot="actions" id="action">Action</div>
				</HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-header-text .ui5-banner-actions-bottom-start")
				.should("exist");

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-header > .ui5-banner-actions")
				.should("not.exist");
		});

		it("endContent block exists alongside BottomStart actions", () => {
			cy.mount(
				<HeroBanner headerText="Hello" actionsPlacement="BottomStart" layout="OneOneColumns">
					<div slot="actions">Action</div>
					<div slot="endContent">End</div>
				</HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-block-end")
				.should("exist");
		});

		it("updates actionsPlacement dynamically", () => {
			cy.mount(
				<HeroBanner headerText="Hello" actionsPlacement="TopEnd">
					<div slot="actions">Action</div>
				</HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-header > .ui5-banner-actions")
				.should("exist");

			cy.get("[ui5-hero-banner]")
				.invoke("prop", "actionsPlacement", "BottomStart");

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-header-text .ui5-banner-actions-bottom-start")
				.should("exist");

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-header > .ui5-banner-actions")
				.should("not.exist");
		});
	});
});
