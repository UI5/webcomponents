import type DateRangePicker from "../../../src/DateRangePicker.js";
import type ResponsivePopover from "../../../src/ResponsivePopover.js";

Cypress.Commands.add("ui5DateRangePickerOpen", { prevSubject: true }, (subject: JQuery<DateRangePicker>) => {
	cy.wrap(subject).invoke("prop", "open", true);

	cy.wrap(subject).ui5DateRangePickerExpectToBeOpen()
});

Cypress.Commands.add("ui5DateRangePickerGetPopover", { prevSubject: true }, (subject: JQuery<DateRangePicker>) => {
	return cy.wrap(subject)
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]");
});

Cypress.Commands.add("ui5DateRangePickerExpectToBeOpen", { prevSubject: true }, (subject: JQuery<DateRangePicker>) => {
	cy.wrap(subject)
		.should("have.prop", "open", true);

	cy.wrap(subject)
		.ui5DateRangePickerGetPopover()
		.ui5ResponsivePopoverOpened();

	return cy.wrap(subject);
});

Cypress.Commands.add("ui5DateRangePickerSelectRange", { prevSubject: true }, (subject: JQuery<DateRangePicker>, startIndex: number, endIndex?: number) => {
	cy.wrap(subject)
		.shadow()
		.find("[ui5-calendar]")
		.shadow()
		.find("[ui5-daypicker]")
		.shadow()
		.find(".ui5-dp-root .ui5-dp-content div > .ui5-dp-item")
		.as("dateItems");

	cy.get("@dateItems")
		.eq(startIndex)
		.realClick();

	if (endIndex) {
		cy.get("@dateItems")
		.eq(endIndex)
		.realClick();
	}
});

Cypress.Commands.add("ui5DateRangePickerGetCalendar", { prevSubject: true }, (subject: JQuery<DateRangePicker>) => {
	return cy.wrap(subject)
		.shadow()
		.find("[ui5-calendar]");
});

Cypress.Commands.add("ui5DateRangePickerGetMonthContainers", { prevSubject: true }, (subject: JQuery<DateRangePicker>) => {
	return cy.wrap(subject)
		.ui5DateRangePickerGetCalendar()
		.shadow()
		.find(".ui5-cal-month-container");
});

Cypress.Commands.add("ui5DateRangePickerExpectMonthContainerCount", { prevSubject: true }, (subject: JQuery<DateRangePicker>, count: number) => {
	cy.wrap(subject)
		.ui5DateRangePickerGetMonthContainers()
		.should("have.length", count);
});

Cypress.Commands.add("ui5DateRangePickerGetDayPicker", { prevSubject: true }, (subject: JQuery<DateRangePicker>, index: number) => {
	return cy.wrap(subject)
		.ui5DateRangePickerGetMonthContainers()
		.eq(index)
		.find(`[id$='-daypicker-${index}']`);
});

Cypress.Commands.add("ui5DateRangePickerGetCalendarHeaders", { prevSubject: true }, (subject: JQuery<DateRangePicker>) => {
	return cy.wrap(subject)
		.ui5DateRangePickerGetCalendar()
		.shadow()
		.find(".ui5-calheader");
});

Cypress.Commands.add("ui5DateRangePickerClickDateInCalendar", { prevSubject: true }, (subject: JQuery<DateRangePicker>, calendarIndex: number, dateIndex: number) => {
	cy.wrap(subject)
		.ui5DateRangePickerGetDayPicker(calendarIndex)
		.shadow()
		.find("[data-sap-timestamp]")
		.eq(dateIndex)
		.realClick();
});

Cypress.Commands.add("ui5DateRangePickerVerifySelectedDatesInCalendar", { prevSubject: true }, (subject: JQuery<DateRangePicker>, calendarIndex: number) => {
	cy.wrap(subject)
		.ui5DateRangePickerGetDayPicker(calendarIndex)
		.shadow()
		.find(".ui5-dp-item--selected")
		.should("exist");
});

Cypress.Commands.add("ui5DateRangePickerClickNavigationButton", { prevSubject: true }, (subject: JQuery<DateRangePicker>, button: "next" | "prev") => {
	cy.wrap(subject)
		.ui5DateRangePickerGetCalendar()
		.shadow()
		.find(`[data-ui5-cal-header-btn-${button}]`)
		.realClick();
});

Cypress.Commands.add("ui5DateRangePickerVerifyMonthText", { prevSubject: true }, (subject: JQuery<DateRangePicker>, headerIndex: number, expectedText: string) => {
	cy.wrap(subject)
		.ui5DateRangePickerGetCalendarHeaders()
		.eq(headerIndex)
		.find("[data-ui5-cal-header-btn-month]")
		.should("contain.text", expectedText);
});

declare global {
	namespace Cypress {
		interface Chainable {
			ui5DateRangePickerOpen(
				this: Chainable<JQuery<DateRangePicker>>,
			): Chainable<void>;
			ui5DateRangePickerGetPopover(
				this: Chainable<JQuery<DateRangePicker>>,
			): Chainable<JQuery<ResponsivePopover>>;
			ui5DateRangePickerExpectToBeOpen(
				this: Chainable<JQuery<DateRangePicker>>,
			): Chainable<JQuery<DateRangePicker>>;
			ui5DateRangePickerSelectRange(
				this: Chainable<JQuery<DateRangePicker>>,
				startIndex: number,
				endIndex?: number,
			): Chainable<void>;
			ui5DateRangePickerGetCalendar(
				this: Chainable<JQuery<DateRangePicker>>,
			): Chainable<JQuery<HTMLElement>>;
			ui5DateRangePickerGetMonthContainers(
				this: Chainable<JQuery<DateRangePicker>>,
			): Chainable<JQuery<HTMLElement>>;
			ui5DateRangePickerExpectMonthContainerCount(
				this: Chainable<JQuery<DateRangePicker>>,
				count: number,
			): Chainable<void>;
			ui5DateRangePickerGetDayPicker(
				this: Chainable<JQuery<DateRangePicker>>,
				index: number,
			): Chainable<JQuery<HTMLElement>>;
			ui5DateRangePickerGetCalendarHeaders(
				this: Chainable<JQuery<DateRangePicker>>,
			): Chainable<JQuery<HTMLElement>>;
			ui5DateRangePickerClickDateInCalendar(
				this: Chainable<JQuery<DateRangePicker>>,
				calendarIndex: number,
				dateIndex: number,
			): Chainable<void>;
			ui5DateRangePickerVerifySelectedDatesInCalendar(
				this: Chainable<JQuery<DateRangePicker>>,
				calendarIndex: number,
			): Chainable<void>;
			ui5DateRangePickerClickNavigationButton(
				this: Chainable<JQuery<DateRangePicker>>,
				button: "next" | "prev",
			): Chainable<void>;
			ui5DateRangePickerVerifyMonthText(
				this: Chainable<JQuery<DateRangePicker>>,
				headerIndex: number,
				expectedText: string,
			): Chainable<void>;
		}
	}
}