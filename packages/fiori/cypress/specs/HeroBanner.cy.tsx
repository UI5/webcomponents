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
		it("applies FullWidth layout by default", () => {
			cy.mount(
				<HeroBanner headerText="Hello, John">
					<div>Start</div>
				</HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-layout-FullWidth")
				.should("exist");
		});

		it("applies HalfWidth layout", () => {
			cy.mount(
				<HeroBanner headerText="Hello" layout="HalfWidth">
					<div>Start</div>
					<div slot="endContent">End</div>
				</HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-layout-HalfWidth")
				.should("exist");
		});

		it("applies TwoThirds layout", () => {
			cy.mount(
				<HeroBanner headerText="Hello" layout="TwoThirds">
					<div>Start</div>
					<div slot="endContent">End</div>
				</HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-layout-TwoThirds")
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

		it("renders both startContent and endContent in HalfWidth layout", () => {
			cy.mount(
				<HeroBanner headerText="Hello" layout="HalfWidth">
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

		it("renders headerActions slot", () => {
			cy.mount(
				<HeroBanner headerText="Hello">
					<div slot="headerActions" id="action1">Action 1</div>
					<div slot="headerActions" id="action2">Action 2</div>
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

		it("does not render headerActions wrapper when no headerActions are provided", () => {
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
		it("applies background image when set", () => {
			cy.mount(
				<HeroBanner
					headerText="Hello"
					backgroundImage="https://example.com/image.jpg"
				></HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-root")
				.should("have.class", "ui5-banner--has-bg-image")
				.and("have.attr", "style")
				.and("include", "url");
		});

		it("does not apply background image class when not set", () => {
			cy.mount(
				<HeroBanner headerText="Hello"></HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-root")
				.should("not.have.class", "ui5-banner--has-bg-image");
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
				<HeroBanner headerText="Hello" layout="FullWidth">
					<div>Start</div>
				</HeroBanner>
			);

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-layout-FullWidth")
				.should("exist");

			cy.get("[ui5-hero-banner]")
				.invoke("prop", "layout", "HalfWidth");

			cy.get("[ui5-hero-banner]")
				.shadow()
				.find(".ui5-banner-layout-HalfWidth")
				.should("exist");
		});
	});
});
