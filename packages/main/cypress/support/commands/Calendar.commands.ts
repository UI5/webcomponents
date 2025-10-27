Cypress.Commands.add("ui5CalendarGetDay", (calendarSelector, timestamp) => {
	cy.get(calendarSelector)
		.as("calendar");
	
	cy.get("@calendar")
		.shadow()
		.find("[ui5-daypicker]")
		.as("daypicker");
	
	return cy.get("@daypicker")
			.shadow()
			.find(`div[data-sap-timestamp=${timestamp}]`);
});

Cypress.Commands.add("ui5CalendarGetMonth", (calendarSelector, timestamp) => {
	return cy.get(calendarSelector)
		.shadow()
		.find("[ui5-monthpicker]")
		.shadow()
		.find(`div[data-sap-timestamp=${timestamp}]`);
});

Cypress.Commands.add("ui5CalendarShowYearRangePicker", { prevSubject: true }, subject => {
	cy.get(subject)
		.shadow()
		.find(".ui5-calheader")
		.as("calHeader");

	cy.get("@calHeader")
		.find("[data-ui5-cal-header-btn-year]")
		.realClick();

	cy.get(subject)
		.shadow()
		.find("[ui5-yearpicker]")
		.should("be.visible");
		
	cy.get("@calHeader")
		.find("[data-ui5-cal-header-btn-year-range]")
		.realClick();

	cy.get(subject)
		.shadow()
		.find("[ui5-yearrangepicker]")
		.should("be.visible");
});
