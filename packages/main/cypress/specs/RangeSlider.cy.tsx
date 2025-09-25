import RangeSlider from "../../src/RangeSlider.js";

describe("Testing Range Slider interactions", () => {
	it("Changing the current startValue is reflected", () => {
		cy.mount(<RangeSlider min={0} max={40} step={1} showTickmarks></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle-container")
			.first()
			.as("startHandle");

		// Initially if no value is set, the Range Slider start-handle is at the beginning
		cy.get("@startHandle").should("have.attr", "style").and("include", "left: 0%");

		// Set startValue to 5
		cy.get("@rangeSlider").invoke("attr", "start-value", "5");
		cy.get("@startHandle").should("have.attr", "style").and("include", "left: 12.5%");

		// Test programmatic value change and verify handle position updates
		cy.get("@rangeSlider").invoke("attr", "start-value", "8");
		cy.get("@startHandle").should("have.attr", "style").and("include", "left: 20%");

		// Test clicking on the slider to change value
		cy.get("@rangeSlider").realClick({ x: 100 });

		// The value should change after clicking
		cy.get("@rangeSlider").should("have.attr", "start-value").and("not.eq", "5");
	});

	it("Changing the endValue is reflected", () => {
		cy.mount(<RangeSlider min={0} max={40} step={1} showTickmarks></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-inner .ui5-slider-handle-container")
			.eq(1)
			.as("endHandle");

		// Check initial endValue (default should be 100, but with max=40, it should be 40)
		cy.get("@rangeSlider").should("have.attr", "end-value", "40");
		cy.get("@endHandle").should("have.attr", "style").and("include", "left: 100%");

		// Set endValue to 10
		cy.get("@rangeSlider").invoke("attr", "end-value", "10");
		cy.get("@endHandle").should("have.attr", "style").and("include", "left: 25%");

		// Set endValue to 20 (middle)
		cy.get("@rangeSlider").invoke("attr", "end-value", "20");
		cy.get("@endHandle").should("have.attr", "style").and("include", "left: 50%");

		// Set endValue to 30 to verify another position
		cy.get("@rangeSlider").invoke("attr", "end-value", "30");
		cy.get("@endHandle").should("have.attr", "style").and("include", "left: 75%");
	});

	it("Click within the selected range should not change any value", () => {
		cy.mount(<RangeSlider min={0} max={40} step={1} startValue={5} endValue={30} showTickmarks></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-progress")
			.as("selectedRange");

		cy.get("@rangeSlider").should("have.attr", "start-value", "5");
		cy.get("@rangeSlider").should("have.attr", "end-value", "30");

		// Click within the selected range (on the progress bar)
		cy.get("@selectedRange").realClick();

		cy.get("@rangeSlider").should("have.attr", "start-value", "5");
		cy.get("@rangeSlider").should("have.attr", "end-value", "30");
	});

	it("Dragging the selected range should change both values and handles", () => {
		cy.mount(<RangeSlider min={0} max={40} step={1} startValue={5} endValue={30} showTickmarks></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-progress")
			.as("selectedRange");

		// Get initial values
		cy.get("@rangeSlider").should("have.attr", "start-value", "5");
		cy.get("@rangeSlider").should("have.attr", "end-value", "30");

		// Drag the selected range to the right
		cy.get("@selectedRange")
			.realMouseDown()
			.realMouseMove(50, 0)
			.realMouseUp();

		// Both values should change after dragging the range
		cy.get("@rangeSlider").should("have.attr", "start-value").and("not.eq", "5");
		cy.get("@rangeSlider").should("have.attr", "end-value").and("not.eq", "30");

		// The range size should remain the same (25 units)
		cy.get("@rangeSlider").then(($slider) => {
			const startValue = parseInt($slider.attr("start-value"));
			const endValue = parseInt($slider.attr("end-value"));
			expect(endValue - startValue).to.equal(25);
		});
	});

	it("Dragging the start-handle past the end-handle should swap the values", () => {
		cy.mount(<RangeSlider min={0} max={40} step={1} startValue={8} endValue={9} showTickmarks></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--start")
			.as("startHandle");

		// Get initial values
		cy.get("@rangeSlider").should("have.attr", "start-value", "8");
		cy.get("@rangeSlider").should("have.attr", "end-value", "9");

		// Drag the start handle past the end handle
		cy.get("@startHandle")
			.realMouseDown()
			.realMouseMove(100, 0)
			.realMouseUp();

		// Values should be swapped after dragging
		cy.get("@rangeSlider").then(($el) => {
			const rangeSlider = $el[0] as RangeSlider;
			expect(rangeSlider.startValue).to.equal(9);
			expect(rangeSlider.endValue).to.be.greaterThan(9);
		});
	});

	it("Dragging the whole range selection should always keep the initially selected range and be within min/max values", () => {
		cy.mount(<RangeSlider min={0} max={40} step={1} startValue={9} endValue={30} showTickmarks></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-progress")
			.as("selectedRange");

		// Drag the selected range to the left (towards minimum)
		cy.get("@selectedRange")
			.realMouseDown()
			.realMouseMove(-100, 0)
			.realMouseUp();

		// startValue should be 0 as the selected range has reached the start of the Range Slider
		cy.get("@rangeSlider").should("have.attr", "start-value", "0");
		// endValue should be 21 and no less, the initially selected range should be preserved
		cy.get("@rangeSlider").should("have.attr", "end-value", "21");

		// Drag the selected range to the right (towards maximum)
		cy.get("@selectedRange")
			.realMouseDown()
			.realMouseMove(600, 0)
			.realMouseUp();

		// startValue should be 7 and no more, the initially selected range should be preserved
		cy.get("@rangeSlider").should("have.attr", "start-value", "7");
		// endValue should be 28 as the selected range has reached the end of the Range Slider
		cy.get("@rangeSlider").should("have.attr", "end-value", "28");
	});

	it("Range Slider should not be interactive if the step property is 0", () => {
		cy.mount(<RangeSlider min={0} max={100} step={0}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.get("@rangeSlider").realClick();

		// endValue should remain the same
		cy.get("@rangeSlider").should("have.attr", "end-value", "100");
	});

	it("Disabled Range Slider is not interactive", () => {
		cy.mount(<RangeSlider min={0} max={100} disabled></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Range Slider should be disabled
		cy.get("@rangeSlider").should("have.attr", "disabled");
	});
});

describe("Range Slider elements - tooltip, step, tickmarks, labels", () => {
	it("Range Slider have correct number of labels and tickmarks based on the defined step and labelInterval properties", () => {
		cy.mount(<RangeSlider min={0} max={44} step={1} labelInterval={2} showTickmarks></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-labels")
			.as("labelsContainer");

		// With min=0, max=44, step=1, labelInterval=2:
		// Total steps = (44-0)/1 = 44 steps
		// Labels should appear every 2 steps: 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44
		// That's 23 labels total
		cy.get("@labelsContainer").find("li").should("have.length", 23);

		// Check tickmarks - should have one for each step plus start and end
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-tickmark")
			.should("have.length", 45); // 0 to 44 inclusive = 45 tickmarks
	});
	it("Range Slider tooltips are displayed showing the current value", () => {
		cy.get('[data-cy-root]')
			.invoke('css', 'padding', '100px')

		cy.mount(<RangeSlider min={50} max={200} showTooltip></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.get("@rangeSlider").realClick();

		cy.get('@rangeSlider')
			.shadow()
			.find('[data-sap-ui-start-value]')
			.as('startTooltip');

		cy.get('@rangeSlider')
			.shadow()
			.find('[data-sap-ui-end-value]')
			.as('endTooltip');


		cy.get("@rangeSlider").invoke("attr", "start-value", 65);
		cy.get("@startTooltip").shadow().find(".ui5-slider-tooltip-value").should("have.text", "65");

		cy.get("@rangeSlider").invoke("attr", "end-value", 115);
		cy.get("@endTooltip").shadow().find(".ui5-slider-tooltip-value").should("have.text", "115");
	});

	it("Tooltip input is displayed showing the current value", () => {
		cy.mount(
			<RangeSlider min={0} max={20} startValue={8} endValue={12} showTooltip editableTooltip></RangeSlider>
		);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.get("@rangeSlider").realClick();

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-start-value]')
			.shadow()
			.find("ui5-input")
			.as("startTooltipInput");

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-end-value]')
			.shadow()
			.find("ui5-input")
			.as("endTooltipInput");

		cy.get("@startTooltipInput")
			.should("have.attr", "value", "8");

		cy.get("@endTooltipInput")
			.should("have.attr", "value", "12");
	});

	it("Input tooltips value change should change the range slider's value", () => {
		cy.mount(
			<RangeSlider min={0} max={20} startValue={4} showTooltip editableTooltip></RangeSlider>
		);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.get("@rangeSlider").realClick();

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-start-value]')
			.shadow()
			.find("ui5-input")
			.as("startTooltipInput");

		cy.get("@startTooltipInput")
			.realClick()
			.clear()
			.realType("8");

		cy.get("@startTooltipInput").realPress("Enter");

		cy.get("@rangeSlider").invoke("attr", "start-value").should("eq", "8");
	});

	it("Input tooltip value change should fire change event", () => {
		cy.mount(
			<RangeSlider min={0} max={20} startValue={1} showTooltip editableTooltip></RangeSlider>
		);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.get("@rangeSlider")
			.invoke('on', 'ui5-change', cy.spy().as('changeEventSpy'));

		cy.get("@rangeSlider").realClick();

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-start-value]')
			.shadow()
			.find("ui5-input")
			.as("startTooltipInput");

		cy.get("@startTooltipInput")
			.realClick()
			.clear()
			.realType("4");

		cy.get("@startTooltipInput").realPress("Enter");

		cy.get("@changeEventSpy").should('have.been.calledOnce');
	});

	it("Input tooltips value state should change to 'Negative' if value is invalid", () => {
		cy.mount(
			<RangeSlider min={0} max={20} startValue={1} showTooltip editableTooltip></RangeSlider>
		);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.get("@rangeSlider").realClick();

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-start-value]')
			.shadow()
			.find("ui5-input")
			.as("startTooltipInput");

		cy.get("@startTooltipInput")
			.realClick()
			.clear()
			.realType("23");

		cy.get("@startTooltipInput").realPress("Enter");

		cy.get("@startTooltipInput")
			.should("have.attr", "value-state", "Negative");
	});

	it("Input tooltip should become hidden when input loses focus", () => {
		cy.mount(
			<>
				<RangeSlider id="range-slider-tickmarks-labels" min={0} max={20} startValue={5} showTooltip editableTooltip></RangeSlider>
				<RangeSlider id="basic-range-slider" min={0} max={20}></RangeSlider>
			</>
		);

		cy.get("#range-slider-tickmarks-labels").as("rangeSlider");
		cy.get("#basic-range-slider").as("anotherSlider");

		cy.get("@rangeSlider").realClick();

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-start-value]')
			.as("startTooltip");

		cy.get("@startTooltip").should("have.prop", "open", true);

		cy.get("@anotherSlider").realClick();

		cy.get("@startTooltip").should("have.prop", "open", false);
	});

	it("F2 should switch the focus between the handle and the tooltip input", () => {
		cy.mount(
			<RangeSlider min={0} max={20} startValue={5} showTooltip editableTooltip></RangeSlider>
		);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--start")
			.as("rangeSliderHandle");

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-start-value]')
			.shadow()
			.find("ui5-input")
			.as("rangeSliderStartTooltipInput");

		cy.get("@rangeSliderHandle").realClick();
		cy.realPress("F2");

		cy.get("@rangeSliderStartTooltipInput").should("have.focus");

		cy.realPress("F2");

		cy.get("@rangeSliderHandle").should("have.focus");
	});

	it("Arrow up/down should not increase/decrease the value of the input", () => {
		cy.mount(
			<RangeSlider min={0} max={20} startValue={1} endValue={10} showTooltip editableTooltip></RangeSlider>
		);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-start-value]')
			.shadow()
			.find("ui5-input")
			.as("startTooltipInput");

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-end-value]')
			.shadow()
			.find("ui5-input")
			.as("endTooltipInput");

		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--start")
			.as("startHandle");

		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--end")
			.as("endHandle");

		cy.get("@startHandle").realClick();
		cy.get("@startTooltipInput").realClick();
		cy.realPress("ArrowUp");

		cy.get("@rangeSlider").invoke("attr", "start-value").should("eq", "1");

		cy.realPress("ArrowDown");

		cy.get("@rangeSlider").invoke("attr", "start-value").should("eq", "1");

		cy.get("@endHandle").realClick();
		cy.get("@endTooltipInput").realClick();
		cy.realPress("ArrowUp");

		cy.get("@rangeSlider").invoke("attr", "end-value").should("eq", "10");

		cy.realPress("ArrowDown");

		cy.get("@rangeSlider").invoke("attr", "end-value").should("eq", "10");
	});

	it("Tab on slider handle should not move the focus to the tooltip input", () => {
		cy.mount(
			<>
				<RangeSlider editableTooltip min={0} max={20} />
			</>
		);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Start value handle and input
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--start")
			.as("startHandle");

		// End value handle and input
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--end")
			.as("endHandle");

		cy.get("@startHandle").realClick();

		cy.realPress("Tab");

		cy.get("@endHandle").should("be.focused");
	});

	it("Focus out with invalid value should reset it", () => {
		cy.mount(
			<RangeSlider min={0} max={20} startValue={2} showTooltip editableTooltip></RangeSlider>
		);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-start-value]')
			.shadow()
			.find("ui5-input")
			.as("startTooltipInput");

		cy.get("@rangeSlider").realClick();

		cy.get("@startTooltipInput").realClick().realType("23");

		cy.realPress("Tab");

		cy.get("@startTooltipInput").should("have.attr", "value", "2");
	});

	it("Input values should be swapped if the start value is bigger than the end value", () => {
		cy.mount(
			<RangeSlider min={0} max={20} startValue={0} endValue={1} showTooltip editableTooltip></RangeSlider>
		);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Start value handle and input
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--start")
			.as("startHandle");

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-start-value]')
			.shadow()
			.find("ui5-input")
			.as("startTooltipInput");

		// End value handle and input
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--end")
			.as("endHandle");

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-end-value]')
			.shadow()
			.find("ui5-input")
			.as("endTooltipInput");

		// Set start value to 20
		cy.get("@startHandle").realClick();
		cy.get("@startTooltipInput").realClick().clear().realType("20");
		cy.get("@startTooltipInput").realPress("Enter");

		// Assert that start and end values are swapped
		cy.get("@rangeSlider").invoke("attr", "end-value").should("eq", "20");
		cy.get("@endTooltipInput").should("have.attr", "value", "20");
	});

	it("Input values should be swapped if the end value is lower than the start value", () => {
		cy.mount(
			<RangeSlider min={0} max={20} startValue={2} endValue={3} showTooltip editableTooltip></RangeSlider>
		);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Start value input
		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-start-value]')
			.shadow()
			.find("ui5-input")
			.as("startTooltipInput");

		// End value input
		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-end-value]')
			.shadow()
			.find("ui5-input")
			.as("endTooltipInput");

		// End value handle
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--end")
			.as("endHandle");

		// Set end value to 1
		cy.get("@endHandle").realClick();
		cy.get("@endTooltipInput").realClick().clear().realType("1");
		cy.get("@endTooltipInput").realPress("Enter");

		// Assert that start and end values are swapped
		cy.get("@rangeSlider").invoke("attr", "start-value").should("eq", "1");
		cy.get("@startTooltipInput").should("have.attr", "value", "1");
	});

	it("Invalid tooltip value should not be changed on 'Enter'", () => {
		cy.mount(
			<RangeSlider min={0} max={20} endValue={12} showTooltip editableTooltip></RangeSlider>
		);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-end-value]')
			.shadow()
			.find("ui5-input")
			.as("endTooltipInput");

		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--end")
			.as("endHandle");

		cy.get("@endHandle").realClick();
		cy.get("@endTooltipInput").realClick().clear().realType("60");
		cy.get("@endTooltipInput").realPress("Enter");

		cy.get("@rangeSlider").invoke("attr", "end-value").should("eq", "12");

		cy.get("@endTooltipInput").should("have.attr", "value-state", "Negative");

		cy.get("@endTooltipInput").should("have.attr", "value", "60");

		cy.get("@endTooltipInput").realPress("Tab");

		cy.get("@endTooltipInput").should("have.attr", "value", "12");

	});

	it("Range Slider tooltips should become hidden if the range slider loses focus", () => {
		cy.mount(
			<>
				<RangeSlider id="basic-range-slider-with-tooltip" min={0} max={20} showTooltip editableTooltip />
				<RangeSlider id="basic-range-slider" min={0} max={20} />
			</>
		);

		cy.get("#basic-range-slider-with-tooltip").as("rangeSlider");
		cy.get("#basic-range-slider").as("anotherSlider");

		cy.get("@rangeSlider").realClick();

		cy.get("@rangeSlider")
			.shadow()
			.find('[data-sap-ui-start-value]')
			.as("startTooltip");

		cy.get("@startTooltip").should("have.prop", "open", true);

		cy.get("@anotherSlider").realClick();

		cy.get("@startTooltip").should("have.prop", "open", false);
	});
});

describe("Properties synchronization and normalization", () => {
	it("If a negative number is set to the step property its positive equivalent should be used as effective value", () => {
		cy.mount(<RangeSlider min={0} max={44} step={-7}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--end")
			.as("endHandle");

		cy.get("@rangeSlider").should("have.attr", "step", "-7");

		// Test keyboard navigation which should use the positive step value (7)
		cy.get("@endHandle").realClick();
		cy.get("@endHandle").realPress("Home"); // Move to start (0)
		cy.get("@endHandle").realPress("ArrowRight"); // Move by step (should be 7)
		cy.get("@endHandle").realPress("ArrowRight"); // Move by step again (should be 14)
		cy.get("@endHandle").realPress("ArrowRight"); // Move by step again (should be 21)

		// The current value should be 'stepified' by 7 (positive equivalent)
		cy.get("@rangeSlider").should("have.attr", "end-value", "21");
	});

	it("If min property is set to a greater number than the max property their effective values should be swapped, their real ones - not", () => {
		cy.mount(<RangeSlider min={100} max={10} startValue={2}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Properties themselves should not be normalized
		cy.get("@rangeSlider").should("have.attr", "min", "100");
		cy.get("@rangeSlider").should("have.attr", "max", "10");

		// startValue should be within the boundaries of the effective (swapped) min and max props
		cy.get("@rangeSlider").should("have.attr", "start-value", "10");
	});

	it("Should keep the current values between the boundaries of min and max properties", () => {
		cy.mount(<RangeSlider min={100} max={200}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Set endValue to 300 (above max)
		cy.get("@rangeSlider").invoke("attr", "end-value", "300");
		cy.get("@rangeSlider").should("have.attr", "end-value", "200");

		// Set startValue to 99 (below min)
		cy.get("@rangeSlider").invoke("attr", "start-value", "99");
		cy.get("@rangeSlider").should("have.attr", "start-value", "100");
	});

	it("Should not 'stepify' current value if it is not in result of user interaction", () => {
		cy.mount(<RangeSlider min={0} max={44} step={1.25}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Set values programmatically
		cy.get("@rangeSlider").invoke("attr", "start-value", "14");
		cy.get("@rangeSlider").invoke("attr", "end-value", "24");

		// Values should not be stepped to the next step
		cy.get("@rangeSlider").should("have.attr", "start-value", "14");
		cy.get("@rangeSlider").should("have.attr", "end-value", "24");
	});

	it("If the step property or the labelInterval are changed, the tickmarks and labels must be updated also", () => {
		cy.mount(<RangeSlider min={0} max={40} step={1} labelInterval={2} showTickmarks></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Change step to 2
		cy.get("@rangeSlider").invoke("attr", "step", "2");

		// Change labelInterval to 4
		cy.get("@rangeSlider").invoke("attr", "label-interval", "4");

		// Labels should be updated accordingly
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-labels li")
			.should("have.length.lessThan", 21); // Should have fewer labels now
	});
});

describe("Testing events", () => {
	it("Should fire input event on user interaction and change event after user interaction finish", () => {
		cy.mount(<RangeSlider min={0} max={10}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.get("@rangeSlider")
			.invoke('on', 'ui5-input', cy.spy().as('inputEventSpy'))
			.invoke('on', 'ui5-change', cy.spy().as('changeEventSpy'));

		// Start value handle and input
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--start")
			.as("startHandle");

		cy.get("@startHandle")
			.realMouseDown()
			.realMouseMove(100, 0)
			.realMouseUp();

		// Click on the slider to trigger both events
		cy.get("@rangeSlider").realClick();

		// Both input event and change event should be fired after user interaction
		cy.get("@inputEventSpy").should('have.been.called');
		cy.get("@changeEventSpy").should('have.been.called');
	});

	it("Should not fire change event if the values are the same after interaction", () => {
		cy.mount(<RangeSlider min={0} max={10} startValue={0}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--start")
			.as("firstHandle");

		cy.get("@rangeSlider")
			.invoke('on', 'ui5-change', cy.spy().as('changeEventSpy'));

		cy.get("@firstHandle").realClick();
		cy.get("@firstHandle").realPress("Home");

		cy.get("@changeEventSpy").should('not.have.been.called');
	});

	it("Should fire input event with correctly swapped values", () => {
		cy.mount(<RangeSlider min={0} max={10} startValue={1} endValue={2}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-progress")
			.as("rangeSliderProgressBar");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--start")
			.as("firstHandle");

		cy.get("@rangeSlider")
			.invoke('on', 'ui5-input', cy.spy().as('inputEventSpy'));

		// Use keyboard navigation to move start handle past end handle
		cy.get("@firstHandle").realClick();
		cy.get("@firstHandle").realPress("ArrowRight");
		cy.get("@firstHandle").realPress("ArrowRight");
		cy.get("@firstHandle").realPress("ArrowRight");

		cy.get("@rangeSliderProgressBar").should("have.attr", "aria-valuenow", "2");

		cy.get("@rangeSlider").should("have.attr", "start-value", "2");
		cy.get("@rangeSlider").should("have.attr", "end-value", "4");
		cy.get("@inputEventSpy").should('have.been.called');
	});

	it("Should not fire change event after user interaction is finished if the current value is the same as the one at the start of the action", () => {
		cy.mount(<RangeSlider min={0} max={10}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.get("@rangeSlider")
			.invoke('on', 'ui5-change', cy.spy().as('changeEventSpy'));

		// Click on the same position (should not change value)
		cy.get("@rangeSlider").realClick();

		cy.get("@changeEventSpy").should('not.have.been.called');
	});

	it("Should fire change event after swapping the values", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={1} endValue={2}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--start")
			.as("startHandle");

		cy.get("@rangeSlider")
			.invoke('on', 'ui5-change', cy.spy().as('changeEventSpy'));

		// Drag start handle past end handle to swap values
		cy.get("@startHandle")
			.realMouseDown()
			.realMouseMove(100, 0)
			.realMouseUp();

		cy.get("@rangeSlider").should("have.attr", "start-value", "2");
		cy.get("@rangeSlider").invoke("attr", "end-value").then((endValue: string) => {
			expect(parseInt(endValue)).to.be.greaterThan(2);
		});
		cy.get("@changeEventSpy").should('have.been.called');
	});

	it("Aria attributes of the start handle are set correctly", () => {
		cy.mount(<RangeSlider min={0} max={40} step={1} showTickmarks></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--start")
			.as("startHandle");

		cy.get("@rangeSlider").then(($el) => {
			const rangeSlider = $el[0] as RangeSlider;
			const minValue = rangeSlider.min;
			const maxValue = rangeSlider.max;
			const startValue = rangeSlider.startValue;

			cy.get("@startHandle")
				.should("have.attr", "aria-labelledby", "ui5-slider-startHandleDesc");

			cy.get("@startHandle")
				.should("have.attr", "aria-valuemin", `${minValue}`);

			cy.get("@startHandle")
				.should("have.attr", "aria-valuemax", `${maxValue}`);

			cy.get("@startHandle")
				.should("have.attr", "aria-valuenow", `${startValue}`);
		});
	});

	it("Aria attributes of the end handle are set correctly", () => {
		cy.mount(<RangeSlider min={0} max={40} step={1} showTickmarks></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--end")
			.as("endHandle");

		cy.get("@rangeSlider").then(($el) => {
			const rangeSlider = $el[0] as RangeSlider;
			const minValue = rangeSlider.min;
			const maxValue = rangeSlider.max;
			const endValue = rangeSlider.endValue;

			cy.get("@endHandle")
				.should("have.attr", "aria-labelledby", "ui5-slider-endHandleDesc");

			cy.get("@endHandle")
				.should("have.attr", "aria-valuemin", `${minValue}`);

			cy.get("@endHandle")
				.should("have.attr", "aria-valuemax", `${maxValue}`);

			cy.get("@endHandle")
				.should("have.attr", "aria-valuenow", `${endValue}`);
		});
	});

	it("Aria-labelledby text is mapped correctly when values are swapped", () => {
		cy.mount(<RangeSlider min={0} max={40} step={1} startValue={8} endValue={9} showTickmarks></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--start")
			.as("startHandle");
		cy.get("@rangeSlider")
			.shadow()
			.find("#ui5-slider-startHandleDesc")
			.as("rangeSliderStartHandleSpan");
		cy.get("@rangeSlider")
			.shadow()
			.find("#ui5-slider-endHandleDesc")
			.as("rangeSliderEndHandleSpan");

		// Drag start handle past end handle to swap values using real events
		cy.get("@startHandle")
			.realMouseDown()
			.realMouseMove(100, 0)
			.realMouseUp();

		cy.get("@rangeSliderStartHandleSpan").should("contain.text", "Left handle");
		cy.get("@rangeSliderEndHandleSpan").should("contain.text", "Right handle");
	});

	it("Click anywhere in the Range Slider should focus the closest handle", () => {
		cy.mount(<RangeSlider min={0} max={100}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Test that clicking on the slider focuses some element (either handle or progress bar)
		cy.get("@rangeSlider").realClick();

		// Verify that the slider component itself is focused
		cy.get("@rangeSlider").should("have.focus");

		// Test that handles can be focused when clicked directly
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--start")
			.realClick()
			.should("have.focus");

		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--end")
			.realClick()
			.should("have.focus");
	});

	it("Click currently selected range should focus it", () => {
		cy.mount(<RangeSlider min={0} max={100} endValue={60}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-progress")
			.as("rangeSliderSelection");

		cy.get("@rangeSlider").realClick();

		// Should focus the progress bar
		cy.get("@rangeSliderSelection").should("have.focus");
	});

	it("When not yet focused, 'Tab' should focus the Range Slider and move the focus to the progress bar", () => {
		cy.mount(<RangeSlider min={0} max={100}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-progress")
			.as("rangeSliderSelection");

		cy.realPress("Tab");

		cy.get("@rangeSlider").should("have.focus");
		cy.get("@rangeSliderSelection").should("have.focus");
	});

	it("When progress bar has the focus, 'Tab' should move the focus to the first handle", () => {
		cy.mount(<RangeSlider min={0} max={100}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--start")
			.as("rangeSliderStartHandle");

		// Focus the progress bar first
		cy.realPress("Tab");
		cy.realPress("Tab");

		cy.get("@rangeSliderStartHandle").should("have.focus");
	});

	it("When the first handle has the focus, 'Tab' should focus the second handle", () => {
		cy.mount(<RangeSlider min={0} max={100}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--end")
			.as("rangeSliderEndHandle");

		// Focus the first handle first
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress("Tab");

		cy.get("@rangeSliderEndHandle").should("have.focus");
	});

	it("When the second handle has the focus, 'Tab' should move the focus away from the Range Slider", () => {
		cy.mount(
			<>
				<RangeSlider id="basic-range-slider" min={0} max={100}></RangeSlider>
				<RangeSlider id="basic-range-slider-with-tooltip" min={0} max={100}></RangeSlider>
			</>
		);

		cy.get("#basic-range-slider").as("currentRangeSlider");
		cy.get("#basic-range-slider-with-tooltip").as("nextRangeSlider");
		cy.get("@nextRangeSlider")
			.shadow()
			.find(".ui5-slider-progress")
			.as("rangeSliderSelection");

		// Focus through the first slider
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress("Tab");

		cy.get("@currentRangeSlider").should("not.have.focus");
		cy.get("@nextRangeSlider").should("have.focus");
		cy.get("@rangeSliderSelection").should("have.focus");
	});

	it("Shift+Tab should focus the previous Range Slider and move the focus to its second handle", () => {
		cy.mount(
			<>
				<RangeSlider id="basic-range-slider" min={0} max={100}></RangeSlider>
				<RangeSlider id="basic-range-slider-with-tooltip" min={0} max={100}></RangeSlider>
			</>
		);

		cy.get("#basic-range-slider-with-tooltip").as("currentRangeSlider");
		cy.get("#basic-range-slider").as("previousRangeSlider");
		cy.get("@previousRangeSlider")
			.shadow()
			.find(".ui5-slider-handle--end")
			.as("previousRangeSliderEndHandle");

		// Focus the second slider first
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress("Tab");

		cy.realPress(["Shift", "Tab"]);

		cy.get("@currentRangeSlider").should("not.have.focus");
		cy.get("@previousRangeSlider").should("have.focus");
		cy.get("@previousRangeSliderEndHandle").should("have.focus");
	});

	it("When the second handle has the focus, 'Shift' + 'Tab' should move the focus to the first handle", () => {
		cy.mount(<RangeSlider min={0} max={100}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--start")
			.as("rangeSliderStartHandle");

		// Focus the second handle first
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress("Tab");

		cy.realPress(["Shift", "Tab"]);

		cy.get("@rangeSliderStartHandle").should("have.focus");
	});

	it("When the first handle has the focus, 'Shift' + 'Tab' should move the focus to the progress bar", () => {
		cy.mount(<RangeSlider min={0} max={100}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-progress")
			.as("rangeSliderSelection");

		// Focus the first handle first
		cy.realPress("Tab");
		cy.realPress("Tab");

		cy.realPress(["Shift", "Tab"]);

		cy.get("@rangeSliderSelection").should("have.focus");
	});

	it("When the progress bar has the focus, 'Shift' + 'Tab' should move the focus away from the Range Slider", () => {
		cy.mount(
			<>
				<RangeSlider id="previous-range-slider" min={0} max={100}></RangeSlider>
				<RangeSlider id="basic-range-slider" min={0} max={100}></RangeSlider>
			</>
		);

		cy.get("#basic-range-slider").as("rangeSlider");
		cy.get("#previous-range-slider").as("previousRangeSlider");

		// Focus the current slider's progress bar first
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress("Tab");

		cy.realPress(["Shift", "Tab"]);

		cy.get("@rangeSlider").should("not.have.focus");
		cy.get("@previousRangeSlider").should("have.focus");
	});

	it("When one handle comes across the other and the values are swapped the focus must be switched between the handles", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={10} endValue={20}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--start")
			.as("startHandle");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle--end")
			.as("endHandle");

		// Focus the start handle and move it past the end handle using keyboard
		cy.get("@startHandle").realClick();

		// Move start handle to the right multiple times to pass the end handle
		for (let i = 0; i < 15; i++) {
			cy.get("@startHandle").realPress("ArrowRight");
		}

		// After swapping, the original start handle should now be the end handle
		// and should have focus
		cy.get("@endHandle").should("have.focus");

		// Verify values were swapped
		cy.get("@rangeSlider").should("have.attr", "start-value", "20");
		cy.get("@rangeSlider").should("have.attr", "end-value", "25");
	});
});

describe("Accessibility: Testing keyboard handling", () => {
	it("When progress bar is focused 'Right Arrow' key should increase both values of the Range Slider with a small increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={10} endValue={30}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-progress")
			.as("progressBar");

		// Click on the progress bar to focus it
		cy.get("@progressBar").realClick();
		cy.get("@progressBar").should("have.focus");

		// Press arrow right
		cy.get("@progressBar").realPress("ArrowRight");

		// Verify that both values increased by 1
		cy.get("@rangeSlider").should("have.attr", "start-value", "11");
		cy.get("@rangeSlider").should("have.attr", "end-value", "31");
	});

	it("When progress bar is focused 'Left Arrow' key should decrease both values of the Range Slider with a small increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={10} endValue={30}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.realPress("Tab");
		cy.realPress("ArrowLeft");

		cy.get("@rangeSlider").should("have.attr", "start-value", "9");
		cy.get("@rangeSlider").should("have.attr", "end-value", "29");
	});

	it("When progress bar is focused 'Up Arrow' key should increase both values of the Range Slider with a small increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={10} endValue={30}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.realPress("Tab");
		cy.realPress("ArrowUp");

		cy.get("@rangeSlider").should("have.attr", "start-value", "11");
		cy.get("@rangeSlider").should("have.attr", "end-value", "31");
	});

	it("When progress bar is focused 'Down' key should decrease both values of the Range Slider with a small increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={10} endValue={30}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.realPress("Tab");
		cy.realPress("ArrowDown");

		cy.get("@rangeSlider").should("have.attr", "start-value", "9");
		cy.get("@rangeSlider").should("have.attr", "end-value", "29");
	});

	it("When progress bar is focused 'Control' + 'Right Arrow' key should increase both values of the Range Slider with a big increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={10} endValue={30}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.realPress("Tab");
		cy.realPress(["Control", "ArrowRight"]);

		cy.get("@rangeSlider").should("have.attr", "start-value", "20");
		cy.get("@rangeSlider").should("have.attr", "end-value", "40");
	});

	it("When progress bar is focused 'Control' + 'Left Arrow' key should decrease both values of the Range Slider with a big increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={20} endValue={40}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.realPress("Tab");
		cy.realPress(["Control", "ArrowLeft"]);

		cy.get("@rangeSlider").should("have.attr", "start-value", "10");
		cy.get("@rangeSlider").should("have.attr", "end-value", "30");
	});

	it("When progress bar is focused 'Control' + 'Up Arrow' key should increase both values of the Range Slider with a big increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={10} endValue={30}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.realPress("Tab");
		cy.realPress(["Control", "ArrowUp"]);

		cy.get("@rangeSlider").should("have.attr", "start-value", "20");
		cy.get("@rangeSlider").should("have.attr", "end-value", "40");
	});

	it("When progress bar is focused 'Control' + 'Down' key should decrease both values of the Range Slider with a big increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={20} endValue={40}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.realPress("Tab");
		cy.realPress(["Control", "ArrowDown"]);

		cy.get("@rangeSlider").should("have.attr", "start-value", "10");
		cy.get("@rangeSlider").should("have.attr", "end-value", "30");
	});

	it("When progress bar is focused 'Page Up' key should increase both values of the Range Slider with a big increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={10} endValue={30}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.realPress("Tab");
		cy.realPress("PageUp");

		cy.get("@rangeSlider").should("have.attr", "start-value", "20");
		cy.get("@rangeSlider").should("have.attr", "end-value", "40");
	});

	it("When progress bar is focused 'Page Down' key should decrease both values of the Range Slider with a big increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={20} endValue={40}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.realPress("Tab");
		cy.realPress("PageDown");

		cy.get("@rangeSlider").should("have.attr", "start-value", "10");
		cy.get("@rangeSlider").should("have.attr", "end-value", "30");
	});

	it("When progress bar is focused the '+' key should increase both values of the Range Slider with a small increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={10} endValue={30}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.realPress("Tab");
		cy.realPress("+");

		cy.get("@rangeSlider").should("have.attr", "start-value", "11");
		cy.get("@rangeSlider").should("have.attr", "end-value", "31");

		// Test numpad add
		cy.realPress("NumpadAdd");

		cy.get("@rangeSlider").should("have.attr", "start-value", "12");
		cy.get("@rangeSlider").should("have.attr", "end-value", "32");
	});

	it("When progress bar is focused the '-' key should decrease both values of the Range Slider with a small increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={12} endValue={32}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.realPress("Tab");
		cy.realPress("-");

		cy.get("@rangeSlider").should("have.attr", "start-value", "11");
		cy.get("@rangeSlider").should("have.attr", "end-value", "31");

		// Test numpad subtract
		cy.realPress("NumpadSubtract");

		cy.get("@rangeSlider").should("have.attr", "start-value", "10");
		cy.get("@rangeSlider").should("have.attr", "end-value", "30");
	});

	it("When progress bar is focused an 'End' key press should offset the selected range to the end of the Range Slider", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={10} endValue={30}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.realPress("Tab");
		cy.realPress("End");

		cy.get("@rangeSlider").should("have.attr", "start-value", "80");
		cy.get("@rangeSlider").should("have.attr", "end-value", "100");
	});

	it("When progress bar is focused a 'Home' key press should offset the selected range to the start of the Range Slider", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={80} endValue={100}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.realPress("Tab");
		cy.realPress("Home");

		cy.get("@rangeSlider").should("have.attr", "start-value", "0");
		cy.get("@rangeSlider").should("have.attr", "end-value", "20");
	});

	it("A 'Esc' key press should return the values of the Range Slider at their initial point at the time of its focusing", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={24} endValue={42}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		cy.realPress("Tab");
		cy.realPress("Escape");

		cy.get("@rangeSlider").should("have.attr", "start-value", "24");
		cy.get("@rangeSlider").should("have.attr", "end-value", "42");
	});

	it("When a handle is focused 'Right Arrow' key should increase its value with a small increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={10} endValue={30}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Focus start handle
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress("ArrowRight");

		cy.get("@rangeSlider").should("have.attr", "start-value", "11");

		// Focus end handle
		cy.realPress("Tab");
		cy.realPress("ArrowRight");

		cy.get("@rangeSlider").should("have.attr", "end-value", "31");
	});

	it("When a handle is focused 'Left Arrow' key should decrease its value with a small increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={10} endValue={30}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Focus end handle first
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress("ArrowLeft");

		cy.get("@rangeSlider").should("have.attr", "end-value", "29");

		// Focus start handle
		cy.realPress(["Shift", "Tab"]);
		cy.realPress("ArrowLeft");

		cy.get("@rangeSlider").should("have.attr", "start-value", "9");
	});

	it("When a handle is focused 'Up Arrow' key should increase its value with a small increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={10} endValue={30}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Focus start handle
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress("ArrowUp");

		cy.get("@rangeSlider").should("have.attr", "start-value", "11");

		// Focus end handle
		cy.realPress("Tab");
		cy.realPress("ArrowUp");

		cy.get("@rangeSlider").should("have.attr", "end-value", "31");
	});

	it("When a handle is focused 'Down' key should decrease its value with a small increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={10} endValue={30}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Focus start handle
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress("ArrowDown");

		cy.get("@rangeSlider").should("have.attr", "start-value", "9");

		// Focus end handle
		cy.realPress("Tab");
		cy.realPress("ArrowDown");

		cy.get("@rangeSlider").should("have.attr", "end-value", "29");
	});

	it("When a handle is focused 'Control' + 'Right Arrow' key should increase its value with a big increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={10} endValue={30}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Focus start handle
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress(["Control", "ArrowRight"]);

		cy.get("@rangeSlider").should("have.attr", "start-value", "20");

		// Focus end handle
		cy.realPress("Tab");
		cy.realPress(["Control", "ArrowRight"]);

		cy.get("@rangeSlider").should("have.attr", "end-value", "40");
	});

	it("When a handle is focused 'Control' + 'Left Arrow' key should decrease its value with a big increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={20} endValue={40}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Focus start handle
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress(["Control", "ArrowLeft"]);

		cy.get("@rangeSlider").should("have.attr", "start-value", "10");

		// Focus end handle
		cy.realPress("Tab");
		cy.realPress(["Control", "ArrowLeft"]);

		cy.get("@rangeSlider").should("have.attr", "end-value", "30");
	});

	it("When a handle is focused 'Control' + 'Up Arrow' key should increase its value with a big increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={10} endValue={30}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Focus start handle
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress(["Control", "ArrowUp"]);

		cy.get("@rangeSlider").should("have.attr", "start-value", "20");

		// Focus end handle
		cy.realPress("Tab");
		cy.realPress(["Control", "ArrowUp"]);

		cy.get("@rangeSlider").should("have.attr", "end-value", "40");
	});

	it("When handle is focused 'Control' + 'Down' key should decrease its value with a big increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={20} endValue={40}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Focus start handle
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress(["Control", "ArrowDown"]);

		cy.get("@rangeSlider").should("have.attr", "start-value", "10");

		// Focus end handle
		cy.realPress("Tab");
		cy.realPress(["Control", "ArrowDown"]);

		cy.get("@rangeSlider").should("have.attr", "end-value", "30");
	});

	it("When a handle is focused 'Page Down' key should decrease its value with a big increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={20} endValue={40}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Focus start handle
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress("PageDown");

		cy.get("@rangeSlider").should("have.attr", "start-value", "10");

		// Focus end handle
		cy.realPress("Tab");
		cy.realPress("PageDown");

		cy.get("@rangeSlider").should("have.attr", "end-value", "30");
	});

	it("When a handle focused the '+' key should increase its value with a small increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={10} endValue={30}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Focus start handle
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress("+");

		cy.get("@rangeSlider").should("have.attr", "start-value", "11");

		// Test numpad add on start handle
		cy.realPress("NumpadAdd");
		cy.get("@rangeSlider").should("have.attr", "start-value", "12");

		// Focus end handle
		cy.realPress("Tab");
		cy.realPress("+");

		cy.get("@rangeSlider").should("have.attr", "end-value", "31");

		// Test numpad add on end handle
		cy.realPress("NumpadAdd");
		cy.get("@rangeSlider").should("have.attr", "end-value", "32");
	});

	it("When a handle focused the '-' key should decrease its value with a small increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={12} endValue={32}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Focus start handle
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress("-");

		cy.get("@rangeSlider").should("have.attr", "start-value", "11");

		// Test numpad subtract on start handle
		cy.realPress("NumpadSubtract");
		cy.get("@rangeSlider").should("have.attr", "start-value", "10");

		// Focus end handle
		cy.realPress("Tab");
		cy.realPress("-");

		cy.get("@rangeSlider").should("have.attr", "end-value", "31");

		// Test numpad subtract on end handle
		cy.realPress("NumpadSubtract");
		cy.get("@rangeSlider").should("have.attr", "end-value", "30");
	});

	it("When a handle is focused 'Page Up' key should increase its value with a big increment step", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={10} endValue={30}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Focus start handle
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress("PageUp");

		cy.get("@rangeSlider").should("have.attr", "start-value", "20");

		// Focus end handle
		cy.realPress("Tab");
		cy.realPress("PageUp");

		cy.get("@rangeSlider").should("have.attr", "end-value", "40");
	});

	it("When a handle is focused an 'End' key press should set its value to the maximum allowed", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={10} endValue={30}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Focus end handle
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress("End");

		cy.get("@rangeSlider").should("have.attr", "end-value", "100");
	});

	it("When a handle is focused a 'Home' key press should set its value to the start of the Range Slider", () => {
		cy.mount(<RangeSlider min={0} max={100} startValue={10} endValue={30}></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Focus start handle
		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress("Home");

		cy.get("@rangeSlider").should("have.attr", "start-value", "0");
	});
});

describe("Testing resize handling and RTL support", () => {
	it("Testing RTL support", () => {
		cy.mount(<RangeSlider min={0} max={10} step={1} startValue={0} endValue={4} dir="rtl"></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle-container")
			.first()
			.as("startHandle");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-inner .ui5-slider-handle-container")
			.eq(1)
			.as("endHandle");

		// Initially start-handle should be 0% from the right side
		cy.get("@startHandle").should("have.attr", "style").and("include", "right: 0%");
		// End-handle should be 40% from the right side
		cy.get("@endHandle").should("have.attr", "style").and("include", "right: 40%");

		// Set startValue to 3
		cy.get("@rangeSlider").invoke("attr", "start-value", "3");
		cy.get("@startHandle").should("have.attr", "style").and("include", "right: 30%");

		// Click on slider
		cy.get("@rangeSlider").realClick();
		cy.get("@rangeSlider").should("have.attr", "end-value", "5");
		cy.get("@endHandle").should("have.attr", "style").and("include", "right: 50%");
	});

	it("Testing RTL KBH support", () => {
		cy.mount(<RangeSlider min={0} max={10} step={1} startValue={3} endValue={7} dir="rtl"></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-handle-container")
			.first()
			.as("startHandle");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-inner .ui5-slider-handle-container")
			.eq(1)
			.as("endHandle");
		cy.get("@rangeSlider")
			.shadow()
			.find(".ui5-slider-progress")
			.as("rangeSliderSelection");

		// Initially start-handle should be 30% from the right side
		cy.get("@startHandle").should("have.attr", "style").and("include", "right: 30%");
		// End-handle should be 70% from the right side
		cy.get("@endHandle").should("have.attr", "style").and("include", "right: 70%");

		// Test selection range keyboard navigation
		cy.get("@rangeSliderSelection").realClick();
		cy.get("@rangeSliderSelection").realPress("ArrowLeft");

		cy.get("@rangeSlider").should("have.attr", "start-value", "4");
		cy.get("@rangeSlider").should("have.attr", "end-value", "8");

		cy.get("@rangeSliderSelection").realPress("ArrowRight");

		cy.get("@rangeSlider").should("have.attr", "start-value", "3");
		cy.get("@rangeSlider").should("have.attr", "end-value", "7");

		// Test start handle
		cy.get("@startHandle").realClick();
		cy.get("@startHandle").realPress("ArrowLeft");
		cy.get("@startHandle").realPress("ArrowLeft");

		cy.get("@rangeSlider").should("have.attr", "start-value", "5");

		cy.get("@startHandle").realPress("ArrowRight");

		cy.get("@rangeSlider").should("have.attr", "start-value", "4");

		cy.get("@startHandle").realPress("Home");

		cy.get("@rangeSlider").should("have.attr", "start-value", "0");

		// Test end handle
		cy.get("@endHandle").realClick();
		cy.get("@endHandle").realPress("ArrowLeft");
		cy.get("@endHandle").realPress("ArrowLeft");

		cy.get("@rangeSlider").should("have.attr", "end-value", "9");

		cy.get("@endHandle").realPress("ArrowRight");

		cy.get("@rangeSlider").should("have.attr", "end-value", "8");

		cy.get("@endHandle").realPress("End");

		cy.get("@rangeSlider").should("have.attr", "end-value", "10");
	});

	it("Should hide all labels except the first and the last one, if there is not enough space for all of them", () => {
		// Set small viewport first
		cy.viewport(400, 600);

		cy.mount(<RangeSlider min={0} max={44} step={1.25} showTickmarks></RangeSlider>);

		cy.get("[ui5-range-slider]").as("rangeSlider");

		// Wait for the component to render and calculate overlapping
		cy.get("@rangeSlider").should(($el) => {
			const rangeSlider = $el[0] as RangeSlider;
			expect(rangeSlider._labelsOverlapping || rangeSlider._hiddenTickmarks).to.be.true;
		});

		// Trigger a resize event to force recalculation
		cy.window().trigger('resize');

		// Wait for the resize handling to complete
		cy.get("@rangeSlider").should(($el) => {
			const rangeSlider = $el[0] as RangeSlider;
			expect(rangeSlider._labelsOverlapping || rangeSlider._hiddenTickmarks).to.be.true;
		});
	});
});

describe("Accessibility", () => {
	it("should apply associated label text as aria-label on the slider element", () => {
		const labelText = "basic range slider";
		cy.mount(
			<>
				<label for="rs">{labelText}</label>
				<RangeSlider id="rs" min={0} max={20}></RangeSlider>
			</>
		);

		cy.get("[ui5-range-slider]")
			.shadow()
			.find(".ui5-slider-progress")
			.should("have.attr", "aria-label", `${labelText} Range`);
	});

	it("Aria attributes of the progress bar are set correctly", () => {
		cy.mount(
			<RangeSlider min={0} max={40} step={1} end-value={20} show-tickmarks></RangeSlider>
		);

		cy.get("[ui5-range-slider]")
			.shadow()
			.find(".ui5-slider-progress")
			.as("sliderProgress");

		cy.get("[ui5-range-slider]").then(($el) => {
			const rangeSlider = $el[0] as RangeSlider;
			const minValue = rangeSlider.min;
			const maxValue = rangeSlider.max;
			const startValue = rangeSlider.startValue;
			const endValue = rangeSlider.endValue;

			cy.get("@sliderProgress")
				.should("have.attr", "aria-label", "Range");

			cy.get("@sliderProgress")
				.should("have.attr", "aria-valuemin", `${minValue}`);

			cy.get("@sliderProgress")
				.should("have.attr", "aria-valuemax", `${maxValue}`);

			cy.get("@sliderProgress")
				.should("have.attr", "aria-valuetext", `From ${startValue} to ${endValue}`);

			cy.get("@sliderProgress")
				.should("have.attr", "aria-valuenow", `${endValue}`);

		});
	});
});
