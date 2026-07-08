import NumberInput from "../../src/NumberInput.js";
import Label from "../../src/Label.js";
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import "../../src/Assets.js";

const decreaseValue = true;

describe("NumberInput keyboard interaction tests", () => {
	it("should increase the value with 'ArrowUp' only if it is less than 'max'", () => {
		cy.mount(
			<NumberInput max={5} value={4}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.realClick();

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputChangeValueWithArrowKeys(5);

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputChangeValueWithArrowKeys(5);
	});

	it("should decrease the value with 'ArrowDown' only if it is more than 'min'", () => {
		cy.mount(
			<NumberInput min={5} value={6}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.realClick();

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputChangeValueWithArrowKeys(5, decreaseValue);

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputChangeValueWithArrowKeys(5, decreaseValue);
	});

	it("should set the value to the 'max' with 'Shift+PageUp'", () => {
		cy.mount(
			<NumberInput max={5}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.realClick()
			.should("be.focused");

		cy.realPress(['Shift', 'PageUp']);

		cy.get<NumberInput>("@numberInput")
			.should("have.prop", "value", 5);
	});

	it("should set the value to the 'min' with 'Shift+PageDown'", () => {
		cy.mount(
			<NumberInput min={0} value={5}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.realClick()
			.should("be.focused");

		cy.realPress(['Shift', 'PageDown']);

		cy.get<NumberInput>("@numberInput")
			.should("have.prop", "value", 0);
	});

	it("should set the value to the 'max' with 'Ctrl+Shift+ArrowUp'", () => {
		cy.mount(
			<NumberInput max={5}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.realClick()
			.should("be.focused");

		cy.realPress(['Control', 'Shift', 'ArrowUp']);

		cy.get<NumberInput>("@numberInput")
			.should("have.prop", "value", 5);
	});

	it("should set the value to the 'min' with 'Ctrl+Shift+ArrowDown'", () => {
		cy.mount(
			<NumberInput min={0} value={5}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.realClick()
			.should("be.focused");

		cy.realPress(['Control', 'Shift', 'ArrowDown']);

		cy.get<NumberInput>("@numberInput")
			.should("have.prop", "value", 0);
	});

	it("should restore the previous value with 'Escape'", () => {
		cy.mount(
			<NumberInput value={5}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.realClick();

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputChangeValueWithArrowKeys(6);

		cy.realPress("Escape");

		cy.get<NumberInput>("@numberInput")
			.should("have.prop", "value", 5);
	});

	it("should update the value when typed in input", () => {
		cy.mount(
			<NumberInput></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.realClick({ "clickCount": 2 })
			.should("be.focused");

		cy.realType("23");
		cy.realPress("Enter");

		cy.get<NumberInput>("@numberInput")
			.should("have.prop", "value", 23);
	});

	it("should reset the value to 0 if input is deleted", () => {
		cy.mount(
			<NumberInput value={10}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.realClick({ "clickCount": 2 })
			.should("be.focused");

		cy.realPress("Backspace");
		cy.realPress("Enter");

		cy.get<NumberInput>("@numberInput")
			.should("have.prop", "value", 0);
	});
});

describe("NumberInput misc interaction tests", () => {
	it("should not round value when 'valuePrecision' is set", () => {
		cy.mount(
			<NumberInput value={29.999} valuePrecision={3}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.realClick()
			.should("be.focused");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputChangeValueWithArrowKeys(30.999);
	});

	it("should round value when 'valuePrecision' is set to default", () => {
		cy.mount(
			<NumberInput value={29.999}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.realClick()
			.should("be.focused");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputChangeValueWithArrowKeys(31);
	});

	it("should set 'valueState' to 'Negative' when the value is not compliant", () => {
		cy.mount(
			<NumberInput></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.realClick({ "clickCount": 2 })
			.should("be.focused");

		cy.realType("23.034");

		cy.realPress("Enter");

		cy.get<NumberInput>("@numberInput")
			.should("have.prop", "valueState", "Negative");
	});
});

describe("NumberInput events", () => {
	it("should not change value state when 'value-state-change' event is prevented", () => {
		const valueState = "Positive";

		cy.mount(
			<NumberInput valueState={valueState}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.then($input => {
				$input.get(0).addEventListener("value-state-change", e => {
					e.preventDefault();
				});
			});

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputAttachHandler("value-state-change", "stateChange");

		cy.get<NumberInput>("@numberInput")
			.realClick();

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputChangeValueWithArrowKeys(1);

		cy.get("@stateChange")
			.should("have.been.calledOnce");

		cy.get<NumberInput>("@numberInput")
			.should("have.prop", "valueState", valueState);
	});

	it("should prevent input event", () => {
		cy.mount(
			<NumberInput></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.then($input => {
				$input.get(0).addEventListener("input", e => {
					e.preventDefault();
					(e.target as NumberInput).value = 30;
				});
			});

		cy.get<NumberInput>("@numberInput")
			.realClick()
			.should("be.focused");

		cy.realPress("1");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputCheckInnerInputProperty("value", "30");
	});

	it("should not fire 'change' when navigating with 'ArrowUp'/'ArrowDown' keys", () => {
		cy.mount(
			<NumberInput></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputAttachHandler("ui5-change", "change");

		cy.get<NumberInput>("@numberInput")
			.realClick();

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputChangeValueWithArrowKeys(1);

		cy.get("@change")
			.should("have.not.been.called");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputChangeValueWithArrowKeys(0, decreaseValue);

		cy.get("@change")
			.should("have.not.been.called");
	});

	it("should fire 'change' after 'Enter' is pressed", () => {
		cy.mount(
			<NumberInput></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputAttachHandler("ui5-change", "change");

		cy.get<NumberInput>("@numberInput")
			.realClick();

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputChangeValueWithArrowKeys(1);

		cy.realPress("Enter");

		cy.get("@change")
			.should("have.been.calledOnce");
	});

	it("should not fire 'change' when previous value is restored with 'Escape'", () => {
		cy.mount(
			<NumberInput></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputAttachHandler("ui5-change", "change");

		cy.get<NumberInput>("@numberInput")
			.realClick();

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputChangeValueWithArrowKeys(1);

		cy.realPress("Escape");

		cy.get<NumberInput>("@numberInput")
			.should("have.prop", "value", 0);

		cy.get("@change")
			.should("not.have.been.called");
	});

	it("should fire 'change' after focus out", () => {
		cy.mount(
			<NumberInput></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputAttachHandler("ui5-change", "change");

		cy.get<NumberInput>("@numberInput")
			.realClick();

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputChangeValueWithArrowKeys(1);

		cy.realPress("Tab");

		cy.get("@change")
			.should("have.been.calledOnce");

		cy.get<NumberInput>("@numberInput")
			.should("have.prop", "value", 1);
	});

	it("should fire 'change' when 'Enter' is pressed after manual input", () => {
		cy.mount(
			<NumberInput></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputAttachHandler("ui5-change", "change");

		cy.get<NumberInput>("@numberInput")
			.realClick({ "clickCount": 2 })
			.should("be.focused");

		cy.realType("23");

		cy.get("@change")
			.should("not.have.been.called");

		cy.realPress("Enter");

		cy.get<NumberInput>("@numberInput")
			.should("have.prop", "value", 23);

		cy.get("@change")
			.should("have.been.calledOnce");
	});

	it("should fire 'change' after focusing out of input", () => {
		cy.mount(
			<NumberInput value={10}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputAttachHandler("ui5-change", "change");

		cy.get<NumberInput>("@numberInput")
			.realClick({ "clickCount": 2 })
			.should("be.focused");

		cy.realType("23");

		cy.get("@change")
			.should("not.have.been.called");

		cy.realPress("Tab");

		cy.get<NumberInput>("@numberInput")
			.should("have.prop", "value", 23);

		cy.get("@change")
			.should("have.been.calledOnce");
	});

	it("should fire 'change' after input is deleted and focused out", () => {
		cy.mount(
			<NumberInput value={10}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputAttachHandler("ui5-change", "change");

		cy.get<NumberInput>("@numberInput")
			.realClick({ "clickCount": 2 })
			.should("be.focused");

		cy.realPress("Backspace");

		cy.get("@change")
			.should("not.have.been.called");

		cy.realPress("Tab");

		cy.get<NumberInput>("@numberInput")
			.should("have.prop", "value", 0);

		cy.get("@change")
			.should("have.been.calledOnce");
	});

	it("should fire 'change' after value property is programmatically set and then changed with arrow keys", () => {
		cy.mount(
			<NumberInput value={5}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputAttachHandler("ui5-change", "change");

		cy.get<NumberInput>("@numberInput")
			.invoke("prop", "value", 4);

		cy.get("@change")
			.should("not.have.been.called");

		cy.get<NumberInput>("@numberInput")
			.realClick()
			.should("be.focused");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputChangeValueWithArrowKeys(5);

		cy.realPress("Enter");

		cy.get("@change")
			.should("have.been.calledOnce");
	});
});

describe("NumberInput thousand separator formatting", () => {
	it("should display value with thousand separator", () => {
		cy.mount(
			<NumberInput value={12345}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.ui5NumberInputGetInnerInput()
			.should($input => {
				const val = $input.val();
				// Accepts both comma and dot as separator depending on locale
				expect(val).to.match(/12[,.]345/);
			});
	});

	it("should parse formatted value correctly", () => {
		cy.mount(
			<NumberInput value={12345}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputGetInnerInput()
			.should($input => {
				const val = $input.val() as string;
				const num = Number(val.replace(/[^\d]/g, ""));
				expect(num).to.equal(12345);
			});

		cy.get<NumberInput>("@numberInput")
			.realClick({ "clickCount": 2 })
			.should("be.focused");

		cy.realType("1,0000");
		cy.realPress("Enter");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputGetInnerInput()
			.should($input => {
				const val = $input.val() as string;
				expect(val).to.equal("10,000");
			});

		cy.get<NumberInput>("@numberInput")
			.should("have.prop", "value", 10000);
	});

	it("should update input value when language is changed", () => {
		cy.wrap({ setLanguage })
			.then(async ({ setLanguage }) => {
				await setLanguage("en");
			});

		cy.mount(
			<NumberInput value={10000.56} valuePrecision={2}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputGetInnerInput()
			.should($input => {
				const val = $input.val() as string;
				expect(val).to.equal("10,000.56");
			});

		cy.wrap({ setLanguage })
			.then(async ({ setLanguage }) => {
				await setLanguage("de");
			})
			.then(() => {
				cy.get<NumberInput>("@numberInput")
					.ui5NumberInputGetInnerInput()
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

describe("NumberInput property propagation", () => {
	it("should propagate 'placeholder' property to inner input", () => {
		cy.mount(
			<NumberInput placeholder="Enter number"></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.ui5NumberInputCheckInnerInputProperty("placeholder", "Enter number");
	});

	it("should not propagate 'min' property to inner input", () => {
		cy.mount(
			<NumberInput min={0}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.ui5NumberInputCheckInnerInputProperty("min", "0", false);
	});

	it("should not propagate 'max' property to inner input", () => {
		cy.mount(
			<NumberInput max={10}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.ui5NumberInputCheckInnerInputProperty("max", "10", false);
	});

	it("should not propagate 'step' property to inner input", () => {
		cy.mount(
			<NumberInput step={2}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.ui5NumberInputCheckInnerInputProperty("step", "2", false);
	});

	it("should propagate 'disabled' property to inner input", () => {
		cy.mount(
			<NumberInput disabled></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.ui5NumberInputCheckInnerInputProperty("disabled", true);
	});

	it("should propagate 'readonly' property to inner input", () => {
		cy.mount(
			<NumberInput readonly></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.ui5NumberInputCheckInnerInputProperty("readonly", true);
	});

	it("should propagate 'value' property to inner input", () => {
		cy.mount(
			<NumberInput value={5}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.ui5NumberInputCheckInnerInputProperty("value", "5");
	});

	it("should increase value on mouse wheel up", () => {
		cy.mount(
			<NumberInput value={5} step={2}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputScrollToChangeValue(7, false);
	});

	it("should decrease value on mouse wheel down", () => {
		cy.mount(
			<NumberInput value={5} step={2}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputScrollToChangeValue(3, true);
	});

	it("should not change value when readonly", () => {
		cy.mount(
			<NumberInput value={5} step={2} readonly={true}></NumberInput>
		);

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputScrollToChangeValue(5, true);
	});
});

describe("Validation inside form", () => {
	it("has correct validity for patternMissmatch", () => {
		cy.mount(
			<form>
				<NumberInput id="numberInput" valuePrecision={3}></NumberInput>
				<button type="submit" id="submitBtn">Submits forms</button>
			</form>
		);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", (e) => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputTypeNumber(2.34);

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
			.should("exist", "NumberInput without formatted value should have :invalid CSS class");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputTypeNumber(2.345);

		cy.get("@numberInput")
			.ui5AssertValidityState({
				formValidity: { patternMismatch: false },
				validity: { patternMismatch: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#numberInput:invalid")
			.should("not.exist", "NumberInput with formatted value should not have :invalid CSS class");
	});

	it("has correct validity for rangeUnderflow", () => {
		cy.mount(
			<form>
				<NumberInput id="numberInput" min={3}></NumberInput>
				<button type="submit" id="submitBtn">Submits forms</button>
			</form>
		);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", (e) => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputTypeNumber(2);

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
			.should("exist", "NumberInput with value lower than min should have :invalid CSS class");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputTypeNumber(4);

		cy.get("@numberInput")
			.ui5AssertValidityState({
				formValidity: { rangeUnderflow: false },
				validity: { rangeUnderflow: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#numberInput:invalid")
			.should("not.exist", "NumberInput with value higher than min should not have :invalid CSS class");
	});

	it("has correct validity for rangeOverflow", () => {
		cy.mount(
			<form>
				<NumberInput id="numberInput" max={3}></NumberInput>
				<button type="submit" id="submitBtn">Submits forms</button>
			</form>
		);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", (e) => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("[ui5-number-input]")
			.as("numberInput");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputTypeNumber(4);

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
			.should("exist", "NumberInput with value above max should have :invalid CSS class");

		cy.get<NumberInput>("@numberInput")
			.ui5NumberInputTypeNumber(2);

		cy.get("@numberInput")
			.ui5AssertValidityState({
				formValidity: { rangeOverflow: false },
				validity: { rangeOverflow: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#numberInput:invalid")
			.should("not.exist", "NumberInput with value lower than max should not have :invalid CSS class");
	});
});

describe("Accessibility", () => {
	it("should have correct aria-label when associated with a label via 'for' attribute", () => {
		const labelText = "Quantity";

		cy.mount(
			<>
				<Label for="numberInput">{labelText}</Label>
				<NumberInput id="numberInput"></NumberInput>
			</>
		);

		cy.get("[ui5-number-input]")
			.shadow()
			.find("[ui5-input]")
			.shadow()
			.find("input")
			.should("have.attr", "aria-label", labelText);
	});
});
