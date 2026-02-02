import RatingIndicator from "../../src/RatingIndicator.js";
import { RATING_INDICATOR_ARIA_DESCRIPTION } from "../../src/generated/i18n/i18n-defaults.js";
import "@ui5/webcomponents-icons/dist/heart.js";
import "@ui5/webcomponents-icons/dist/heart-2.js";
import "@ui5/webcomponents-icons/dist/thumb-up.js";
import "@ui5/webcomponents-icons/dist/thumb-down.js";

describe("RatingIndicator", () => {
	describe("Custom Icons", () => {
		it("should render default icons when no custom icons are specified", () => {
			cy.mount(<RatingIndicator value={3}></RatingIndicator>);

			cy.get("[ui5-rating-indicator]")
				.shadow()
				.find(".ui5-rating-indicator-item-sel [ui5-icon]")
				.first()
				.should("have.attr", "name", "favorite");

			cy.get("[ui5-rating-indicator]")
				.shadow()
				.find(".ui5-rating-indicator-item-unsel [ui5-icon]")
				.first()
				.should("have.attr", "name", "unfavorite");
		});

		it("should render custom icons for selected and unselected states", () => {
			cy.mount(<RatingIndicator value={3} iconSelected="heart" iconUnselected="heart-2"></RatingIndicator>);

			cy.get("[ui5-rating-indicator]")
				.shadow()
				.find(".ui5-rating-indicator-item-sel [ui5-icon]")
				.first()
				.should("have.attr", "name", "heart");

			cy.get("[ui5-rating-indicator]")
				.shadow()
				.find(".ui5-rating-indicator-item-unsel [ui5-icon]")
				.first()
				.should("have.attr", "name", "heart-2");
		});

		it("should render custom icon with default unselected icon when only iconSelected is specified", () => {
			cy.mount(<RatingIndicator value={2} iconSelected="thumb-up"></RatingIndicator>);

			cy.get("[ui5-rating-indicator]")
				.shadow()
				.find(".ui5-rating-indicator-item-sel [ui5-icon]")
				.first()
				.should("have.attr", "name", "thumb-up");

			cy.get("[ui5-rating-indicator]")
				.shadow()
				.find(".ui5-rating-indicator-item-unsel [ui5-icon]")
				.first()
				.should("have.attr", "name", "unfavorite");
		});

		it("should render custom unselected icon with default selected icon when only iconUnselected is specified", () => {
			cy.mount(<RatingIndicator value={2} iconUnselected="thumb-down"></RatingIndicator>);

			cy.get("[ui5-rating-indicator]")
				.shadow()
				.find(".ui5-rating-indicator-item-sel [ui5-icon]")
				.first()
				.should("have.attr", "name", "favorite");

			cy.get("[ui5-rating-indicator]")
				.shadow()
				.find(".ui5-rating-indicator-item-unsel [ui5-icon]")
				.first()
				.should("have.attr", "name", "thumb-down");
		});

		it("should render custom icons in half-star state", () => {
			cy.mount(<RatingIndicator value={2.5} iconSelected="heart" iconUnselected="heart-2"></RatingIndicator>);

			cy.get("[ui5-rating-indicator]")
				.shadow()
				.find(".ui5-rating-indicator-item-half [ui5-icon]")
				.first()
				.should("have.attr", "name", "heart-2");

			cy.get("[ui5-rating-indicator]")
				.shadow()
				.find(".ui5-rating-indicator-item-half .ui5-rating-indicator-half-icon")
				.should("have.attr", "name", "heart");
		});
	});

	describe("Half Icon appearance", () => {
		it("Half icon should be filled when rating indicator is disabled", () => {
			const attributeValue = "favorite";

			cy.mount(<RatingIndicator value={2.5} disabled={true}></RatingIndicator>);

			cy.get("[ui5-rating-indicator]")
				.shadow()
				.find(".ui5-rating-indicator-item-half [ui5-icon]")
				.should("have.attr", "name", attributeValue);
		});

		it("Half icon should be filled when rating indicator is readonly", () => {
			const attributeValue = "favorite";

			cy.mount(<RatingIndicator value={2.5} readonly={true}></RatingIndicator>);

			cy.get("[ui5-rating-indicator]")
				.shadow()
				.find(".ui5-rating-indicator-item-half [ui5-icon]")
				.should("have.attr", "name", attributeValue);
		});

		it("Half icon should be border only when rating indicator is regular", () => {
			const attributeValue = "unfavorite";

			cy.mount(<RatingIndicator value={2.5}></RatingIndicator>);

			cy.get("[ui5-rating-indicator]")
				.shadow()
				.find(".ui5-rating-indicator-item-half [ui5-icon]")
				.should("have.attr", "name", attributeValue);
		});
	});

	describe("RatingIndicator Sizes", () => {
		it("should apply correct size and spacing for size 'S'", () => {
			cy.mount(<RatingIndicator size="S" value={3}></RatingIndicator>);

			cy.get("ui5-rating-indicator")
				.shadow()
				.find("li.ui5-rating-indicator-item.ui5-rating-indicator-item-sel")
				.should($el => {
					const height = parseFloat($el.css("height"));
					expect(height).to.be.greaterThan(21.9);
					expect(height).to.be.lessThan(22.1);
				  });
		});
		it("should apply correct size and spacing for size 'L' readonly", () => {
			cy.mount(<RatingIndicator size="L" value={3.5} readonly={true}></RatingIndicator>);

			cy.get("ui5-rating-indicator")
				.shadow()
				.find("li.ui5-rating-indicator-item.ui5-rating-indicator-item-sel")
				.should($el => {
					const height = parseFloat($el.css("height"));
					expect(height).to.be.greaterThan(31.9);
					expect(height).to.be.lessThan(32.1);
				  })
				.should("have.css", "margin-right", "4px");

			cy.get("ui5-rating-indicator")
				.shadow()
				.find("li.ui5-rating-indicator-item.ui5-rating-indicator-item-unsel")
				.find("ui5-icon")
				.should($el => {
					const height = parseFloat($el.css("height"));
					expect(height).to.be.greaterThan(23.9);
					expect(height).to.be.lessThan(24.1);
				  });
		});
	});

	describe("RatingIndicator Accessibility", () => {
		it("should be able to tab after and before readonly element", () => {
			cy.mount(
				<>
					<button>Before</button>
					<RatingIndicator value={3} readonly={true}></RatingIndicator>
					<button>after</button>
				</>
			);

			cy.get("button:first").realClick();
			cy.focused().should("contain", "Before");

			// press tab
			cy.realPress("Tab");
			cy.realPress("Tab");

			cy.focused().should("contain", "after");

			// press shift + tab
			cy.realPress(["Shift", "Tab"]);
			cy.realPress(["Shift", "Tab"]);

			cy.focused().should("contain", "Before");
		});

		it("Tests ACC attrs", () => {
			const TOOLTIP = "Rating";
			const ARIA_LABEL = "Hello World";

			cy.mount(
				<>
					<RatingIndicator id="rating-indicator1" accessibleName={ARIA_LABEL}></RatingIndicator>
					<RatingIndicator id="rating-indicator-readonly" value={1} max={3} readonly></RatingIndicator>
				</>
			);

			cy.get("#rating-indicator1").as("ri");

			cy.get("@ri")
				.shadow()
				.find(".ui5-rating-indicator-root")
				.should("have.attr", "aria-label", ARIA_LABEL)
				.and("have.attr", "title", TOOLTIP)
				.and("not.have.attr", "aria-readonly");

			cy.get("#rating-indicator-readonly")
				.shadow()
				.find(".ui5-rating-indicator-root")
				.should("have.attr", "aria-readonly", "true");

			cy.get("@ri")
				.shadow()
				.find(".ui5-rating-indicator-root")
				.should("have.attr", "aria-valuetext", "0 of 5");

			cy.get("@ri")
				.shadow()
				.find(".ui5-rating-indicator-item")
				.eq(2)
				.realClick();

			cy.get("@ri")
				.shadow()
				.find(".ui5-rating-indicator-root")
				.should("have.attr", "aria-valuetext", "3 of 5");

			cy.get("@ri")
				.shadow()
				.find(".ui5-rating-indicator-list")
				.should("have.attr", "aria-hidden", "true");
		});

		it("Tests ACC attrs - tooltip property", () => {
			const TOOLTIP = "Test";

			cy.mount(<RatingIndicator id="rating-indicator-title" tooltip={TOOLTIP}></RatingIndicator>);

			cy.get("#rating-indicator-title")
				.shadow()
				.find(".ui5-rating-indicator-root")
				.should("have.attr", "title", TOOLTIP);
		});

		it("Tests ACC attrs - required property add aria-description", () => {
			cy.mount(<RatingIndicator id="rating-indicator-required" required></RatingIndicator>);

			cy.get("#rating-indicator-required")
				.shadow()
				.find(".ui5-rating-indicator-root")
				.should("have.attr", "aria-description", RATING_INDICATOR_ARIA_DESCRIPTION.defaultText);
		});

		it("Tests ACC attrs - accessible-name-ref", () => {
			const ACCESSIBLE_NAME_REF_TEXT = "Some ACC label";
			cy.mount(
				<>
					<label id="label-acc-name-ref">{ACCESSIBLE_NAME_REF_TEXT}</label>
					<RatingIndicator id="rating-indicator-acc-name-ref" accessibleNameRef="label-acc-name-ref"></RatingIndicator>
				</>
			);

			cy.get("#rating-indicator-acc-name-ref")
				.shadow()
				.find(".ui5-rating-indicator-root")
				.should("have.attr", "aria-label", ACCESSIBLE_NAME_REF_TEXT);
		});
	});

	describe("Rating Indicator general interaction", () => {
		it("Tests basic rating indicator rendering", () => {
			cy.mount(<RatingIndicator id="rating-indicator1"></RatingIndicator>);

			cy.get("#rating-indicator1")
				.shadow()
				.find(".ui5-rating-indicator-item")
				.should("have.length", 5);
		});

		it("Tests max property", () => {
			cy.mount(<RatingIndicator id="rating-indicator2" value={6} max={10}></RatingIndicator>);

			cy.get("#rating-indicator2")
				.shadow()
				.find(".ui5-rating-indicator-item")
				.should("have.length", 10);
		});

		it("Tests clicking on star", () => {
			cy.mount(<RatingIndicator id="rating-indicator3" value={6} max={10}></RatingIndicator>);

			cy.get("#rating-indicator3").as("ri");

			cy.get("@ri")
				.shadow()
				.find(".ui5-rating-indicator-item")
				.eq(2)
				.realClick();

			cy.get("@ri")
				.should("have.attr", "value", "3");
		});

		it("Tests change event", () => {
			cy.mount(
				<RatingIndicator id="rating-indicator4" value={6} max={8}></RatingIndicator>
			);

			cy.get("#rating-indicator4").as("ri");

			cy.get("@ri")
				.then(ratingIndicator => {
					ratingIndicator.get(0).addEventListener("ui5-change", cy.stub().as("changeEvent"));
				});

			cy.get("@ri")
				.shadow()
				.find(".ui5-rating-indicator-item")
				.eq(2)
				.realClick();

			cy.get("@ri")
				.should("have.attr", "value", "3");

			cy.get("@ri").realPress("Enter");
			cy.get("@ri").should("have.attr", "value", "4");

			cy.get("@ri").realPress("Space");
			cy.get("@ri").should("have.attr", "value", "5");

			cy.get("@ri").realPress("ArrowUp");
			cy.get("@ri").realPress("ArrowRight");
			cy.get("@ri").should("have.attr", "value", "7");

			cy.get("@ri").realPress("ArrowLeft");
			cy.get("@ri").realPress("ArrowLeft");
			cy.get("@ri").realPress("ArrowDown");
			cy.get("@ri").realPress("ArrowDown");
			cy.get("@ri").realPress("ArrowDown");
			cy.get("@ri").realPress("ArrowDown");
			cy.get("@ri").realPress("ArrowDown");
			cy.get("@ri").should("have.attr", "value", "0");

			cy.get("@ri").realPress("End");
			cy.get("@ri").should("have.attr", "value", "8");

			cy.get("@ri").realPress("Home");
			cy.get("@ri").should("have.attr", "value", "0");

			cy.get("@ri").realPress("4");
			cy.get("@ri").should("have.attr", "value", "4");

			cy.get("@ri").realPress("9");
			cy.get("@ri").should("have.attr", "value", "8");

			cy.get("@ri").realPress("Enter");
			cy.get("@ri").should("have.attr", "value", "0");

			cy.get("@changeEvent").should("have.callCount", 17);
		});

		it("Second click on same star clears the RatingIndicator value", () => {
			cy.mount(
				<RatingIndicator></RatingIndicator>
			);

			cy.get("[ui5-rating-indicator")
				.shadow()
				.find("li")
				.eq(3)
				.as("star");

			cy.get("@star")
				.realClick();

			cy.get("[ui5-rating-indicator")
				.should("have.attr", "value", 4);

			cy.get("@star")
				.realClick();

			cy.get("[ui5-rating-indicator]")
				.should("have.attr", "value", 0);
		})
	});
});
