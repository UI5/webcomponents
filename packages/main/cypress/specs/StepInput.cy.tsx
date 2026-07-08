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

describe("StepInput events", () => {
	it("should fire 'input' event when typing", () => {
		cy.mount(
			<StepInput></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputAttachHandler("ui5-input", "input");

		cy.get<StepInput>("@stepInput")
			.shadow()
			.find("[ui5-number-input]")
			.realClick()
			.should("be.focused");

		cy.realType("5");

		cy.get("@input")
			.should("have.been.called");
	});

	it("should prevent 'input' event when prevented on StepInput", () => {
		cy.mount(
			<StepInput></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.then($el => {
				$el.get(0).addEventListener("input", e => {
					e.preventDefault();
					($el.get(0) as StepInput).value = 30;
				});
			});

		cy.get<StepInput>("@stepInput")
			.shadow()
			.find("[ui5-number-input]")
			.realClick()
			.should("be.focused");

		cy.realPress("1");

		cy.get<StepInput>("@stepInput")
			.should("have.prop", "value", 30);
	});

	it("should fire 'value-state-change' event when value goes out of range", () => {
		cy.mount(
			<StepInput min={3}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.ui5StepInputAttachHandler("ui5-value-state-change", "stateChange");

		cy.get<StepInput>("@stepInput")
			.shadow()
			.find("[ui5-number-input]")
			.realClick({ clickCount: 2 })
			.should("be.focused");

		cy.realType("2");

		cy.realPress("Tab");

		cy.get("@stateChange")
			.should("have.been.calledOnce");

		cy.get<StepInput>("@stepInput")
			.should("have.prop", "valueState", "Negative");
	});

	it("should not change 'valueState' when 'value-state-change' event is prevented", () => {
		const valueState = "Positive";

		cy.mount(
			<StepInput valueState={valueState} min={3}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.then($el => {
				$el.get(0).addEventListener("value-state-change", e => {
					e.preventDefault();
				});
			});

		cy.get<StepInput>("@stepInput")
			.ui5StepInputAttachHandler("ui5-value-state-change", "stateChange");

		cy.get<StepInput>("@stepInput")
			.shadow()
			.find("[ui5-number-input]")
			.realClick({ clickCount: 2 })
			.should("be.focused");

		cy.realType("2");

		cy.realPress("Tab");

		cy.get("@stateChange")
			.should("have.been.calledOnce");

		cy.get<StepInput>("@stepInput")
			.should("have.prop", "valueState", valueState);
	});

	it("should sync 'valueState' to outer element on 'change'", () => {
		cy.mount(
			<StepInput min={3}></StepInput>
		);

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.shadow()
			.find("[ui5-number-input]")
			.realClick({ clickCount: 2 })
			.should("be.focused");

		cy.realType("2");

		cy.realPress("Tab");

		cy.get<StepInput>("@stepInput")
			.should("have.prop", "valueState", "Negative");

		cy.get<StepInput>("@stepInput")
			.shadow()
			.find("[ui5-number-input]")
			.realClick({ clickCount: 2 })
			.should("be.focused");

		cy.realType("5");

		cy.realPress("Tab");

		cy.get<StepInput>("@stepInput")
			.should("have.prop", "valueState", "None");
	});

	it("should submit form when 'Enter' is pressed inside the input", () => {
		cy.mount(
			<form>
				<StepInput id="stepInput"></StepInput>
				<button type="submit" id="submitBtn">Submit</button>
			</form>
		);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", (e) => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("[ui5-step-input]")
			.shadow()
			.find("[ui5-number-input]")
			.realClick()
			.should("be.focused");

		cy.realPress("Enter");

		cy.get("@submit")
			.should("have.been.calledOnce");
	});
});

describe("Validation inside form", () => {
	it("has correct validity for patternMissmatch", () => {
		cy.mount(
			<form>
				<StepInput id="stepInput" valuePrecision={3}></StepInput>
				<button type="submit" id="submitBtn">Submits forms</button>
			</form>
		);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", (e) => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.shadow()
			.find("[ui5-number-input]")
			.ui5NumberInputTypeNumber(2.34);

		cy.get("#submitBtn")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("@stepInput")
			.ui5AssertValidityState({
				formValidity: { patternMismatch: true },
				validity: { patternMismatch: true, valid: false },
				checkValidity: false,
				reportValidity: false
			});

		cy.get("#stepInput:invalid")
			.should("exist", "StepInput without formatted value should have :invalid CSS class");

		cy.get<StepInput>("@stepInput")
			.shadow()
			.find("[ui5-number-input]")
			.ui5NumberInputTypeNumber(2.345);

		cy.get("@stepInput")
			.ui5AssertValidityState({
				formValidity: { patternMismatch: false },
				validity: { patternMismatch: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#stepInput:invalid")
			.should("not.exist", "StepInput with formatted value should not have :invalid CSS class");
	});

	it("has correct validity for rangeUnderflow", () => {
		cy.mount(
			<form>
				<StepInput id="stepInput" min={3}></StepInput>
				<button type="submit" id="submitBtn">Submits forms</button>
			</form>
		);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", (e) => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.shadow()
			.find("[ui5-number-input]")
			.ui5NumberInputTypeNumber(2);

		cy.get("#submitBtn")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("@stepInput")
			.ui5AssertValidityState({
				formValidity: { rangeUnderflow: true },
				validity: { rangeUnderflow: true, valid: false },
				checkValidity: false,
				reportValidity: false
			});

		cy.get("#stepInput:invalid")
			.should("exist", "StepInput with value lower than min should have :invalid CSS class");

		cy.get<StepInput>("@stepInput")
			.shadow()
			.find("[ui5-number-input]")
			.ui5NumberInputTypeNumber(4);

		cy.get("@stepInput")
			.ui5AssertValidityState({
				formValidity: { rangeUnderflow: false },
				validity: { rangeUnderflow: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#stepInput:invalid")
			.should("not.exist", "StepInput with value higher than min should not have :invalid CSS class");
	});

	it("has correct validity for rangeOverflow", () => {
		cy.mount(
			<form>
				<StepInput id="stepInput" max={3}></StepInput>
				<button type="submit" id="submitBtn">Submits forms</button>
			</form>
		);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", (e) => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("[ui5-step-input]")
			.as("stepInput");

		cy.get<StepInput>("@stepInput")
			.shadow()
			.find("[ui5-number-input]")
			.ui5NumberInputTypeNumber(4);

		cy.get("#submitBtn")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("@stepInput")
			.ui5AssertValidityState({
				formValidity: { rangeOverflow: true },
				validity: { rangeOverflow: true, valid: false },
				checkValidity: false,
				reportValidity: false
			});

		cy.get("#stepInput:invalid")
			.should("exist", "StepInput with value above max should have :invalid CSS class");

		cy.get<StepInput>("@stepInput")
			.shadow()
			.find("[ui5-number-input]")
			.ui5NumberInputTypeNumber(2);

		cy.get("@stepInput")
			.ui5AssertValidityState({
				formValidity: { rangeOverflow: false },
				validity: { rangeOverflow: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#stepInput:invalid")
			.should("not.exist", "StepInput with value lower than max should not have :invalid CSS class");
	});
});
