import NumericInput from "../../src/NumericInput.js";
import Label from "../../src/Label.js";
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import "../../src/Assets.js";

const decreaseValue = true;

describe("NumericInput keyboard interaction tests", () => {
	it("should increase the value with 'ArrowUp' only if it is less than 'max'", () => {
		cy.mount(
			<NumericInput max={5} value={4}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.realClick();

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputChangeValueWithArrowKeys(5);

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputChangeValueWithArrowKeys(5);
	});

	it("should decrease the value with 'ArrowDown' only if it is more than 'min'", () => {
		cy.mount(
			<NumericInput min={5} value={6}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.realClick();

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputChangeValueWithArrowKeys(5, decreaseValue);

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputChangeValueWithArrowKeys(5, decreaseValue);
	});

	it("should set the value to the 'max' with 'Shift+PageUp'", () => {
		cy.mount(
			<NumericInput max={5}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.realClick()
			.should("be.focused");

		cy.realPress(['Shift', 'PageUp']);

		cy.get<NumericInput>("@numberInput")
			.should("have.prop", "value", 5);
	});

	it("should set the value to the 'min' with 'Shift+PageDown'", () => {
		cy.mount(
			<NumericInput min={0} value={5}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.realClick()
			.should("be.focused");

		cy.realPress(['Shift', 'PageDown']);

		cy.get<NumericInput>("@numberInput")
			.should("have.prop", "value", 0);
	});

	it("should set the value to the 'max' with 'Ctrl+Shift+ArrowUp'", () => {
		cy.mount(
			<NumericInput max={5}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.realClick()
			.should("be.focused");

		cy.realPress(['Control', 'Shift', 'ArrowUp']);

		cy.get<NumericInput>("@numberInput")
			.should("have.prop", "value", 5);
	});

	it("should set the value to the 'min' with 'Ctrl+Shift+ArrowDown'", () => {
		cy.mount(
			<NumericInput min={0} value={5}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.realClick()
			.should("be.focused");

		cy.realPress(['Control', 'Shift', 'ArrowDown']);

		cy.get<NumericInput>("@numberInput")
			.should("have.prop", "value", 0);
	});

	it("should restore the previous value with 'Escape'", () => {
		cy.mount(
			<NumericInput value={5}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.realClick();

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputChangeValueWithArrowKeys(6);

		cy.realPress("Escape");

		cy.get<NumericInput>("@numberInput")
			.should("have.prop", "value", 5);
	});

	it("should update the value when typed in input", () => {
		cy.mount(
			<NumericInput></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.realClick({ "clickCount": 2 })
			.should("be.focused");

		cy.realType("23");
		cy.realPress("Enter");

		cy.get<NumericInput>("@numberInput")
			.should("have.prop", "value", 23);
	});

	it("should reset the value to 0 if input is deleted", () => {
		cy.mount(
			<NumericInput value={10}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.realClick({ "clickCount": 2 })
			.should("be.focused");

		cy.realPress("Backspace");
		cy.realPress("Enter");

		cy.get<NumericInput>("@numberInput")
			.should("have.prop", "value", 0);
	});
});

describe("NumericInput misc interaction tests", () => {
	it("should not round value when 'valuePrecision' is set", () => {
		cy.mount(
			<NumericInput value={29.999} valuePrecision={3}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.realClick()
			.should("be.focused");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputChangeValueWithArrowKeys(30.999);
	});

	it("should round value when 'valuePrecision' is set to default", () => {
		cy.mount(
			<NumericInput value={29.999}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.realClick()
			.should("be.focused");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputChangeValueWithArrowKeys(31);
	});

	it("should set 'valueState' to 'Negative' when the value is not compliant", () => {
		cy.mount(
			<NumericInput></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.realClick({ "clickCount": 2 })
			.should("be.focused");

		cy.realType("23.034");

		cy.realPress("Enter");

		cy.get<NumericInput>("@numberInput")
			.should("have.prop", "valueState", "Negative");
	});
});

describe("NumericInput events", () => {
	it("should not change value state when 'value-state-change' event is prevented", () => {
		const valueState = "Positive";

		cy.mount(
			<NumericInput valueState={valueState}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.then($input => {
				$input.get(0).addEventListener("value-state-change", e => {
					e.preventDefault();
				});
			});

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputAttachHandler("value-state-change", "stateChange");

		cy.get<NumericInput>("@numberInput")
			.realClick();

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputChangeValueWithArrowKeys(1);

		cy.get("@stateChange")
			.should("have.been.calledOnce");

		cy.get<NumericInput>("@numberInput")
			.should("have.prop", "valueState", valueState);
	});

	it("should prevent input event", () => {
		cy.mount(
			<NumericInput></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.then($input => {
				$input.get(0).addEventListener("input", e => {
					e.preventDefault();
					(e.target as NumericInput).value = 30;
				});
			});

		cy.get<NumericInput>("@numberInput")
			.realClick()
			.should("be.focused");

		cy.realPress("1");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputCheckInnerInputProperty("value", "30");
	});

	it("should not fire 'change' when navigating with 'ArrowUp'/'ArrowDown' keys", () => {
		cy.mount(
			<NumericInput></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputAttachHandler("ui5-change", "change");

		cy.get<NumericInput>("@numberInput")
			.realClick();

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputChangeValueWithArrowKeys(1);

		cy.get("@change")
			.should("have.not.been.called");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputChangeValueWithArrowKeys(0, decreaseValue);

		cy.get("@change")
			.should("have.not.been.called");
	});

	it("should fire 'change' after 'Enter' is pressed", () => {
		cy.mount(
			<NumericInput></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputAttachHandler("ui5-change", "change");

		cy.get<NumericInput>("@numberInput")
			.realClick();

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputChangeValueWithArrowKeys(1);

		cy.realPress("Enter");

		cy.get("@change")
			.should("have.been.calledOnce");
	});

	it("should not fire 'change' when previous value is restored with 'Escape'", () => {
		cy.mount(
			<NumericInput></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputAttachHandler("ui5-change", "change");

		cy.get<NumericInput>("@numberInput")
			.realClick();

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputChangeValueWithArrowKeys(1);

		cy.realPress("Escape");

		cy.get<NumericInput>("@numberInput")
			.should("have.prop", "value", 0);

		cy.get("@change")
			.should("not.have.been.called");
	});

	it("should fire 'change' after focus out", () => {
		cy.mount(
			<NumericInput></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputAttachHandler("ui5-change", "change");

		cy.get<NumericInput>("@numberInput")
			.realClick();

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputChangeValueWithArrowKeys(1);

		cy.realPress("Tab");

		cy.get("@change")
			.should("have.been.calledOnce");

		cy.get<NumericInput>("@numberInput")
			.should("have.prop", "value", 1);
	});

	it("should fire 'change' when 'Enter' is pressed after manual input", () => {
		cy.mount(
			<NumericInput></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputAttachHandler("ui5-change", "change");

		cy.get<NumericInput>("@numberInput")
			.realClick({ "clickCount": 2 })
			.should("be.focused");

		cy.realType("23");

		cy.get("@change")
			.should("not.have.been.called");

		cy.realPress("Enter");

		cy.get<NumericInput>("@numberInput")
			.should("have.prop", "value", 23);

		cy.get("@change")
			.should("have.been.calledOnce");
	});

	it("should fire 'change' after focusing out of input", () => {
		cy.mount(
			<NumericInput value={10}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputAttachHandler("ui5-change", "change");

		cy.get<NumericInput>("@numberInput")
			.realClick({ "clickCount": 2 })
			.should("be.focused");

		cy.realType("23");

		cy.get("@change")
			.should("not.have.been.called");

		cy.realPress("Tab");

		cy.get<NumericInput>("@numberInput")
			.should("have.prop", "value", 23);

		cy.get("@change")
			.should("have.been.calledOnce");
	});

	it("should fire 'change' after input is deleted and focused out", () => {
		cy.mount(
			<NumericInput value={10}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputAttachHandler("ui5-change", "change");

		cy.get<NumericInput>("@numberInput")
			.realClick({ "clickCount": 2 })
			.should("be.focused");

		cy.realPress("Backspace");

		cy.get("@change")
			.should("not.have.been.called");

		cy.realPress("Tab");

		cy.get<NumericInput>("@numberInput")
			.should("have.prop", "value", 0);

		cy.get("@change")
			.should("have.been.calledOnce");
	});

	it("should fire 'change' after value property is programmatically set and then changed with arrow keys", () => {
		cy.mount(
			<NumericInput value={5}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputAttachHandler("ui5-change", "change");

		cy.get<NumericInput>("@numberInput")
			.invoke("prop", "value", 4);

		cy.get("@change")
			.should("not.have.been.called");

		cy.get<NumericInput>("@numberInput")
			.realClick()
			.should("be.focused");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputChangeValueWithArrowKeys(5);

		cy.realPress("Enter");

		cy.get("@change")
			.should("have.been.calledOnce");
	});
});

describe("NumericInput thousand separator formatting", () => {
	it("should display value with thousand separator", () => {
		cy.mount(
			<NumericInput value={12345}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.ui5NumericInputGetInnerInput()
			.should($input => {
				const val = $input.val();
				// Accepts both comma and dot as separator depending on locale
				expect(val).to.match(/12[,.]345/);
			});
	});

	it("should parse formatted value correctly", () => {
		cy.mount(
			<NumericInput value={12345}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputGetInnerInput()
			.should($input => {
				const val = $input.val() as string;
				const num = Number(val.replace(/[^\d]/g, ""));
				expect(num).to.equal(12345);
			});

		cy.get<NumericInput>("@numberInput")
			.realClick({ "clickCount": 2 })
			.should("be.focused");

		cy.realType("1,0000");
		cy.realPress("Enter");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputGetInnerInput()
			.should($input => {
				const val = $input.val() as string;
				expect(val).to.equal("10,000");
			});

		cy.get<NumericInput>("@numberInput")
			.should("have.prop", "value", 10000);
	});

	it("should update input value when language is changed", () => {
		cy.wrap({ setLanguage })
			.then(async ({ setLanguage }) => {
				await setLanguage("en");
			});

		cy.mount(
			<NumericInput value={10000.56} valuePrecision={2}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputGetInnerInput()
			.should($input => {
				const val = $input.val() as string;
				expect(val).to.equal("10,000.56");
			});

		cy.wrap({ setLanguage })
			.then(async ({ setLanguage }) => {
				await setLanguage("de");
			})
			.then(() => {
				cy.get<NumericInput>("@numberInput")
					.ui5NumericInputGetInnerInput()
					.should($input => {
						const val = $input.val() as string;
						expect(val).to.equal("10.000,56");
					});
			});

		cy.wrap({ setLanguage })
			.then(async ({ setLanguage }) => {
				await setLanguage("en");
			});
	});
});

describe("NumericInput property propagation", () => {
	it("should propagate 'placeholder' property to inner input", () => {
		cy.mount(
			<NumericInput placeholder="Enter number"></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.ui5NumericInputCheckInnerInputProperty("placeholder", "Enter number");
	});

	it("should not propagate 'min' property to inner input", () => {
		cy.mount(
			<NumericInput min={0}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.ui5NumericInputCheckInnerInputProperty("min", "0", false);
	});

	it("should not propagate 'max' property to inner input", () => {
		cy.mount(
			<NumericInput max={10}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.ui5NumericInputCheckInnerInputProperty("max", "10", false);
	});

	it("should not propagate 'step' property to inner input", () => {
		cy.mount(
			<NumericInput step={2}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.ui5NumericInputCheckInnerInputProperty("step", "2", false);
	});

	it("should propagate 'disabled' property to inner input", () => {
		cy.mount(
			<NumericInput disabled></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.ui5NumericInputCheckInnerInputProperty("disabled", true);
	});

	it("should propagate 'readonly' property to inner input", () => {
		cy.mount(
			<NumericInput readonly></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.ui5NumericInputCheckInnerInputProperty("readonly", true);
	});

	it("should propagate 'value' property to inner input", () => {
		cy.mount(
			<NumericInput value={5}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.ui5NumericInputCheckInnerInputProperty("value", "5");
	});

	it("should increase value on mouse wheel up", () => {
		cy.mount(
			<NumericInput value={5} step={2}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputScrollToChangeValue(7, false);
	});

	it("should decrease value on mouse wheel down", () => {
		cy.mount(
			<NumericInput value={5} step={2}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputScrollToChangeValue(3, true);
	});

	it("should not change value when readonly", () => {
		cy.mount(
			<NumericInput value={5} step={2} readonly={true}></NumericInput>
		);

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputScrollToChangeValue(5, true);
	});
});

describe("Validation inside form", () => {
	it("has correct validity for patternMissmatch", () => {
		cy.mount(
			<form>
				<NumericInput id="numberInput" valuePrecision={3}></NumericInput>
				<button type="submit" id="submitBtn">Submits forms</button>
			</form>
		);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", (e) => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputTypeNumber(2.34);

		cy.get("#submitBtn")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("@numberInput")
			.ui5AssertValidityState({
				formValidity: { patternMismatch: true },
				validity: { patternMismatch: true, valid: false },
				checkValidity: false,
				reportValidity: false
			});

		cy.get("#numberInput:invalid")
			.should("exist", "NumericInput without formatted value should have :invalid CSS class");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputTypeNumber(2.345);

		cy.get("@numberInput")
			.ui5AssertValidityState({
				formValidity: { patternMismatch: false },
				validity: { patternMismatch: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#numberInput:invalid")
			.should("not.exist", "NumericInput with formatted value should not have :invalid CSS class");
	});

	it("has correct validity for rangeUnderflow", () => {
		cy.mount(
			<form>
				<NumericInput id="numberInput" min={3}></NumericInput>
				<button type="submit" id="submitBtn">Submits forms</button>
			</form>
		);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", (e) => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputTypeNumber(2);

		cy.get("#submitBtn")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("@numberInput")
			.ui5AssertValidityState({
				formValidity: { rangeUnderflow: true },
				validity: { rangeUnderflow: true, valid: false },
				checkValidity: false,
				reportValidity: false
			});

		cy.get("#numberInput:invalid")
			.should("exist", "NumericInput with value lower than min should have :invalid CSS class");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputTypeNumber(4);

		cy.get("@numberInput")
			.ui5AssertValidityState({
				formValidity: { rangeUnderflow: false },
				validity: { rangeUnderflow: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#numberInput:invalid")
			.should("not.exist", "NumericInput with value higher than min should not have :invalid CSS class");
	});

	it("has correct validity for rangeOverflow", () => {
		cy.mount(
			<form>
				<NumericInput id="numberInput" max={3}></NumericInput>
				<button type="submit" id="submitBtn">Submits forms</button>
			</form>
		);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", (e) => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("[ui5-numeric-input]")
			.as("numberInput");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputTypeNumber(4);

		cy.get("#submitBtn")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("@numberInput")
			.ui5AssertValidityState({
				formValidity: { rangeOverflow: true },
				validity: { rangeOverflow: true, valid: false },
				checkValidity: false,
				reportValidity: false
			});

		cy.get("#numberInput:invalid")
			.should("exist", "NumericInput with value above max should have :invalid CSS class");

		cy.get<NumericInput>("@numberInput")
			.ui5NumericInputTypeNumber(2);

		cy.get("@numberInput")
			.ui5AssertValidityState({
				formValidity: { rangeOverflow: false },
				validity: { rangeOverflow: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#numberInput:invalid")
			.should("not.exist", "NumericInput with value lower than max should not have :invalid CSS class");
	});
});

describe("Accessibility", () => {
	it("should have correct aria-label when associated with a label via 'for' attribute", () => {
		const labelText = "Quantity";

		cy.mount(
			<>
				<Label for="numberInput">{labelText}</Label>
				<NumericInput id="numberInput"></NumericInput>
			</>
		);

		cy.get("[ui5-numeric-input]")
			.shadow()
			.find("[ui5-input]")
			.shadow()
			.find("input")
			.should("have.attr", "aria-label", labelText);
	});
});
