import DateRangePicker from "../../src/DateRangePicker.js";

type DateTimePickerTemplateOptions = Partial<{
	formatPattern: string;
	delimiter: string;
	onChange: () => void;
	value: string;
	minDate: string;
	maxDate: string;
}>

function DateRangePickerTemplate(options: DateTimePickerTemplateOptions) {
	return <DateRangePicker {...options} />
}

describe("DateRangePicker mobile footer interactions", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("OK button is disabled when no dates are selected", () => {
		cy.mount(<DateRangePickerTemplate formatPattern="dd/MM/yyyy" />);
		
		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realPress("F4");

		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerExpectToBeOpen();

		// Get the responsive popover and look for the button in its light DOM
		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerGetPopover()
			.within(() => {
				cy.get("#ok")
					.should("exist")
					.and("have.attr", "disabled");
			});
	});

	it("OK button is disabled when only one date is selected", () => {
		cy.mount(<DateRangePickerTemplate formatPattern="dd/MM/yyyy" />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realPress("F4");

		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerExpectToBeOpen();

		// Select first date
		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerSelectRange(5);

		// OK button should still be disabled
		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerGetPopover()
			.within(() => {
				cy.get("#ok")
					.should("exist")
					.and("have.attr", "disabled");
			});
	});

	it("OK button is enabled when two dates are selected", () => {
		cy.mount(<DateRangePickerTemplate formatPattern="dd/MM/yyyy" />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realPress("F4");

		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerExpectToBeOpen();

		// Select date range
		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerSelectRange(5, 15);

		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerGetPopover()
			.within(() => {
				cy.get("#ok")
					.should("exist")
					.and("not.have.attr", "disabled");
			});
	});

	it("OK button confirms the selection and closes the picker", () => {
		cy.mount(<DateRangePickerTemplate formatPattern="dd/MM/yyyy" onChange={cy.stub().as("changeStub")} />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realPress("F4");

		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerExpectToBeOpen();

		// Select date range
		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerSelectRange(5, 15);

		// Click OK button
		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerGetPopover()
			.within(() => {
				cy.get("#ok").realClick();
			});

		// Picker should be closed
		cy.get<DateRangePicker>("@dateRangePicker")
			.should("have.prop", "open", false);

		// Change event should be fired
		cy.get("@changeStub")
			.should("be.calledOnce");

		// Value should be set
		cy.get<DateRangePicker>("@dateRangePicker")
			.should("have.attr", "value")
			.and("match", /\d{2}\/\d{2}\/\d{4} - \d{2}\/\d{2}\/\d{4}/);
	});

	it("Cancel button closes the picker", () => {
		cy.mount(<DateRangePickerTemplate formatPattern="dd/MM/yyyy" value="01/01/2020 - 05/01/2020" />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realPress("F4");

		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerExpectToBeOpen();

		// Click Cancel button
		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerGetPopover()
			.within(() => {
				cy.get("#cancel").realClick();
			});

		// Picker should be closed
		cy.get<DateRangePicker>("@dateRangePicker")
			.should("have.prop", "open", false);
	});

	it("Change event is not fired immediately on date selection in mobile mode", () => {
		cy.mount(<DateRangePickerTemplate formatPattern="dd/MM/yyyy" onChange={cy.stub().as("changeStub")} />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realPress("F4");

		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerExpectToBeOpen();

		// Select date range
		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerSelectRange(5, 15);

		// Change event should not be fired yet (only value-changed is fired internally)
		cy.get("@changeStub")
			.should("not.be.called");

		// Picker should still be open
		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerExpectToBeOpen();
	});

	it("Change event is fired only after OK button click on mobile", () => {
		cy.mount(<DateRangePickerTemplate formatPattern="dd/MM/yyyy" onChange={cy.stub().as("changeStub")} />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realPress("F4");

		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerExpectToBeOpen();

		// Select date range
		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerSelectRange(5, 15);

		// Change event should not be fired yet
		cy.get("@changeStub")
			.should("not.be.called");

		// Click OK button
		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerGetPopover()
			.within(() => {
				cy.get("#ok").realClick();
			});

		// Now change event should be fired
		cy.get("@changeStub")
			.should("be.calledOnce");
	});
});
