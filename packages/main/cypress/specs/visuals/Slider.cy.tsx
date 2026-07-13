import Slider from "../../../src/Slider.js";

describe("Slider visual", () => {
	beforeEach(() => {
		cy.get("[data-cy-root]").invoke("css", "padding", "50px 100px");
	});

	it("basic state", () => {
		cy.mount(<Slider min={0} max={100} value={0} />);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size style={{ padding: "20px" }}>
				<Slider min={0} max={100} value={50} />
			</div>
		);
		cy.screenshot();
	});

	it("value at 50%", () => {
		cy.mount(<Slider min={0} max={100} value={50} />);
		cy.screenshot();
	});

	it("value at 100%", () => {
		cy.mount(<Slider min={0} max={100} value={100} />);
		cy.screenshot();
	});

	it("with tickmarks", () => {
		cy.mount(<Slider min={0} max={10} step={1} value={5} showTickmarks />);
		cy.screenshot();
	});

	it("with tickmarks and label interval", () => {
		cy.mount(<Slider min={0} max={20} step={2} value={8} showTickmarks labelInterval={2} />);
		cy.screenshot();
	});

	it("with tooltip", () => {
		cy.mount(<Slider min={0} max={100} value={40} showTooltip />);
		cy.get("[ui5-slider]").shadow().find("[ui5-slider-handle]").realClick();
		cy.screenshot();
	});

	it("disabled", () => {
		cy.mount(<Slider min={0} max={100} value={60} disabled />);
		cy.screenshot();
	});
});
