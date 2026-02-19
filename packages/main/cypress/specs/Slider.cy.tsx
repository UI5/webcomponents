import Slider from "../../src/Slider.js";

function dragSliderHandle(selector: string, offset: { x: number, y: number }) {
	cy.get(selector).shadow().find("[ui5-slider-handle]").realMouseDown()
	cy.focused().realMouseMove(offset.x, offset.y);
	cy.focused().realMouseUp();
}

describe("General interactions", () => {
	beforeEach(() => {
		cy.get('[data-cy-root]')
			.invoke('css', 'padding', '100px')
	})

	it("Fire change event on keyup", () => {
		cy.mount(
			<Slider min={0} max={20} onChange={cy.stub().as("changed")}></Slider>
		);

		// First 'change' event is fired when the slider is clicked
		cy.get("[ui5-slider]").realClick();

		cy.get("[ui5-slider]")
			.should("be.focused")

		cy.get("@changed")
			.should("have.been.calledOnce");

		// Second 'change' event is fired on keyboard interaction
		cy.get("[ui5-slider]").realPress("ArrowRight");

		cy.get("@changed")
			.should("have.been.calledTwice");
	});

	it("Changing the current value is reflected", () => {
		cy.mount(<Slider min={0} max={10} value={0} />);

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-handle]")
			.should("have.attr", "style", "inset-inline-start: clamp(0%, 0%, 100%);");

		cy.get("[ui5-slider]").invoke("prop", "value", 3);

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-handle]")
			.should("have.attr", "style", "inset-inline-start: clamp(0%, 30%, 100%);");

		cy.get("[ui5-slider]").realClick();

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-handle]")
			.should("have.attr", "style", "inset-inline-start: clamp(0%, 50%, 100%);");

		cy.get("[ui5-slider]").should("have.value", 5);

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("sliderHandle");

		dragSliderHandle("[ui5-slider]", { x: 300, y: 0 });

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-handle]")
			.should("have.attr", "style", "inset-inline-start: clamp(0%, 70%, 100%);");

		cy.get("[ui5-slider]").should("have.value", 7);

		dragSliderHandle("[ui5-slider]", { x: 100, y: 0 });

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-handle]")
			.should("have.attr", "style", "inset-inline-start: clamp(0%, 80%, 100%);");

		cy.get("[ui5-slider]").should("have.value", 8);

		dragSliderHandle("[ui5-slider]", { x: -100, y: 0 });

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-handle]")
			.should("have.attr", "style", "inset-inline-start: clamp(0%, 70%, 100%);");

		cy.get("[ui5-slider]").should("have.value", 7);
	});

	it("Slider with floating min, max and step property", () => {
		cy.mount(<Slider min={-12.5} max={47.5} step={1.25} value={21.25} />);

		cy.get("[ui5-slider]").as("slider");

		cy.get("@slider").realClick({ position: "left" });

		cy.get("@slider").should("have.value", -12.5);
	});

	it("Slider should not be interactive if the step property is 0", () => {
		cy.mount(<Slider min={-12.5} max={47.5} step={0} value={21.25} />);

		cy.get("[ui5-slider]").as("slider");

		cy.get("@slider").realClick({ position: "left" });

		cy.get("@slider").should("have.value", 21.25);
	});

	it("Disabled slider is not interactive", () => {
		cy.mount(<Slider min={-12.5} max={47.5} step={1.25} value={21.25} disabled />);

		cy.get("[ui5-slider]").as("slider");

		cy.get("@slider").realClick({ position: "left" });

		cy.get("@slider").should("have.value", 21.25);

		cy.get("@slider").should("have.attr", "disabled");
	});
});

describe("Slider elements - tooltip, step, tickmarks, labels", () => {
	beforeEach(() => {
		cy.get('[data-cy-root]')
			.invoke('css', 'padding', '100px')
	})

	it("Slider Tooltip is displayed showing the current value after swipe", () => {
		cy.mount(<Slider id="basic-slider-with-tooltip" min={0} max={100} value={0} showTooltip editableTooltip />);

		cy.get("[ui5-slider]").as("slider");

		cy.get("@slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.realClick();

		dragSliderHandle("#basic-slider-with-tooltip", { x: 240, y: 0 });

		cy.get("@slider")
			.shadow()
			.find("[ui5-slider-tooltip]")
			.shadow()
			.find("[ui5-input]")
			.should("have.value", "20");
	});

	it("Tooltip input is displayed showing the current value", () => {
		cy.mount(<Slider editableTooltip min={-20} max={20} step={2} value={12} showTooltip labelInterval={2} showTickmarks />);

		cy.get("[ui5-slider]").as("slider");

		cy.get("@slider").shadow().find("[ui5-slider-handle]").as("sliderHandle");

		cy.get("@sliderHandle").realClick();

		cy.get("@slider")
			.shadow()
			.find("[ui5-slider-tooltip]")
			.shadow()
			.find("[ui5-input]")
			.should("have.value", "12");
	});

	it("Input tooltip value change should change the slider's value", () => {
		cy.mount(<Slider editableTooltip min={-20} max={20} step={2} value={12} showTooltip labelInterval={2} showTickmarks />);

		cy.get("[ui5-slider]").as("slider");

		cy.get("@slider").invoke("prop", "value", 8);

		cy.get("@slider").shadow().find("[ui5-slider-handle]").as("sliderHandle");

		cy.get("@sliderHandle").realClick();

		cy.get("@slider")
			.shadow()
			.find("[ui5-slider-tooltip]")
			.shadow()
			.find("[ui5-input]")
			.as("input")
			.realClick({ clickCount: 2 });

		cy.get("@input")
			.should("be.focused");

		cy.realPress("Backspace");

		cy.get("@input")
			.should("have.value", "");

		cy.realType("2")

		cy.realPress("Enter");

		cy.get("@input")
			.should("have.value", "2");

		cy.get("@slider").should("have.value", 2, "The input value is reflected in the slider");
	});

	it("Input tooltip value change should fire change event", () => {
		cy.mount(<Slider editableTooltip min={-20} max={20} step={2} value={12} showTooltip labelInterval={2} showTickmarks onChange={cy.stub().as("sliderChange")} />);

		cy.get("[ui5-slider]").as("slider");

		cy.get("@slider").shadow().find("[ui5-slider-handle]").as("sliderHandle");

		cy.get("@sliderHandle").realClick();

		cy.get("@slider")
			.shadow()
			.find("[ui5-slider-tooltip]")
			.shadow()
			.find("[ui5-input]")
			.as("input")
			.realClick({ clickCount: 2 });

		cy.get("@input")
			.should("be.focused");

		cy.realPress("Backspace");

		cy.get("@input")
			.should("have.value", "");

		cy.realType("2")

		cy.realPress("Enter");

		cy.get("@input")
			.should("have.value", "2");

		cy.get("@sliderChange").should("have.been.calledOnce");
	});

	it("Input tooltip should change the value state to error if it is invalid", () => {
		cy.mount(<Slider editableTooltip min={-20} max={20} step={2} value={12} showTooltip labelInterval={2} showTickmarks />);

		cy.get("[ui5-slider]").as("slider");

		cy.get("@slider").shadow().find("[ui5-slider-handle]").as("sliderHandle");

		cy.get("@sliderHandle").realClick();

		cy.get("@slider")
			.shadow()
			.find("[ui5-slider-tooltip]")
			.shadow()
			.find("[ui5-input]")
			.as("sliderTooltipInput");

		cy.get("@sliderTooltipInput")
			.realClick();

		cy.get("@sliderTooltipInput")
			.should("be.focused");

		cy.realType("2");

		cy.realPress("Enter");

		cy.get("@sliderTooltipInput").should("have.attr", "value-state", "Negative");
	});

	it("F2 should switch the focus between the handle and the tooltip input", () => {
		cy.mount(<Slider editableTooltip min={-20} max={20} step={2} value={12} showTooltip labelInterval={2} showTickmarks />);

		cy.get("[ui5-slider]").as("slider");
		cy.get("@slider").shadow().find("[ui5-slider-handle]").as("sliderHandle");

		cy.get("@sliderHandle").realClick();

		cy.get("@sliderHandle").should("be.focused");

		cy.get("@slider")
			.shadow()
			.find("[ui5-slider-tooltip]").as("sliderTooltip");

		cy.get("@sliderTooltip")
			.shadow()
			.find("[ui5-input]")
			.as("sliderTooltipInput");

		cy.realPress("F2");

		cy.get("@sliderTooltipInput").should("be.focused");

		cy.realPress("F2");

		cy.get("@sliderHandle").should("be.focused");
	});

	it("Arrow up/down should not increase/decrease the value of the input", () => {
		cy.mount(<Slider editableTooltip min={0} max={20} value={1} showTooltip />);

		cy.get("[ui5-slider]").as("slider");

		cy.get("@slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("sliderHandle");

		cy.get("@slider")
			.shadow()
			.find("[ui5-slider-tooltip]")
			.shadow()
			.find("[ui5-input]")
			.as("sliderTooltipInput");

		cy.get("@sliderHandle").realClick();

		cy.get("@sliderHandle").should("be.focused");

		cy.get("@sliderTooltipInput").realClick();

		cy.get("@sliderTooltipInput").should("be.focused");

		cy.realPress("ArrowUp");
		cy.get("@slider").should("have.value", 1);

		cy.realPress("ArrowDown");

		cy.get("@slider").should("have.value", 1);
	});

	it("Tab on slider handle should not move the focus to the tooltip input", () => {
		cy.mount(
			<>
				<Slider id="slider-tickmarks-labels" editableTooltip min={0} max={20} />
				<Slider id="slider-tickmarks-tooltips-labels" editableTooltip min={0} max={20} />
			</>
		);

		cy.get("#slider-tickmarks-labels")
			.shadow()
			.find("[ui5-slider-handle]")
			.realClick();

		cy.get("#slider-tickmarks-labels")
			.shadow()
			.find("[ui5-slider-handle]")
			.should("be.focused");

		cy.realPress("Tab");

		cy.get("#slider-tickmarks-tooltips-labels").should("be.focused");
	});

	it("Focus out with invalid value should reset it", () => {
		cy.mount(
			<>
				<Slider id="slider-tickmarks-labels" showTooltip editableTooltip min={0} max={20} value={10} />
				<Slider id="slider-tickmarks-tooltips-labels" editableTooltip min={0} max={20} />
			</>
		);

		cy.get("#slider-tickmarks-labels").as("slider");

		cy.get("@slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("sliderHandle");

		cy.get("@slider")
			.shadow()
			.find("[ui5-slider-tooltip]")
			.shadow()
			.find("[ui5-input]")
			.as("sliderTooltipInput");

		cy.get("@sliderHandle").realClick();

		cy.get("@sliderHandle").should("be.focused");

		cy.get("@sliderTooltipInput").realClick();

		cy.get("@sliderTooltipInput").should("be.focused");

		cy.realType("0");

		cy.get("#slider-tickmarks-tooltips-labels").realClick();

		cy.get("@sliderTooltipInput").should("have.value", "10");
	});

	it("Slider Tooltip should become hidden when slider loses focus", () => {
		cy.mount(
			<>
				<Slider id="basic-slider-with-tooltip" showTooltip editableTooltip min={0} max={20} value={10} />
				<Slider id="basic-slider" min={0} max={20} />
			</>
		);

		cy.get("#basic-slider-with-tooltip").as("slider");
		cy.get("#basic-slider").as("anotherSlider");

		cy.get("@slider").realClick();

		cy.get("@slider").should("be.focused");

		cy.get("@slider").shadow().find("[ui5-slider-tooltip]").as("sliderTooltip");

		cy.get("@sliderTooltip").should("have.prop", "open", true);

		cy.get("@anotherSlider").realClick();

		cy.get("@anotherSlider").should("be.focused");

		cy.get("@sliderTooltip").should("have.prop", "open", false);
	});

	it("Should not 'stepify' current value if it is not a result of user interaction", () => {
		cy.mount(<Slider id="tickmarks-slider" min={0} max={20} step={2} />);

		cy.get("#tickmarks-slider").as("slider");

		cy.get("@slider").invoke("prop", "value", 13);

		cy.get("@slider").invoke("prop", "value").should("equal", 13);
	});
});

describe("Testing events", () => {
	beforeEach(() => {
		cy.get('[data-cy-root]')
			.invoke('css', 'padding', '100px')
	})

	it("Should fire input and change event on user interaction", () => {
		cy.mount(<Slider min={0} max={10} value={0} onChange={cy.stub().as("sliderChange")} onInput={cy.stub().as("sliderInput")} />);

		cy.get("[ui5-slider]").as("slider");

		cy.get("@slider").realClick();

		cy.get("@sliderChange").should("have.been.calledOnce");
		cy.get("@sliderInput").should("have.been.calledOnce");
		cy.get("@slider").should("have.value", 5, "Both input event and change event are fired after user interaction");
	});

	it("Should not fire change event after user interaction finishes if the current value is the same as the one at the start of the action", () => {
		cy.mount(<Slider min={0} max={10} value={5} onChange={cy.stub().as("sliderChange")} />);

		cy.get("[ui5-slider]").as("slider");

		cy.get("@slider").realClick();

		cy.get("@sliderChange").should("have.not.been.called");
		cy.get("@slider").should("have.value", 5, "Change event is not fired if the value is the same as before the start of the action");
	});
});

describe("Accessibility", () => {
	beforeEach(() => {
		cy.get('[data-cy-root]')
			.invoke('css', 'padding', '100px')
	})

	it("aria-keyshortcuts should not be set on regular slider", () => {
		cy.mount(
			<Slider min={0} max={20}></Slider>
		);

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-handle]")
			.should("not.have.attr", "aria-keyshortcuts");
	});

	it("aria-keyshortcuts should be set on slider with editable tooltips", () => {
		cy.mount(
			<Slider editableTooltip={true} min={0} max={20}></Slider>
		);

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-handle]")
			.should("have.attr", "aria-keyshortcuts");
	});

	it("should apply associated label text as aria-label on the slider element", () => {
		const labelText = "label for slider";
		cy.mount(
			<>
				<label for="slider">{labelText}</label>
				<Slider id="slider" min={0} max={20}></Slider>
			</>
		);

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-handle]")
			.should("have.attr", "aria-label", `${labelText} Slider handle`);
	});

	it("Aria attributes are set correctly", () => {
		cy.mount(
			<Slider accessibleName="Basic Slider" min={0} max={10}></Slider>
		);

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("sliderHandle");

		cy.get("@sliderHandle")
			.should("have.attr", "aria-label", "Basic Slider Slider handle");

		cy.get("@sliderHandle")
			.should("have.attr", "aria-valuemin", "0");

		cy.get("@sliderHandle")
			.should("have.attr", "aria-valuemax", "10");

		cy.get("@sliderHandle")
			.should("have.attr", "aria-valuenow", "0");
	});

	it("Aria attributes are set correctly to the tooltip input", () => {
		cy.mount(<Slider editableTooltip min={0} max={20} value={10} />);

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-tooltip]")
			.shadow()
			.find("[ui5-input]")
			.as("sliderTooltipInput");

		cy.get("@sliderTooltipInput").should("have.attr", "accessible-name-ref", "ui5-slider-InputLabel");
	});

	it("Click anywhere in the Slider should focus the Slider's handle", () => {
		cy.mount(<Slider min={0} max={20} value={10} />);

		cy.get("[ui5-slider]").as("slider");

		cy.get("@slider").realClick();

		cy.get("@slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.should("be.focused");
	});

	it("Tab should focus the Slider and move the visible focus outline to the slider's handle", () => {
		cy.mount(<>
			<button>Before</button>
			<Slider editableTooltip min={0} max={20} value={10} />
		</>);

		cy.get("button")
			.contains("Before")
			.realClick();

		cy.get("button")
			.contains("Before")
			.should("be.focused");

		cy.realPress("Tab");

		cy.get("[ui5-slider]")
			.shadow()
			.find("[ui5-slider-handle]")
			.should("be.focused");
	});

	it("Shift+Tab should focus the previous Slider and move the visible focus outline to the previous slider's handle", () => {
		cy.mount(
			<>
				<Slider id="basic-slider" min={0} max={20} value={10} />
				<Slider id="basic-slider-with-tooltip" editableTooltip min={0} max={20} value={10} />
			</>
		);

		cy.get("#basic-slider-with-tooltip").realClick();

		cy.get("#basic-slider-with-tooltip").should("be.focused");

		cy.realPress(["Shift", "Tab"]);

		cy.get("#basic-slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.should("be.focused");
	});
});

describe("Accessibility: Testing keyboard handling", () => {
	beforeEach(() => {
		cy.get('[data-cy-root]')
			.invoke('css', 'padding', '100px')
	})

	it("Right arrow should increase the value of the slider with a small increment step", () => {
		cy.mount(<Slider min={0} max={20} value={0} />);

		cy.get("[ui5-slider]")
			.as("slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("handle")
			.realClick();

		cy.get("@handle")
			.should("be.focused");

		cy.realPress("ArrowRight");

		cy.get("@slider").should("have.value", 1);
	});

	it("Left arrow should decrease the value of the slider with a small increment step", () => {
		cy.mount(<Slider min={0} max={20} value={1} />);

		cy.get("[ui5-slider]")
			.as("slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("handle")
			.realClick();

		cy.get("@handle")
			.should("be.focused");

		cy.realPress("ArrowLeft");

		cy.get("@slider").should("have.value", 0);
	});

	it("Up arrow should increase the value of the slider with a small increment step", () => {
		cy.mount(<Slider min={0} max={20} value={0} />);

		cy.get("[ui5-slider]")
			.as("slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("handle")
			.realClick();

		cy.get("@handle")
			.should("be.focused");

		cy.realPress("ArrowUp");

		cy.get("@slider").should("have.value", 1);
	});

	it("Down arrow should decrease the value of the slider with a small increment step", () => {
		cy.mount(<Slider min={0} max={20} value={1} />);

		cy.get("[ui5-slider]")
			.as("slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("handle")
			.realClick();

		cy.get("@handle")
			.should("be.focused");

		cy.realPress("ArrowDown");

		cy.get("@slider").should("have.value", 0);
	});

	it("Ctrl + Right arrow should increase the value of the slider with a big increment step", () => {
		cy.mount(<Slider min={0} max={20} value={0} />);

		cy.get("[ui5-slider]")
			.as("slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("handle")
			.realClick();

		cy.get("@handle")
			.should("be.focused");

		cy.realPress(["ControlLeft", "ArrowRight"]);

		cy.get("@slider").should("have.value", 2);
	});

	it("Ctrl + Left arrow should decrease the value of the slider with a big increment step", () => {
		cy.mount(<Slider min={0} max={20} value={2} />);

		cy.get("[ui5-slider]")
			.as("slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("handle")
			.realClick();

		cy.get("@handle")
			.should("be.focused");

		cy.realPress(["ControlLeft", "ArrowLeft"]);

		cy.get("@slider").should("have.value", 0);
	});

	it("Ctrl + Up arrow should increase the value of the slider with a big increment step", () => {
		cy.mount(<Slider min={0} max={20} value={0} />);

		cy.get("[ui5-slider]")
			.as("slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("handle")
			.realClick();

		cy.get("@handle")
			.should("be.focused");

		cy.realPress(["ControlLeft", "ArrowUp"]);

		cy.get("@slider").should("have.value", 2);
	});

	it("Ctrl + Down arrow should decrease the value of the slider with a big increment step", () => {
		cy.mount(<Slider min={0} max={20} value={2} />);

		cy.get("[ui5-slider]")
			.as("slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("handle")
			.realClick();

		cy.get("@handle")
			.should("be.focused");

		cy.realPress(["ControlLeft", "ArrowDown"]);

		cy.get("@slider").should("have.value", 0);
	});

	it("PageUp should increase the value of the slider with a big increment step", () => {
		cy.mount(<Slider min={0} max={20} value={0} />);

		cy.get("[ui5-slider]")
			.as("slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("handle")
			.realClick();

		cy.get("@handle")
			.should("be.focused");

		cy.realPress("PageUp");

		cy.get("@slider").should("have.value", 2);
	});

	it("PageDown should decrease the value of the slider with a big increment step", () => {
		cy.mount(<Slider min={0} max={20} value={2} />);

		cy.get("[ui5-slider]")
			.as("slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("handle")
			.realClick();

		cy.get("@handle")
			.should("be.focused");

		cy.realPress("PageDown");

		cy.get("@slider").should("have.value", 0);
	});

	it("A '+' key press should increase the value of the slider with a small increment step", () => {
		cy.mount(<Slider min={0} max={20} value={0} />);

		cy.get("[ui5-slider]")
			.as("slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("handle")
			.realClick();

		cy.get("@handle")
			.should("be.focused");

		cy.realPress("+");

		cy.get("@slider").should("have.value", 1);
	});

	it("A '-' key press should decrease the value of the slider with a small increment step", () => {
		cy.mount(<Slider min={0} max={20} value={1} />);

		cy.get("[ui5-slider]")
			.as("slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("handle")
			.realClick();

		cy.get("@handle")
			.should("be.focused");

		cy.realPress("-");

		cy.get("@slider").should("have.value", 0);
	});

	it("An 'End' key press should increase the value of the slider to its max", () => {
		cy.mount(<Slider min={0} max={20} value={0} />);

		cy.get("[ui5-slider]")
			.as("slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("handle")
			.realClick();

		cy.get("@handle")
			.should("be.focused");

		cy.realPress("End");

		cy.get("@slider").should("have.value", 20);
	});

	it("A 'Home' key press should set the value of the slider to its minimum", () => {
		cy.mount(<Slider min={0} max={20} value={20} />);

		cy.get("[ui5-slider]")
			.as("slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("handle")
			.realClick();

		cy.get("@handle")
			.should("be.focused");

		cy.realPress("Home");

		cy.get("@slider").should("have.value", 0);
	});

	it("A 'Esc' key press should return the value of the slider at its initial point at the time of its focusing", () => {
		cy.mount(<Slider min={0} max={20} value={12} />);

		cy.get("[ui5-slider]")
			.as("slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("handle")
			.realClick();

		cy.get("@handle")
			.should("be.focused");

		cy.realPress("End");

		cy.get("@slider").should("have.value", 20);

		cy.realPress("Escape");

		cy.get("@slider").should("have.value", 12);
	});
});

describe("Testing resize handling and RTL support", () => {
	beforeEach(() => {
		cy.get('[data-cy-root]')
			.invoke('css', 'padding', '100px')
	})

	it("Testing RTL support", () => {
		cy.mount(
			<div dir="rtl">
				<Slider min={0} max={10} value={0} />
			</div>
		);

		cy.get("[ui5-slider]")
			.as("slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("sliderHandleContainer");

		cy.get("@slider").invoke("prop", "value", 0);

		cy.get("@sliderHandleContainer")
			.should("have.attr", "style", "inset-inline-start: clamp(0%, 0%, 100%);");

		cy.get("@slider").invoke("prop", "value", 3);

		cy.get("@sliderHandleContainer")
			.should("have.attr", "style", "inset-inline-start: clamp(0%, 30%, 100%);");

		cy.get("@slider").realClick();

		cy.get("@sliderHandleContainer")
			.should("have.attr", "style", "inset-inline-start: clamp(0%, 50%, 100%);");

		cy.get("@slider").should("have.value", 5);

		dragSliderHandle("[ui5-slider]", { x: -300, y: 1 });

		cy.get("@sliderHandleContainer")
			.should("have.attr", "style", "inset-inline-start: clamp(0%, 80%, 100%);");

		cy.get("@slider").should("have.value", 8);

		dragSliderHandle("[ui5-slider]", { x: -100, y: 1 });

		cy.get("@sliderHandleContainer")
			.should("have.attr", "style", "inset-inline-start: clamp(0%, 90%, 100%);");

		cy.get("@slider").should("have.value", 9);

		dragSliderHandle("[ui5-slider]", { x: -150, y: 1 });

		cy.get("@sliderHandleContainer")
			.should("have.attr", "style", "inset-inline-start: clamp(0%, 100%, 100%);");

		cy.get("@slider").should("have.value", 10);
	});

	it("Testing RTL KBH support", () => {
		cy.mount(
			<div dir="rtl">
				<Slider min={0} max={10} value={0} />
			</div>
		);
		cy.get("[ui5-slider]")
			.as("slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("sliderHandleContainer");

		cy.get("@sliderHandleContainer")
			.should("have.attr", "style", "inset-inline-start: clamp(0%, 0%, 100%);");

		cy.get("@slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("handle")
			.realClick();

		cy.get("@handle").should("be.focused");

		cy.realPress("ArrowLeft");
		cy.realPress("ArrowLeft");

		cy.get("@sliderHandleContainer")
			.should("have.attr", "style", "inset-inline-start: clamp(0%, 20%, 100%);");

		cy.get("@slider").should("have.value", 2);

		cy.realPress("ArrowRight");

		cy.get("@sliderHandleContainer")
			.should("have.attr", "style", "inset-inline-start: clamp(0%, 10%, 100%);");

		cy.get("@slider").should("have.value", 1);
	});

	it("Testing RTL KBH support - arrow up and down", () => {
		cy.mount(
			<div dir="rtl">
				<Slider min={0} max={10} value={0} />
			</div>
		);

		cy.get("[ui5-slider]")
			.as("slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("sliderHandleContainer");

		cy.get("@sliderHandleContainer")
			.should("have.attr", "style", "inset-inline-start: clamp(0%, 0%, 100%);");
		cy.get("@slider")
			.shadow()
			.find("[ui5-slider-handle]")
			.as("handle")
			.realClick();

		cy.get("@handle").should("be.focused");

		cy.realPress("ArrowUp");
		cy.realPress("ArrowUp");

		cy.get("@sliderHandleContainer")
			.should("have.attr", "style", "inset-inline-start: clamp(0%, 20%, 100%);");

		cy.get("@slider").should("have.value", 2);

		cy.realPress("ArrowDown");

		cy.get("@sliderHandleContainer")
			.should("have.attr", "style", "inset-inline-start: clamp(0%, 10%, 100%);");

		cy.get("@slider").should("have.value", 1);
	});
});
