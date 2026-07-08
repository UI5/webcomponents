import StepInput from "../../src/StepInput.js";

const decreaseValue = true;

describe("StepInput button interaction tests", () => {
	it("should increase the value by clicking the 'Increase' button only if it is less than 'max'", () => {
		cy.mount(
			<StepInput max={5} value={4}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithButtons(5)

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithButtons(5)
	});

	it("should decrease the value by clicking the 'Decrease' button only if it is more than 'min'", () => {
		cy.mount(
			<StepInput min={0} value={1}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithButtons(0, decreaseValue)

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithButtons(0, decreaseValue)
	});

	it("should fire 'change' when using 'Increase' button", () => {
		cy.mount(
			<StepInput></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputAttachHandler("ui5-change", "change");

		cy.get<StepInput>("@stepInput")
			.shadow()
			.find("[ui5-number-input]")
			.shadow()
			.find(".ui5-step-inc")
			.as("increaseButton");

		cy.get("@increaseButton")
			.realClick();

		cy.get("@change")
			.should("have.been.calledOnce");

		cy.get<StepInput>("@stepInput")
			.should("have.prop", "value", 1);
	});

	it("should fire 'change' when using 'Decrease' button", () => {
		cy.mount(
			<StepInput value={5}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputAttachHandler("ui5-change", "change");

		cy.get<StepInput>("@stepInput")
			.shadow()
			.find("[ui5-number-input]")
			.shadow()
			.find(".ui5-step-dec")
			.as("decreaseButton");

		cy.get("@decreaseButton")
			.realClick();

		cy.get("@change")
			.should("have.been.calledOnce");

		cy.get<StepInput>("@stepInput")
			.should("have.prop", "value", 4);
	});

	it("should fire 'change' when clicking 'Increase' button only if it is less than 'max'", () => {
		cy.mount(
			<StepInput max={5} value={4}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputAttachHandler("ui5-change", "change");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithButtons(5)

		cy.get("@change")
			.should("have.been.calledOnce");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithButtons(5)

		cy.get("@change")
			.should("have.been.calledOnce");
	});

	it("should fire 'change' when clicking 'Decrease' button only if it is more than 'min'", () => {
		cy.mount(
			<StepInput min={0} value={1}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputAttachHandler("ui5-change", "change");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithButtons(0, decreaseValue)

		cy.get("@change")
			.should("have.been.calledOnce");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithButtons(0, decreaseValue)

		cy.get("@change")
			.should("have.been.calledOnce");
	});

	it("should fire 'change' after value property is programmatically set and then changed with buttons", () => {
		cy.mount(
			<StepInput value={5}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputAttachHandler("ui5-change", "change");

		cy.get<StepInput>("@stepInput")
			.invoke("prop", "value", 4);

		cy.get("@change")
			.should("not.have.been.called");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithButtons(5);

		cy.get("@change")
			.should("have.been.calledOnce");
	});

	it("buttons are hidden when 'readonly' is set", () => {
		cy.mount(
			<StepInput readonly></StepInput>
		);

		cy.get("[ui5-step-input]")
			.shadow()
			.find("[ui5-number-input]")
			.shadow()
			.find(".ui5-step-dec")
			.should("not.exist");

		cy.get("[ui5-step-input]")
			.shadow()
			.find("[ui5-number-input]")
			.shadow()
			.find(".ui5-step-inc")
			.should("not.exist");
	});

	it("buttons are visually disabled when component is 'disabled'", () => {
		cy.mount(
			<StepInput disabled></StepInput>
		);

		cy.get("[ui5-step-input]")
			.shadow()
			.find("[ui5-number-input]")
			.shadow()
			.find(".ui5-step-dec [ui5-icon]")
			.should("not.have.class", "ui5-number-input-icon--clickable");

		cy.get("[ui5-step-input]")
			.shadow()
			.find("[ui5-number-input]")
			.shadow()
			.find(".ui5-step-inc [ui5-icon]")
			.should("not.have.class", "ui5-number-input-icon--clickable");
	});

	it("should not round value when 'valuePrecision' is set", () => {
		cy.mount(
			<StepInput value={29.999} valuePrecision={3}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithButtons(30.999);
	});

	it("should round value when 'valuePrecision' is set to default", () => {
		cy.mount(
			<StepInput value={29.999}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputChangeValueWithButtons(31);
	});
});
