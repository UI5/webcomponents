import Banner from "../../src/Banner.js";

describe("Banner", () => {
	describe("Rendering", () => {
		it("renders with default configuration", () => {
			cy.mount(
				<Banner salutationText="Hello, John"></Banner>
			);

			cy.get("[ui5-banner]")
				.shadow()
				.find(".ui5-banner-root")
				.should("exist");

			cy.get("[ui5-banner]")
				.shadow()
				.find(".ui5-banner-salutation")
				.should("have.text", "Hello, John");
		});

		it("renders salutation text", () => {
			cy.mount(
				<Banner salutationText="Good Morning, Jane"></Banner>
			);

			cy.get("[ui5-banner]")
				.shadow()
				.find(".ui5-banner-salutation")
				.should("have.text", "Good Morning, Jane");
		});

		it("renders date text when provided", () => {
			cy.mount(
				<Banner salutationText="Hello, John" dateText="March 6, 2026"></Banner>
			);

			cy.get("[ui5-banner]")
				.shadow()
				.find(".ui5-banner-date")
				.should("have.text", "March 6, 2026");
		});

		it("does not render date element when dateText is not set", () => {
			cy.mount(
				<Banner salutationText="Hello, John"></Banner>
			);

			cy.get("[ui5-banner]")
				.shadow()
				.find(".ui5-banner-date")
				.should("not.exist");
		});

		it("does not render salutation element when salutationText is not set", () => {
			cy.mount(
				<Banner></Banner>
			);

			cy.get("[ui5-banner]")
				.shadow()
				.find(".ui5-banner-salutation")
				.should("not.exist");
		});
	});

	describe("Layout", () => {
		it("applies FullWidth layout by default", () => {
			cy.mount(
				<Banner salutationText="Hello, John">
					<div slot="startContent">Start</div>
				</Banner>
			);

			cy.get("[ui5-banner]")
				.shadow()
				.find(".ui5-banner-layout-FullWidth")
				.should("exist");
		});

		it("applies HalfWidth layout", () => {
			cy.mount(
				<Banner salutationText="Hello" layout="HalfWidth">
					<div slot="startContent">Start</div>
					<div slot="endContent">End</div>
				</Banner>
			);

			cy.get("[ui5-banner]")
				.shadow()
				.find(".ui5-banner-layout-HalfWidth")
				.should("exist");
		});

		it("applies TwoThirds layout", () => {
			cy.mount(
				<Banner salutationText="Hello" layout="TwoThirds">
					<div slot="startContent">Start</div>
					<div slot="endContent">End</div>
				</Banner>
			);

			cy.get("[ui5-banner]")
				.shadow()
				.find(".ui5-banner-layout-TwoThirds")
				.should("exist");
		});
	});

	describe("Slots", () => {
		it("renders startContent slot", () => {
			cy.mount(
				<Banner salutationText="Hello">
					<div slot="startContent" id="start-block">Start Content</div>
				</Banner>
			);

			cy.get("[ui5-banner]")
				.find("#start-block")
				.should("exist")
				.and("have.text", "Start Content");
		});

		it("renders endContent slot", () => {
			cy.mount(
				<Banner salutationText="Hello">
					<div slot="endContent" id="end-block">End Content</div>
				</Banner>
			);

			cy.get("[ui5-banner]")
				.find("#end-block")
				.should("exist")
				.and("have.text", "End Content");
		});

		it("renders default slot content", () => {
			cy.mount(
				<Banner salutationText="Hello">
					<div id="default-content">Default Content</div>
				</Banner>
			);

			cy.get("[ui5-banner]")
				.find("#default-content")
				.should("exist")
				.and("have.text", "Default Content");
		});

		it("renders both startContent and endContent in HalfWidth layout", () => {
			cy.mount(
				<Banner salutationText="Hello" layout="HalfWidth">
					<div slot="startContent" id="start">Left</div>
					<div slot="endContent" id="end">Right</div>
				</Banner>
			);

			cy.get("[ui5-banner]")
				.find("#start")
				.should("exist");

			cy.get("[ui5-banner]")
				.find("#end")
				.should("exist");

			cy.get("[ui5-banner]")
				.shadow()
				.find(".ui5-banner-block-start")
				.should("exist");

			cy.get("[ui5-banner]")
				.shadow()
				.find(".ui5-banner-block-end")
				.should("exist");
		});
	});

	describe("Background Image", () => {
		it("applies background image when set", () => {
			cy.mount(
				<Banner
					salutationText="Hello"
					backgroundImage="https://example.com/image.jpg"
				></Banner>
			);

			cy.get("[ui5-banner]")
				.shadow()
				.find(".ui5-banner-root")
				.should("have.class", "ui5-banner--has-bg-image")
				.and("have.attr", "style")
				.and("include", "background-image");
		});

		it("does not apply background image class when not set", () => {
			cy.mount(
				<Banner salutationText="Hello"></Banner>
			);

			cy.get("[ui5-banner]")
				.shadow()
				.find(".ui5-banner-root")
				.should("not.have.class", "ui5-banner--has-bg-image");
		});
	});

	describe("Height constraints", () => {
		it("respects minimum height", () => {
			cy.mount(
				<Banner salutationText="Hello"></Banner>
			);

			cy.get("[ui5-banner]")
				.shadow()
				.find(".ui5-banner-root")
				.invoke("css", "min-height")
				.should("equal", "76px"); // 4.75rem = 76px at default font-size
		});
	});

	describe("Properties", () => {
		it("updates salutationText dynamically", () => {
			cy.mount(
				<Banner salutationText="Hello, John"></Banner>
			);

			cy.get("[ui5-banner]")
				.shadow()
				.find(".ui5-banner-salutation")
				.should("have.text", "Hello, John");

			cy.get("[ui5-banner]")
				.invoke("prop", "salutationText", "Hello, Jane");

			cy.get("[ui5-banner]")
				.shadow()
				.find(".ui5-banner-salutation")
				.should("have.text", "Hello, Jane");
		});

		it("updates dateText dynamically", () => {
			cy.mount(
				<Banner salutationText="Hello" dateText="March 6"></Banner>
			);

			cy.get("[ui5-banner]")
				.shadow()
				.find(".ui5-banner-date")
				.should("have.text", "March 6");

			cy.get("[ui5-banner]")
				.invoke("prop", "dateText", "March 7");

			cy.get("[ui5-banner]")
				.shadow()
				.find(".ui5-banner-date")
				.should("have.text", "March 7");
		});

		it("updates layout dynamically", () => {
			cy.mount(
				<Banner salutationText="Hello" layout="FullWidth">
					<div slot="startContent">Start</div>
				</Banner>
			);

			cy.get("[ui5-banner]")
				.shadow()
				.find(".ui5-banner-layout-FullWidth")
				.should("exist");

			cy.get("[ui5-banner]")
				.invoke("prop", "layout", "HalfWidth");

			cy.get("[ui5-banner]")
				.shadow()
				.find(".ui5-banner-layout-HalfWidth")
				.should("exist");
		});
	});
});
