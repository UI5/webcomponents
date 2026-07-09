import RangeSlider from "../../../src/RangeSlider.js";

describe("RangeSlider visual", () => {
	beforeEach(() => {
		cy.get("[data-cy-root]").invoke("css", "padding", "50px 100px");
	});

	it("basic state", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={0} endValue={100} />);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size style={{ padding: "20px" }}>
				<RangeSlider min={0} max={100} startValue={20} endValue={80} />
			</div>
		);
		cy.screenshot();
	});

	it("range in the middle", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={25} endValue={75} />);
		cy.screenshot();
	});

	it("narrow range", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={45} endValue={55} />);
		cy.screenshot();
	});

	it("with tickmarks", () => {
		cy.mount(<RangeSlider min={0} max={10} step={1} startValue={2} endValue={8} showTickmarks />);
		cy.screenshot();
	});

	it("with tickmarks and label interval", () => {
		cy.mount(<RangeSlider min={0} max={20} step={2} startValue={4} endValue={16} showTickmarks labelInterval={2} />);
		cy.screenshot();
	});

	it("with tooltip", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={30} endValue={70} showTooltip />);
		cy.get("[ui5-range-slider]").shadow().find("[ui5-slider-handle][handle-type='Start']").realClick();
		cy.screenshot();
	});

	it("disabled", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={20} endValue={80} disabled />);
		cy.screenshot();
	});
});
