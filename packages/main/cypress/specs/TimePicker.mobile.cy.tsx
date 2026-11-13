import TimePicker from "../../src/TimePicker.js";
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import ResponsivePopover from "../../src/ResponsivePopover.js";

describe("TimePicker on phone - general interactions", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");

		// Set the language to Bulgarian for the tests
		cy.wrap({ setLanguage })
		.then(api => {
			return api.setLanguage("bg")
		})
	});

	it("opening of popover with numeric inputs", () => {
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

	it.skip("direct number typing", () => {
		cy.mount(<TimePicker value-format="hh:mm:ss a"></TimePicker>);

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
describe.skip("TimePicker on phone - accessibility and other input attributes", () => {
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

describe("TimePicker on phone - view toggle button", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("toggle button is visible in picker header on phone", () => {
		cy.mount(<TimePicker></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find("[id$='-mode-toggle']")
			.should("exist")
			.and("be.visible");
	});

	it("picker opens in clock view by default when opened via icon", () => {
		cy.mount(<TimePicker></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerAssertClocksView();
	});

	it("clicking toggle button switches from clock view to inputs view", () => {
		cy.mount(<TimePicker></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find("[id$='-mode-toggle']")
			.should("have.attr", "icon", "keyboard-and-mouse")
			.realClick();

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerAssertInputsView();

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find("[id$='-mode-toggle']")
			.should("have.attr", "icon", "time-entry-request");
	});

	it("clicking toggle button again switches back to clock view", () => {
		cy.mount(<TimePicker></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find("[id$='-mode-toggle']")
			.realClick();

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find("[id$='-mode-toggle']")
			.realClick();

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerAssertClocksView();
	});

	it("clicking input field on phone opens picker directly in inputs view", () => {
		cy.mount(<TimePicker></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.shadow()
			.find("input")
			.realClick();

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerAssertInputsView();
	});
});

describe("TimePicker on desktop - no view toggle", () => {
	it("toggle button is not rendered on desktop", () => {
		cy.mount(<TimePicker></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find("[id$='-mode-toggle']")
			.should("not.exist");
	});
});