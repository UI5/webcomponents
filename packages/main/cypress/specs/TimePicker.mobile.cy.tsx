import TimePicker from "../../src/TimePicker.js";
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";

describe("TimePicker on phone - general interactions", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");

		// Set the language to Bulgarian for the tests
		cy.wrap({ setLanguage })
		.then(api => {
			return api.setLanguage("bg")
		})
	});

	it.skip("opening of popover with numeric inputs", () => {
		cy.mount(<TimePicker format-pattern="HH:mm:ss" value="11:12:13"></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetClock("hours")
			.should("have.prop", "valueNow", 11);

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetClock("minutes")
			.should("have.prop", "valueNow", 12);

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetClock("seconds")
			.should("have.prop", "valueNow", 13);
	});

	it("value change with numeric inputs on OK and Cancel button press", () => {
		cy.mount(<TimePicker format-pattern="hh:mm:ss a" value="10:20:30 AM"></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.ui5TimePickerGetInnerInput()
			.should("have.value", "10:20:30 AM");

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find("[ui5-responsive-popover]")
			.find("[ui5-time-selection-clocks]")
			.shadow()
			.find("[ui5-segmented-button-item]")
			.last()
			.realClick()
			.should("be.focused");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetClock("hours")
			.should("have.prop", "valueNow", 10);

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetClock("minutes")
			.should("have.prop", "valueNow", 20);

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetClock("seconds")
			.should("have.prop", "valueNow", 30);

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetSubmitButton()
			.realClick();

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.should("have.value", "10:20:30 PM");
	});

	it("direct number typing", () => {
		cy.mount(<TimePicker></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick();

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInputsMobile()
			.first()
			.should("be.focused");

		cy.realType("082413")

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find("[ui5-popover]")
			.find("[ui5-time-selection-inputs]")
			.shadow()
			.find("[ui5-segmented-button-item]")
			.last()
			.realClick()
			.should("be.focused");

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find("[ui5-popover]")
			.find("#submitInputs")
			.realClick();

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.should("have.value", "8:24:13 PM");

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetClock("hours")
			.should("have.prop", "valueNow", 8);

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetClock("minutes")
			.should("have.prop", "valueNow", 24);

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetClock("seconds")
			.should("have.prop", "valueNow", 13);

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find("[ui5-responsive-popover]")
			.find("[ui5-time-selection-clocks]")
			.shadow()
			.find("[ui5-toggle-spin-button]")
			.first()
			.realClick()
			.should("be.focused");

		cy.realType("092233");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetSubmitButton()
			.realClick();

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.should("have.value", "9:22:33 PM");
 	});
});
describe("TimePicker on phone - accessibility and other input attributes", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");

		// Set the language to Bulgarian for the tests
		cy.wrap({ setLanguage })
		.then(api => {
			return api.setLanguage("bg")
		})
	});

	it("accessibility attributes of numeric inputs", () => {
		cy.mount(<TimePicker></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick();

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInputsMobile()
			.as("inputs")
			.should("have.length", 3);

		cy.get<TimePicker>("@inputs")
			.first()
			.shadow()
			.find("input")
			.should("have.attr", "step", "1")
			.and("have.attr", "min", "1")
			.and("have.attr", "max", "12")
			.and("have.attr", "aria-label", "Please enter hours");

		cy.get<TimePicker>("@inputs")
			.eq(1)
			.shadow()
			.find("input")
			.should("have.attr", "step", "1")
			.and("have.attr", "min", "0")
			.and("have.attr", "max", "59")
			.and("have.attr", "aria-label", "Please enter minutes");

		cy.get<TimePicker>("@inputs")
			.last()
			.shadow()
			.find("input")
			.should("have.attr", "step", "1")
			.and("have.attr", "min", "0")
			.and("have.attr", "max", "59")
			.and("have.attr", "aria-label", "Please enter seconds");
 	});

	it("other important attributes of numeric inputs", () => {
		cy.mount(<TimePicker></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick();

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInputsMobile()
			.as("inputs")
			.should("have.length", 3);

		cy.get<TimePicker>("@inputs")
			.first()
			.shadow()
			.find("input")
			.should("have.attr", "type", "number")
			.and("have.attr", "autocomplete", "off")
			.and("have.attr", "pattern", "[0-9]*")
			.and("have.attr", "inputmode", "numeric");

		cy.get<TimePicker>("@inputs")
			.eq(1)
			.shadow()
			.find("input")
			.should("have.attr", "type", "number")
			.and("have.attr", "autocomplete", "off")
			.and("have.attr", "pattern", "[0-9]*")
			.and("have.attr", "inputmode", "numeric");

		cy.get<TimePicker>("@inputs")
			.last()
			.shadow()
			.find("input")
			.should("have.attr", "type", "number")
			.and("have.attr", "autocomplete", "off")
			.and("have.attr", "pattern", "[0-9]*")
			.and("have.attr", "inputmode", "numeric");
 	});
});