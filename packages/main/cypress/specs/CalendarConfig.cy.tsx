import Calendar from "../../src/Calendar.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";
import { resetConfiguration } from "@ui5/webcomponents-base/dist/InitialConfiguration.js";


describe("Calendar general interaction", () => {
	before(() => {
		cy.window()
			.then($el => {
				const scriptElement = document.createElement("script");
				scriptElement.type = "application/json";
				scriptElement.setAttribute("data-ui5-config", "true");
				scriptElement.innerHTML = JSON.stringify({
					"calendarType": "Islamic",
					"secondaryCalendarType": "Gregorian"
				});

				return $el.document.head.append(scriptElement);
			})

		cy.wrap({ resetConfiguration })
			.invoke("resetConfiguration", true);
	});

	after(() => {
		cy.window()
			.then($el => {
				const scriptElement = $el.document.head.querySelector("script[data-ui5-config]");

				scriptElement?.remove();
			})
	})

	it("Calendar type configured", () => {
		cy.mount(<Calendar></Calendar>);

		cy.get("[ui5-calendar]")
			.should("not.have.prop", "primaryCalendarType");

		cy.get("[ui5-calendar]")
			.should("not.have.prop", "secondaryCalendarType");

		cy.get("[ui5-calendar]")
			.should("have.prop", "_primaryCalendarType", "Islamic")

		cy.get("[ui5-calendar]")
			.should("have.prop", "_secondaryCalendarType", "Gregorian");
	});
});