import Carousel from "../../../src/Carousel.js";
import Card from "../../../src/Card.js";
import CardHeader from "../../../src/CardHeader.js";
import Title from "../../../src/Title.js";

const CarouselPage = ({ label }: { label: string }) => (
	<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px", background: "var(--sapTile_Background)" }}>
		<Title>{label}</Title>
	</div>
);

describe("Carousel visual", () => {
	it("basic state — first page", () => {
		cy.mount(
			<Carousel>
				<CarouselPage label="Page 1" />
				<CarouselPage label="Page 2" />
				<CarouselPage label="Page 3" />
			</Carousel>
		);
		cy.screenshot();
	});

	it("page indicator — Numeric style", () => {
		cy.mount(
			<Carousel pageIndicatorType="Numeric">
				<CarouselPage label="Page 1" />
				<CarouselPage label="Page 2" />
				<CarouselPage label="Page 3" />
				<CarouselPage label="Page 4" />
				<CarouselPage label="Page 5" />
			</Carousel>
		);
		cy.screenshot();
	});

	it("hide page indicator", () => {
		cy.mount(
			<Carousel hidePageIndicator>
				<CarouselPage label="Page 1" />
				<CarouselPage label="Page 2" />
				<CarouselPage label="Page 3" />
			</Carousel>
		);
		cy.screenshot();
	});

	it("hide navigation arrows", () => {
		cy.mount(
			<Carousel hideNavigationArrows>
				<CarouselPage label="Page 1" />
				<CarouselPage label="Page 2" />
				<CarouselPage label="Page 3" />
			</Carousel>
		);
		cy.screenshot();
	});

	it("arrows placement — Navigation", () => {
		cy.mount(
			<Carousel arrowsPlacement="Navigation">
				<CarouselPage label="Page 1" />
				<CarouselPage label="Page 2" />
				<CarouselPage label="Page 3" />
			</Carousel>
		);
		cy.screenshot();
	});

	it("navigate to second page", () => {
		cy.mount(
			<Carousel>
				<CarouselPage label="Page 1" />
				<CarouselPage label="Page 2" />
				<CarouselPage label="Page 3" />
			</Carousel>
		);
		cy.get("[ui5-carousel]").realHover();
		cy.get("[ui5-carousel]").shadow().find("[data-ui5-arrow-forward]").realClick();
		cy.screenshot();
	});

	it("cyclic — on last page with dot indicator", () => {
		cy.mount(
			<Carousel cyclic>
				<CarouselPage label="Page 1" />
				<CarouselPage label="Page 2" />
				<CarouselPage label="Page 3" />
			</Carousel>
		);
		cy.get("[ui5-carousel]").realHover();
		cy.get("[ui5-carousel]").shadow().find("[data-ui5-arrow-forward]").realClick();
		cy.get("[ui5-carousel]").shadow().find("[data-ui5-arrow-forward]").realClick();
		cy.screenshot();
	});

	it("many pages — dot indicators (9+)", () => {
		cy.mount(
			<Carousel>
				{Array.from({ length: 10 }, (_, i) => (
					<CarouselPage key={i} label={`Page ${i + 1}`} />
				))}
			</Carousel>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Carousel>
					<CarouselPage label="Page 1" />
					<CarouselPage label="Page 2" />
					<CarouselPage label="Page 3" />
				</Carousel>
			</div>
		);
		cy.screenshot();
	});
});
