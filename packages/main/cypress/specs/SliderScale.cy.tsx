import Slider from "../../src/Slider.js";

describe("Slider Scale", () => {
	beforeEach(() => {
		cy.get('[data-cy-root]')
			.invoke('css', 'padding', '100px')
	})

	it("Should render scale with tickmarks when showTickmarks is enabled", () => {
		cy.mount(<Slider min={0} max={10} step={2} showTickmarks />);

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-scale]")
			.shadow()
			.find(".ui5-slider-scale-tickmarks-container")
			.should("exist");

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-scale]")
			.shadow()
			.find(".ui5-slider-scale-tickmark")
			.should("have.length", 6); // 0, 2, 4, 6, 8, 10
	});

	it("Should display labels on tickmarks when labelInterval is set", () => {
		cy.mount(<Slider min={0} max={10} step={2} showTickmarks labelInterval={1} />);

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-scale]")
			.shadow()
			.find(".ui5-slider-scale-tickmark-label")
			.should("have.length.at.least", 2);
	});

	it("Should mark tickmarks in range as highlighted", () => {
		cy.mount(<Slider min={0} max={10} step={2} value={6} showTickmarks />);

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-scale]")
			.shadow()
			.find(".ui5-slider-scale-tickmark-in-range")
			.should("have.length", 4); // 0, 2, 4, 6
	});

	it("Should update progress bar based on slider value", () => {
		cy.mount(<Slider min={0} max={100} value={50} />);

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-scale]")
			.shadow()
			.find(".ui5-slider-scale-progress")
			.should("have.attr", "style")
			.and("include", "width: 50%");
	});

	it("Should not show tickmarks when showTickmarks is false", () => {
		cy.mount(<Slider min={0} max={10} step={2} />);

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-scale]")
			.shadow()
			.find(".ui5-slider-scale-tickmarks-container")
			.should("not.exist");
	});

	it("Should correctly position progress bar from start", () => {
		cy.mount(<Slider min={0} max={100} value={75} />);

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-scale]")
			.shadow()
			.find(".ui5-slider-scale-progress")
			.should("have.attr", "style")
			.and("include", "inset-inline-start: 0%")
			.and("include", "width: 75%");
	});

	it("Should display correct label values for tickmarks", () => {
		cy.mount(<Slider min={0} max={20} step={5} showTickmarks labelInterval={1} />);

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-scale]")
			.shadow()
			.find(".ui5-slider-scale-tickmark-label")
			.first()
			.should("have.text", "0");

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-scale]")
			.shadow()
			.find(".ui5-slider-scale-tickmark-label")
			.last()
			.should("have.text", "20");
	});

	it("Should have correct number of tickmarks based on step", () => {
		cy.mount(<Slider min={0} max={100} step={25} showTickmarks />);

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-scale]")
			.shadow()
			.find(".ui5-slider-scale-tickmark")
			.should("have.length", 5); // 0, 25, 50, 75, 100
	});

	it("Should handle decimal step values correctly", () => {
		cy.mount(<Slider min={0} max={1} step={0.2} showTickmarks labelInterval={1} />);

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-scale]")
			.shadow()
			.find(".ui5-slider-scale-tickmark")
			.should("have.length", 6); // 0, 0.2, 0.4, 0.6, 0.8, 1.0
	});

	it("Should update tickmark highlighting when value changes", () => {
		cy.mount(<Slider min={0} max={10} step={2} value={4} showTickmarks />);

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-scale]")
			.shadow()
			.find(".ui5-slider-scale-tickmark-in-range")
			.should("have.length", 3); // 0, 2, 4

		cy.get("[ui5-slider]").invoke("prop", "value", 8);

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-scale]")
			.shadow()
			.find(".ui5-slider-scale-tickmark-in-range")
			.should("have.length", 5); // 0, 2, 4, 6, 8
	});

	it("Should show labels only at labelInterval positions", () => {
		cy.mount(<Slider min={0} max={20} step={2} showTickmarks labelInterval={2} />);

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-scale]")
			.shadow()
			.find(".ui5-slider-scale-tickmark-label")
			.should("have.length.at.least", 2);
	});

	describe("Properties synchronization and normalization", () => {
		it("Should update tickmarks when step changes", () => {
			cy.mount(<Slider min={-20} max={20} step={2} showTickmarks />);

			// Initial: step=2, range=40, so 21 tickmarks (-20, -18, ..., 18, 20)
			cy.get("[ui5-slider]")
				.shadow()
				.find("[ui5-slider-scale]")
				.shadow()
				.find(".ui5-slider-scale-tickmark")
				.should("have.length", 21);

			// Change step to 1: 41 tickmarks (-20, -19, ..., 19, 20)
			cy.get("[ui5-slider]").invoke("prop", "step", 1);

			cy.get("[ui5-slider]")
				.shadow()
				.find("[ui5-slider-scale]")
				.shadow()
				.find(".ui5-slider-scale-tickmark")
				.should("have.length", 41);

			// Change step to 4: 11 tickmarks (-20, -16, -12, -8, -4, 0, 4, 8, 12, 16, 20)
			cy.get("[ui5-slider]").invoke("prop", "step", 4);

			cy.get("[ui5-slider]")
				.shadow()
				.find("[ui5-slider-scale]")
				.shadow()
				.find(".ui5-slider-scale-tickmark")
				.should("have.length", 11);
		});

		it("Should update tickmarks when min/max change", () => {
			cy.mount(<Slider min={-20} max={20} step={2} showTickmarks />);

			// Initial: 21 tickmarks
			cy.get("[ui5-slider]")
				.shadow()
				.find("[ui5-slider-scale]")
				.shadow()
				.find(".ui5-slider-scale-tickmark")
				.should("have.length", 21);

			// Change to min=0, max=20: 11 tickmarks (0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20)
			cy.get("[ui5-slider]").invoke("prop", "min", 0);
			cy.get("[ui5-slider]").invoke("prop", "max", 20);

			cy.get("[ui5-slider]")
				.shadow()
				.find("[ui5-slider-scale]")
				.shadow()
				.find(".ui5-slider-scale-tickmark")
				.should("have.length", 11);
		});

		it("Should update labels when labelInterval changes", () => {
			cy.mount(<Slider min={0} max={20} step={2} showTickmarks labelInterval={1} />);

			// With labelInterval=1, every tickmark has a label (11 labels)
			cy.get("[ui5-slider]")
				.shadow()
				.find("[ui5-slider-scale]")
				.shadow()
				.find(".ui5-slider-scale-tickmark-label")
				.should("have.length", 11);

			// Change labelInterval to 2: labels at 0, 4, 8, 12, 16, 20 (6 labels)
			cy.get("[ui5-slider]").invoke("prop", "labelInterval", 2);

			cy.get("[ui5-slider]")
				.shadow()
				.find("[ui5-slider-scale]")
				.shadow()
				.find(".ui5-slider-scale-tickmark-label")
				.should("have.length", 6);
		});
	});
});
