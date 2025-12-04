import "../../src/Assets.js";
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import TimePicker from "../../src/TimePicker.js";
import Label from "../../src/Label.js";
import ResponsivePopover from "../../src/ResponsivePopover.js";

function pressKeyNTimes(key: "ArrowDown" | "ArrowUp" | "Space" | "Tab" | "Enter", n: number) {
	for (let i = 0; i < n; i++) {
		cy.realPress(key);
	}
}

describe("TimePicker Tests", () => {
	it("input receives value in format pattern depending on the set language", () => {
		cy.wrap({ setLanguage })
		.then(api => {
			return api.setLanguage("bg")
		})

		cy.mount(<TimePicker value="03:16:16"></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.should("have.value", "3:16:16 ч.");

		cy.wrap({ setLanguage })
			.then(api => {
				return api.setLanguage("en");
			});
	});

	it("tests clocks value", () => {
		cy.mount(<TimePicker formatPattern="HH:mm:ss" value="11:12:13"></TimePicker>);

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

	it("tests clocks submit value", () => {
		cy.mount(<TimePicker formatPattern="hh:mm:ss" value="12:00:01"></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetClock("hours")
			.realClick()
			.should("be.focused")


		pressKeyNTimes("ArrowDown", 2);
		cy.realPress("Space");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetClock("minutes");

		pressKeyNTimes("ArrowDown", 5);
		pressKeyNTimes("ArrowUp", 2);

		cy.realPress("Space");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetClock("seconds");

		pressKeyNTimes("ArrowUp", 4);

		cy.realPress("Tab");
		cy.realPress("Enter");

		cy.get<TimePicker>("@timePicker")
			.should("have.value", "10:57:05");
	});

	it("tests submit wrong value", () => {
		cy.mount(<TimePicker></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick()
			.should("be.focused");

		cy.realType("123123123");
		cy.realPress("Enter");

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.should("have.attr", "value-state", "Negative");
	});

	it("tests change event", () => {
		cy.mount(<TimePicker formatPattern="HH:mm" value="12:00" onChange={cy.stub().as("changeStub")}></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker");

		// Open picker and submit without changes
		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetSubmitButton()
			.realClick();

		// Assert no change event was fired
		cy.get("@changeStub").should("not.have.been.called");

		// Open picker, change time and submit
		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetClock("hours")
			.realClick()
			.should("be.focused")

		cy.realPress("PageDown");

		pressKeyNTimes("ArrowDown", 2);
		cy.realPress("Space");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetSubmitButton()
			.realClick();

		// Assert change event was fired once
		cy.get("@changeStub").should("have.been.calledOnce");

		// Open picker and submit without changes
		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetSubmitButton()
			.realClick();

		// Assert change event was not fired again
		cy.get("@changeStub").should("have.been.calledOnce");

		// Open picker, change time and submit
		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetClock("hours")
			.realClick()
			.should("be.focused")
			.realPress("ArrowDown") // select 00
			.realPress("Space");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetSubmitButton()
			.realClick();

		// Assert change event was fired again
		cy.get("@changeStub").should("have.been.calledTwice");

		// Test direct input change
		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress("Backspace")
			.realType("7")
			.realPress("Enter");

		// Assert change event was fired again
		cy.get("@changeStub").should("have.been.calledThrice");
	});

	it("tests value state", () => {
		cy.mount(<TimePicker></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick();

		// Clear the input
		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick({ clickCount: 2 })
			.realPress("Backspace");

		cy.get("body").realClick(); // Click outside to trigger blur

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.should("have.attr", "value-state", "None");
	});

	it("tests input keyboard handling", () => {
		cy.mount(<TimePicker formatPattern="hh:mm:ss" value="02:40:05"></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress(["Shift", "PageUp"]);

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.should("have.value", "02:41:05");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress(["Shift", "PageDown"]);

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.should("have.value", "02:40:05");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress("PageUp");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.should("have.value", "03:40:05");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress("PageDown");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.should("have.value", "02:40:05");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress(["Shift", "Control", "PageUp"]);

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.should("have.value", "02:40:06");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress(["Shift", "Control", "PageDown"]);

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.should("have.value", "02:40:05");
	});

	it("test closing the picker with the keyboard", () => {
		cy.mount(<TimePicker></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.realPress(["Alt", "ArrowUp"]);

		cy.get<TimePicker>("@timePicker")
			.should("not.have.attr", "open");
	});

	it("the value 'now' returns the current time, instead of the string 'now'", () => {
		cy.mount(<TimePicker></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realType("now")
			.realPress("Enter");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerGetInnerInput()
			.should("not.have.value", "now");
	});

	it("opening time picker's value-help, sets the 'open' property to true", () => {
		cy.mount(<TimePicker></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get<TimePicker>("@timePicker")
			.should("have.attr", "open");
	});

	it("setting time picker's open property to true, opens the value-help", () => {
		cy.mount(<TimePicker></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker");

		cy.get<TimePicker>("@timePicker")
			.invoke("prop", "open", true);

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened()
	});

	it("displays value state message header in popover when value state is set", () => {
		cy.mount(<TimePicker valueState="Negative"></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.find(".ui5-valuestatemessage-header")
			.should("exist")
			.and("have.class", "ui5-valuestatemessage--error");
	});
});

describe("Accessibility", () => {
	it("picker popover accessible name", () => {
		const LABEL = "Deadline";
		cy.mount(<TimePicker accessible-name={LABEL}></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress("F4");

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("have.attr", "accessible-name", `Choose Time for ${LABEL}`);
	});

	it("picker popover accessible name with external label", () => {
		const LABEL = "Deadline";
		cy.mount(<>
			<Label for="timePicker">{LABEL}</Label>
			<TimePicker id="timePicker"></TimePicker>
		</>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress("F4");

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("have.attr", "accessible-name", `Choose Time for ${LABEL}`);
	});

	it("accessibleDescription property", () => {
		const DESCRIPTION = "Some description";
		cy.mount(<TimePicker accessibleDescription={DESCRIPTION}></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.ui5TimePickerGetInnerInput()
			.should("have.attr", "aria-describedby", "descr");

		cy.get<TimePicker>("[ui5-time-picker]")
			.shadow()
			.find("[ui5-datetime-input]")
			.shadow()
			.find("span#descr")
			.should("have.text", DESCRIPTION);
	});

	it("accessibleDescriptionRef property", () => {
		const DESCRIPTION = "External description";
		cy.mount(
			<>
				<p id="descr">{DESCRIPTION}</p>
				<TimePicker accessibleDescriptionRef="descr"></TimePicker>
			</>
		);

		cy.get<TimePicker>("[ui5-time-picker]")
			.ui5TimePickerGetInnerInput()
			.should("have.attr", "aria-describedby")
			.and("contain", "descr");

		cy.get("#descr").should("have.text", DESCRIPTION);
	});

	it("input should have accessible name", () => {
		cy.mount(
			<>
				<Label id="timeLabel">Pick a time</Label>
				<TimePicker accessibleNameRef="timeLabel"></TimePicker>
			</>
		);

		cy.get<TimePicker>("[ui5-time-picker]")
			.ui5TimePickerGetInnerInput()
			.should("have.attr", "aria-label", "Pick a time");
	});

	it("should apply aria-label from the accessibleName property", () => {
		cy.mount(<TimePicker accessibleName="Pick a time"></TimePicker>);

		cy.get<TimePicker>("[ui5-time-picker]")
			.ui5TimePickerGetInnerInput()
			.should("have.attr", "aria-label", "Pick a time");
	});
});

describe("Validation inside a form", () => {
	it("has correct validity for valueMissing", () => {
		cy.mount(<form method="get">
			<TimePicker id="timePicker" required={true}></TimePicker>
			<button type="submit" id="submitBtn">Submits forms</button>
		</form>);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("#submitBtn")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("#timePicker")
			.ui5AssertValidityState({
				formValidity: { valueMissing: true },
				validity: { valueMissing: true, valid: false },
				checkValidity: false,
				reportValidity: false
			});

		cy.get("#timePicker:invalid")
			.should("exist", "Required timepicker without value should have :invalid CSS class");

		cy.get<TimePicker>("[ui5-time-picker]")
			.ui5TimePickerTypeTime("now")

		cy.get("@timePicker")
			.ui5AssertValidityState({
				formValidity: { valueMissing: false },
				validity: { valueMissing: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#timePicker:invalid").should("not.exist", "Required TimePicker with value should not have :invalid CSS class");
	});

	it("has correct validity for patternMismatch", () => {
		cy.mount(
			<form>
				<TimePicker id="timePicker" required format-pattern="HH:mm:ss"></TimePicker>
				<button type="submit" id="submitBtn">Submits forms</button>
			</form>
		);

		cy.get("#timePicker").as("timePicker");

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerTypeTime("invalid");

		cy.get("#submitBtn").click();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("@timePicker")
			.ui5AssertValidityState({
				formValidity: { patternMismatch: true },
				validity: { patternMismatch: true, valid: false },
				checkValidity: false,
				reportValidity: false
			});

		cy.get("#timePicker:invalid")
			.should("exist", "Timepicker without correct formatted value should have :invalid CSS class");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerTypeTime("14:00:00");

		cy.get("@timePicker")
			.ui5AssertValidityState({
				formValidity: { patternMismatch: false },
				validity: { patternMismatch: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#timePicker:invalid")
			.should("not.exist", "Timepicker with correct formatted value should not have :invalid CSS class");
	});
});

describe("Icon Tooltip Tests", () => {
	it("TimePicker icon tooltip changes when toggling picker", () => {
		cy.mount(<TimePicker />);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker");

		cy.get<TimePicker>("@timePicker")
			.should("not.have.attr", "open");

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find("ui5-icon")
			.as("icon")
			.should("have.attr", "accessible-name", "Open Picker");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get<TimePicker>("@timePicker")
			.should("have.attr", "open");

		cy.get("@icon")
			.should("have.attr", "accessible-name", "Close Picker");

		cy.get<TimePicker>("@timePicker")
			.ui5TimePickerValueHelpIconPress();

		cy.get<TimePicker>("@timePicker")
			.should("not.have.attr", "open");

		cy.get("@icon")
			.should("have.attr", "accessible-name", "Open Picker");
	});

	it("TimePicker icon tooltip changes when using keyboard shortcuts", () => {
		cy.mount(<TimePicker />);

		cy.get<TimePicker>("[ui5-time-picker]")
			.as("timePicker")
			.ui5TimePickerGetInnerInput()
			.as("input")
			.realClick()
			.should("be.focused");

		cy.get<TimePicker>("@timePicker")
			.shadow()
			.find("ui5-icon")
			.as("icon")
			.should("have.attr", "accessible-name", "Open Picker");

		cy.get("@input")
			.realPress("F4");

		cy.get<TimePicker>("@timePicker")
			.should("have.attr", "open");

		cy.get("@icon")
			.should("have.attr", "accessible-name", "Close Picker");

		cy.get("@input")
			.realPress(["Alt", "ArrowUp"]);

		cy.get<TimePicker>("@timePicker")
			.should("not.have.attr", "open");

		cy.get("@icon")
			.should("have.attr", "accessible-name", "Open Picker");
	});
});

describe("CSS Parts", () => {
	it("TimePicker exposes input CSS part through DateTimeInput", () => {
		cy.mount(<TimePicker />);

		cy.get<TimePicker>("[ui5-time-picker]")
			.shadow()
			.find("[ui5-datetime-input]")
			.should("have.attr", "part", "input");
	});
});