import Button from "../../src/Button.js";
import Carousel from "../../src/Carousel.js";

describe("Carousel general interaction", () => {
	before(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("Buttons (navigation arrows) are rendered in the content without hovering", () => {
		cy.mount(
			<Carousel id="carousel2">
				<Button>Button 1 </Button>
				<Button>Button 2 </Button>
				<Button>Button 3 </Button>
				<Button>Button 4 </Button>
				<Button>Button 5 </Button>
				<Button>Button 6 </Button>
				<Button>Button 7 </Button>
				<Button>Button 8 </Button>
				<Button>Button 9 </Button>
			</Carousel>);

		cy.get("#carousel2")
			.shadow()
			.find(".ui5-carousel-navigation-arrows .ui5-carousel-navigation-button:not(.ui5-carousel-navigation-button--hidden)")
			.should("have.length", 1);
	});

	it("Buttons (navigation arrows) are rendered in the navigation without hovering (arrows-placement)", () => {
		cy.mount(
			<Carousel id="carousel3" arrowsPlacement="Navigation">
				<Button>Button 1</Button>
				<Button>Button 2</Button>
				<Button>Button 3</Button>
			</Carousel>);

		cy.get("#carousel3")
			.shadow()
			.find(".ui5-carousel-navigation-button[data-ui5-arrow-forward]")
			.realClick();

		cy.get("#carousel3")
			.shadow()
			.find(".ui5-carousel-navigation-wrapper .ui5-carousel-navigation-button:not(.ui5-carousel-navigation-button--hidden)")
			.should("have.length", 2);
	});

	it("Arrows (navigation arrows) and Dots (page indicator) not displayed in case of single page", () => {
		cy.mount(
			<Carousel id="carousel6">
				<Button>Button 1</Button>
			</Carousel>);

		cy.get("#carousel6")
			.shadow()
			.find(".ui5-carousel-navigation-wrapper")
			.should("not.exist");

		cy.get("#carousel6")
			.shadow()
			.find(".ui5-carousel-navigation-arrows")
			.should("not.exist");

		cy.get("#carousel6")
			.should("have.prop", "pagesCount", 1);
	});
});