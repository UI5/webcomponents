import DateTimePicker from "../../src/DateTimePicker.js";
import { setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import Label from "../../src/Label.js";

type DateTimePickerTemplateOptions = Partial<{
	formatPattern: string;
	value: string;
	onChange: (e?: Event) => void;
	minDate: string;
	maxDate: string;
	valueState: "None" | "Positive" | "Critical" | "Negative" | "Information";
}>;

function DateTimePickerTemplate(options: DateTimePickerTemplateOptions) {
	return <DateTimePicker {...options} />
}

describe("DateTimePicker general interaction", () => {
	it("tests time controls adjustments", () => {
		setAnimationMode(AnimationMode.None);
		const PREVIOUS_VALUE = "13/04/2020, 03:16:16 AM";

		cy.mount(<DateTimePickerTemplate formatPattern="dd/MM/yyyy, hh:mm:ss a" value={PREVIOUS_VALUE} />)

		cy.get<DateTimePicker>("[ui5-datetime-picker]")
			.as("dtp")
			.ui5DateTimePickerOpen();

		cy.get("@dtp")
			.shadow()
			.find("[ui5-datetime-input]")
			.should("have.value", PREVIOUS_VALUE);

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetPopover()
			.within(() => {
				// Adjust hours:
				cy.get("[ui5-time-selection-clocks]")
					.shadow()
					.as("clocks");

				cy.get("@clocks")
					.find(`[ui5-toggle-spin-button][data-ui5-clock="hours"]`)
					.realClick()
					.should("be.focused");

				cy.realPress("ArrowDown");
				cy.realPress("Space");

				// Adjust minutes.
				cy.get("@clocks")
					.find(`[ui5-toggle-spin-button][data-ui5-clock="minutes"]`)
					.realClick()
					.should("be.focused");

				cy.realPress("ArrowDown");
				cy.realPress("ArrowDown");
				cy.realPress("Space");

				// Adjust seconds.
				cy.get("@clocks")
					.find(`[ui5-toggle-spin-button][data-ui5-clock="seconds"]`)
					.realClick()
					.should("be.focused");

				cy.realPress("ArrowUp");
				cy.realPress("ArrowUp");
				cy.realPress("ArrowUp");
				cy.realType("p");

				// Confirm.
				cy.get("#ok").realClick();
			});

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerExpectToBeClosed();

		// Only the time parts have been updated.
		cy.get<DateTimePicker>("@dtp")
			.shadow()
			.find("[ui5-datetime-input]")
			.should("be.focused")
			.should("have.attr", "value", "13/04/2020, 02:14:19 PM");

		setAnimationMode(AnimationMode.Full);
	});

	it("tests picker opens/closes programmatically", () => {
		cy.mount(<DateTimePickerTemplate />)

		cy.get<DateTimePicker>("[ui5-datetime-picker]")
			.as("dtp")
			.ui5DateTimePickerOpen();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerClose();
	});

	it("tests selection of new date", () => {
		setAnimationMode(AnimationMode.None);
		const PREVIOUS_VALUE = "13/04/2020, 03:16:16 AM";

		cy.mount(<DateTimePickerTemplate formatPattern="dd/MM/yyyy, hh:mm:ss a" value={PREVIOUS_VALUE} />)

		cy.get<DateTimePicker>("[ui5-datetime-picker]")
			.as("dtp")
			.ui5DateTimePickerOpen();

		cy.get("@dtp")
			.shadow()
			.find("[ui5-datetime-input]")
			.should("have.value", PREVIOUS_VALUE);

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetPopover()
			.within(() => {
				// Click the currently selected day and then move to the next day.
				cy.get("[ui5-calendar]")
					.shadow()
					.as("calendar");

				cy.get("@calendar")
					.find("[ui5-daypicker]")
					.shadow()
					.find(".ui5-dp-item--selected")
					.realClick()
					.should("be.focused");

				cy.realPress("ArrowRight");
				cy.realPress("Space");

				// Confirm the change.
				cy.get("#ok").realClick();
			});

		cy.get<DateTimePicker>("@dtp").ui5DateTimePickerExpectToBeClosed();

		// Only the date has changed; the time remains the same.
		cy.get("@dtp")
			.shadow()
			.find("[ui5-datetime-input]")
			.should("be.focused")
			.should("have.attr", "value", "14/04/2020, 03:16:16 AM");

		setAnimationMode(AnimationMode.Full);
	});

	it("tests selection of new date without changing the time section", () => {
		setAnimationMode(AnimationMode.None);

		const PREVIOUS_VALUE = "14/04/2020, 02:14:19 PM";
		cy.mount(<>
			<button>before</button>
			<DateTimePickerTemplate
				formatPattern="dd/MM/yyyy, hh:mm:ss a"
				value={PREVIOUS_VALUE}
			/>
		</>);

		cy.get("[ui5-datetime-picker]")
			.as("dtp")
			.shadow()
			.find("[ui5-datetime-input]")
			.should("have.value", PREVIOUS_VALUE);

		cy.get("button")
			.contains("before")
			.realClick();

		cy.get("button")
			.contains("before")
			.should("be.focused");

		cy.realPress("Tab");

		// Simulate keyboard interactions
		cy.get("@dtp")
			.shadow()
			.find("[ui5-datetime-input]")
			.should("be.focused");

		cy.realPress("Backspace");
		cy.realType("wrongtext");
		cy.realPress("Tab");

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerOpen();

		let selectedDate = "";

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetPopover()
			.within(() => {
				cy.get("[ui5-calendar]")
					.shadow()
					.as("calendar");

				cy.get("@calendar")
					.find("ui5-daypicker")
					.shadow()
					.as("daypicker");

				cy.get("@daypicker")
					.find(".ui5-dp-item--now")
					.realClick();

				cy.get("@daypicker")
					.find(".ui5-dp-item--now")
					.should("be.focused")
					.then($el => {
						const timestamp = $el.attr("data-sap-timestamp") || "";
						const date = new Date(parseInt(timestamp) * 1000);
						selectedDate = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
					})
			})
			.then(() => {
				cy.get<DateTimePicker>("@dtp")
					.ui5DateTimePickerGetSubmitButton()
					.should("have.prop", "disabled", false);

				cy.get<DateTimePicker>("@dtp")
					.ui5DateTimePickerGetSubmitButton()
					.realClick();

				cy.get("[ui5-datetime-picker]")
					.shadow()
					.find("ui5-datetime-input")
					.should("be.focused")
					.and("have.attr", "value", selectedDate + ", 02:14:19 PM");
			});

		setAnimationMode(AnimationMode.Full);
	});

	it("tests time controls for dtSeconds picker", () => {
		const expectedClocksCount = 3;
		const expectedPeriodCount = 1;

		cy.mount(<DateTimePickerTemplate formatPattern="dd/MM/yyyy, hh:mm:ss a" value="13/04/2020, 03:16:16 AM" />);

		cy.get<DateTimePicker>("[ui5-datetime-picker")
			.as("dtp")
			.ui5DateTimePickerOpen();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerTimeSelectionClocksCount()
			.should("be.equal", expectedClocksCount)

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerPeriodSegmentedButtonCount()
			.should("be.equal", expectedPeriodCount)

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerClose();
	});

	it("tests time controls for dtMinutes picker", () => {
		const expectedClocksCount = 2;
		const expectedPeriodCount = 1;

		cy.mount(<DateTimePickerTemplate formatPattern="dd/MM/yyyy, hh:mm a" value="13/04/2020, 09:16 AM" />);

		cy.get<DateTimePicker>("[ui5-datetime-picker")
			.as("dtp")
			.ui5DateTimePickerOpen();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerTimeSelectionClocksCount()
			.should("be.equal", expectedClocksCount)

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerPeriodSegmentedButtonCount()
			.should("be.equal", expectedPeriodCount)

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerClose();
	});

	it("tests hours clock is active on picker open", () => {
		cy.mount(<DateTimePickerTemplate />);

		cy.get<DateTimePicker>("[ui5-datetime-picker]")
			.as("dtp")
			.ui5DateTimePickerOpen();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetPopover()
			.within(() => {
				cy.get("[ui5-time-selection-clocks]")
					.shadow()
					.as("clocks");

				cy.get("@clocks")
					.find(`[ui5-time-picker-clock][data-ui5-clock="hours"]`)
					.should("have.attr", "active", "");
			});

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerClose();
	});

	// Unstable test, needs investigation
	it("tests selection of 12:34:56 AM", () => {
		setAnimationMode(AnimationMode.None);

		cy.mount(<DateTimePickerTemplate formatPattern="dd/MM/yyyy, hh:mm:ss a" value="13/04/2020, 03:16:16 AM" />);

		cy.get<DateTimePicker>("[ui5-datetime-picker]")
			.as("dtp")
			.ui5DateTimePickerOpen();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetPopover()
			.within(() => {
				cy.get("[ui5-calendar]")
					.shadow()
					.as("calendar");

				cy.get("@calendar")
					.find("ui5-daypicker")
					.shadow()
					.as("daypicker");

				cy.get("@daypicker")
					.find(".ui5-dp-item--selected")
					.should("be.focused")
					.realClick();

				cy.get("[ui5-time-selection-clocks]")
					.shadow()
					.as("clocks");

				cy.get("@clocks")
					.find(`[ui5-toggle-spin-button][data-ui5-clock="hours"]`)
					.realClick()
					.should("be.focused");

				cy.realType("12")

				cy.get("@clocks")
					.find(`[ui5-toggle-spin-button][data-ui5-clock="minutes"]`)
					.should("be.focused");

				cy.realType("34");

				cy.get("@clocks")
					.find(`[ui5-toggle-spin-button][data-ui5-clock="seconds"]`)
					.should("be.focused")

				cy.realType("56a")
			});

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetSubmitButton()
			.should("have.prop", "disabled", false);

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetSubmitButton()
			.realClick();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerExpectToBeClosed();

		cy.get("@dtp")
			.shadow()
			.find("[ui5-datetime-input]")
			.should("be.focused")
			.and("have.attr", "value", "13/04/2020, 12:34:56 AM");

		setAnimationMode(AnimationMode.Full);
	});

	it("tests change event is prevented on submit when prevent default is called", () => {
		cy.mount(<DateTimePickerTemplate onChange={e => e.preventDefault()} />);

		cy.get<DateTimePicker>("[ui5-datetime-picker]")
			.as("dtp")

		cy.get<DateTimePicker>("@dtp")
			.shadow()
			.find("[ui5-datetime-input]")
			.as("input");

		cy.get<DateTimePicker>("@dtp")
			.shadow()
			.find("ui5-responsive-popover ui5-calendar")
			.shadow()
			.find("ui5-daypicker")
			.as("daypicker");

		// act: open the picker
		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerOpen();

		// act: click today's date
		cy.get("@daypicker")
			.shadow()
			.find("[data-sap-focus-ref]")
			.should("be.focused")
			.realClick();

		// act: confirm selection
		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetSubmitButton()
			.should("have.prop", "disabled", false);

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetSubmitButton()
			.realClick();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerExpectToBeClosed();

		// assert: the value is not changed
		cy.get("@input")
			.should("be.focused")
			.and("have.attr", "value", "");
	});

	it("custom formatting", () => {
		cy.mount(<DateTimePicker displayFormat="yyyy, dd/MM hh:mm:ss" valueFormat="yyyy-MM-dd hh:mm:ss"></DateTimePicker>);

		cy.get("[ui5-datetime-picker]")
			.as("dateTimePicker");

		cy.get<DateTimePicker>("@dateTimePicker")
			.ui5DatePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realType("2018, 05/05 12:00:00")
			.realPress("Enter");

		cy.get("@dateTimePicker")
			.shadow()
			.find("ui5-datetime-input")
			.should("have.attr", "value", "2018, 05/05 12:00:00");

		cy.get("@dateTimePicker")
			.should("have.attr", "value", "2018-05-05 12:00:00");
	});

	it("Min and max dates are set, with no format pattern provided, using valid ISO format", () => {
		cy.mount(
			<DateTimePickerTemplate minDate="2023-05-01" maxDate="2023-05-31" />
		);

		cy.get<DateTimePicker>("[ui5-datetime-picker]")
			.as("dtp")

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerOpen();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetPopover()
			.within(() => {
				cy.get("[ui5-calendar]")
					.shadow()
					.find(".ui5-calheader")
					.as("calHeader")
					.find("div[data-ui5-cal-header-btn-prev]")
					.should("have.class", "ui5-calheader-arrowbtn-disabled");

				cy.get("@calHeader")
					.find("div[data-ui5-cal-header-btn-next]")
					.should("have.class", "ui5-calheader-arrowbtn-disabled");
			});
	});

	it("value state", () => {
		cy.mount(<DateTimePickerTemplate valueState="Negative" />);

		cy.get("[ui5-datetime-picker]")
			.as("dtp");

		cy.get<DateTimePicker>("@dtp")
			.shadow()
			.find("[ui5-datetime-input]")
			.should("have.attr", "value-state", "Negative");

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerOpen();

		cy.get<DateTimePicker>("@dtp")
			.shadow()
			.find("[slot='header']")
			.first()
			.should("have.text", "Invalid entry");
	});

	// Unstable test, needs investigation
	it("tests change event is fired on submit", () => {
		cy.mount(<DateTimePickerTemplate onChange={cy.stub().as("changeStub")} />);

		cy.get<DateTimePicker>("[ui5-datetime-picker]")
			.as("dtp")
			.ui5DateTimePickerOpen();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetPopover()
			.within(() => {
				cy.get("[ui5-calendar]")
					.shadow()
					.as("calendar");

				cy.get("@calendar")
					.find("ui5-daypicker")
					.shadow()
					.as("daypicker");

				cy.get("@daypicker")
					.find("[data-sap-focus-ref]")
					.realClick()
					.should("be.focused");
			});

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetSubmitButton()
			.should("have.prop", "disabled", false);

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetSubmitButton()
			.realClick();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerExpectToBeClosed();

		// Assert the change event was fired once
		cy.get("@changeStub").should("have.been.calledOnce");

		// Re-open the picker and submit without making a change
		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerOpen();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetSubmitButton()
			.should("have.prop", "disabled", false);

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetSubmitButton()
			.realClick();

		// Verify the picker is closed
		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerExpectToBeClosed();

		// The change event should not have been fired a second time.
		cy.get("@changeStub").should("have.been.calledOnce");
	});
});

describe("Accessibility", () => {
	it("initial focus goes to calendar's current date in phone mode", () => {
		// Using viewport instead of device simulation (focus is not available on actual phone devices), to trigger SegmentedButton view.
		cy.viewport(500, 800);

		cy.mount(<DateTimePickerTemplate value="13/04/2020, 03:16:16 PM" formatPattern="dd/MM/yyyy, hh:mm:ss a" />);

		cy.get<DateTimePicker>("[ui5-datetime-picker]").as("dtp");
		
		cy.get<DateTimePicker>("@dtp").ui5DateTimePickerOpen();

		cy.get<DateTimePicker>("@dtp")
			.ui5DateTimePickerGetPopover()
			.find("[ui5-calendar]")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-item--selected")
			.should("be.focused");
	});

	it("picker popover accessible name", () => {
		const LABEL = "Deadline";
		cy.mount(<DateTimePicker accessible-name={LABEL} />);

		cy.get<DateTimePicker>("[ui5-datetime-picker]")
			.ui5DateTimePickerGetPopover()
			.should("have.attr", "accessible-name", `Choose Date and Time for ${LABEL}`);
	});

	it("picker popover accessible name with external label", () => {
		const LABEL = "Deadline";
		cy.mount(
			<>
				<Label for="dateTimePicker">{LABEL}</Label>
				<DateTimePicker id="dateTimePicker" />
			</>
		);

		cy.get<DateTimePicker>("[ui5-datetime-picker]")
			.ui5DateTimePickerGetPopover()
			.should("have.attr", "accessible-name", `Choose Date and Time for ${LABEL}`);
	});

	it("accessibleDescription property", () => {
		const DESCRIPTION = "Some description";
		cy.mount(<DateTimePicker accessibleDescription={DESCRIPTION}></DateTimePicker>);

		cy.get<DateTimePicker>("[ui5-datetime-picker]")
			.ui5DatePickerGetInnerInput()
			.should("have.attr", "aria-describedby", "descr");

		cy.get<DateTimePicker>("[ui5-datetime-picker]")
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
				<DateTimePicker accessibleDescriptionRef="descr"></DateTimePicker>
			</>
		);

		cy.get<DateTimePicker>("[ui5-datetime-picker]")
			.shadow()
			.find("[ui5-datetime-input]")
			.shadow()
			.find("input")
			.should("have.attr", "aria-describedby")
			.and("contain", "descr");

		cy.get("#descr").should("have.text", DESCRIPTION);
	});
});


describe("Validation inside a form", () => {
	it("has correct validity for valueMissing", () => {
		cy.mount(
			<form>
				<DateTimePicker id="dateTimePicker" required={true}></DateTimePicker>
				<button type="submit" id="submitBtn">Submits forms</button>
			</form>
		);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", (e) => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("#submitBtn")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("#dateTimePicker")
			.as("dateTimePicker")
			.ui5AssertValidityState({
				formValidity: { valueMissing: true },
				validity: { valueMissing: true, valid: false },
				checkValidity: false,
				reportValidity: false
			});

		cy.get("#dateTimePicker:invalid")
			.should("exist", "Required DatePicker without value should have :invalid CSS class");

		cy.get("@dateTimePicker")
			.ui5DatePickerTypeDate("now");

		cy.get("@dateTimePicker")
			.ui5AssertValidityState({
				formValidity: { valueMissing: false },
				validity: { valueMissing: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#dateTimePicker:invalid")
			.should("not.exist", "Required DatePicker with value should not have :invalid CSS class");
	});

	it("has correct validity for patternMismatch", () => {
		cy.mount(
			<form>
				<DateTimePicker id="dateTimePicker" required={true} valueFormat="MMM d, y hh:mm:ss" formatPattern="MMM d, y hh:mm:ss"></DateTimePicker>
				<button type="submit" id="submitBtn">Submits forms</button>
			</form>
		);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", (e) => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("#dateTimePicker")
			.as("dateTimePicker")
			.ui5DatePickerTypeDate("Test 33, 2024 ss:tt:tt");

		cy.get("#submitBtn")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("@dateTimePicker")
			.ui5AssertValidityState({
				formValidity: { patternMismatch: true },
				validity: { patternMismatch: true, valid: false },
				checkValidity: false,
				reportValidity: false
			});

		cy.get("#dateTimePicker:invalid")
			.should("exist", "DateTimePicker without correct formatted value should have :invalid CSS class");

		cy.get("@dateTimePicker")
			.ui5DatePickerTypeDate("Apr 12, 2024 12:00:00");

		cy.get("@dateTimePicker")
			.ui5AssertValidityState({
				formValidity: { patternMismatch: false },
				validity: { patternMismatch: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#dateTimePicker:invalid")
			.should("not.exist", "DateTimePicker with correct formatted value should not have :invalid CSS class");
	});

	it("has correct validity for rangeUnderflow", () => {
		cy.mount(
			<form method="get">
				<DateTimePicker id="dateTimePicker" minDate="Jan 10, 2024 08:00:00" valueFormat="MMM d, y hh:mm:ss" formatPattern="MMM d, y hh:mm:ss"></DateTimePicker>
				<button type="submit" id="submitBtn">Submits forms</button>
			</form>
		);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", (e) => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("#dateTimePicker")
			.as("dateTimePicker")
			.ui5DatePickerTypeDate("Jan 5, 2023 08:00:00");

		cy.get("@dateTimePicker")
			.ui5AssertValidityState({
				formValidity: { rangeUnderflow: true },
				validity: { rangeUnderflow: true, valid: false },
				checkValidity: false,
				reportValidity: false
			});

		cy.get("#dateTimePicker:invalid")
			.should("exist", "DateTimePicker with value below minDate should have :invalid CSS class");

		cy.get("@dateTimePicker")
			.ui5DatePickerTypeDate("Jan 20, 2024 08:00:00");

		cy.get("@dateTimePicker")
			.ui5AssertValidityState({
				formValidity: { rangeUnderflow: false },
				validity: { rangeUnderflow: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#dateTimePicker:invalid")
			.should("not.exist", "DateTimePicker with value above minDate should not have :invalid CSS class");
	});

	it("has correct validity for rangeOverflow", () => {
		cy.mount(
			<form>
				<DateTimePicker id="dateTimePicker" maxDate="Jan 10, 2024 08:00:00" valueFormat="MMM d, y hh:mm:ss" formatPattern="MMM d, y hh:mm:ss"></DateTimePicker>
				<button type="submit" id="submitBtn">Submits forms</button>
			</form>
		);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", (e) => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("#dateTimePicker")
			.as("dateTimePicker")
			.ui5DatePickerTypeDate("Jan 15, 2025 08:00:00");

		cy.get("@dateTimePicker")
			.ui5AssertValidityState({
				formValidity: { rangeOverflow: true },
				validity: { rangeOverflow: true, valid: false },
				checkValidity: false,
				reportValidity: false
			});

		cy.get("#dateTimePicker:invalid")
			.should("exist", "DateTimePicker with value above maxDate should have :invalid CSS class");

		cy.get("@dateTimePicker")
			.ui5DatePickerTypeDate("Jan 5, 2024 08:00:00");

		cy.get("@dateTimePicker")
			.ui5AssertValidityState({
				formValidity: { rangeOverflow: false },
				validity: { rangeOverflow: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#dateTimePicker:invalid")
			.should("not.exist", "DateTimePicker with value below maxDate should not have :invalid CSS class");
	});
});