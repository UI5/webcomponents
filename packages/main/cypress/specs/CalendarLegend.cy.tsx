import Calendar from "../../src/Calendar.js";
import CalendarDate from "../../src/CalendarDate.js";
import CalendarLegend from "../../src/CalendarLegend.js";
import CalendarLegendItem from "../../src/CalendarLegendItem.js";
import SpecialCalendarDate from "../../src/SpecialCalendarDate.js";
import type UI5Element from "@ui5/webcomponents-base";

const getCalendarWithLegend = () => {
	return (
		<Calendar id="calendar1">
			<CalendarDate value="Mar 31, 2024"></CalendarDate>
			<SpecialCalendarDate slot="specialDates" value="Mar 30, 2024" type="Type01"></SpecialCalendarDate>
			<SpecialCalendarDate slot="specialDates" value="Mar 29, 2024" type="Type02"></SpecialCalendarDate>

			<CalendarLegend slot="calendarLegend" id="calendarLegend">
				<CalendarLegendItem type="Type01" text="Placeholder 01"></CalendarLegendItem>
				<CalendarLegendItem type="Type02" text="Placeholder 02"></CalendarLegendItem>
			</CalendarLegend>
		</Calendar>
	);
};

describe("Calendar Legend tests", () => {
	it("Calendar legend hides Today and Selected, when hideToday and hideSelectedDay properties are provided", () => {
		cy.mount(getCalendarWithLegend());

		cy.get<CalendarLegend>("#calendarLegend")
			.shadow()
			.find(".ui5-calendar-legend-root")
			.find("[ui5-calendar-legend-item]")
			.should("have.length", 4);

		cy.get<CalendarLegend>("#calendarLegend").invoke("prop", "hideToday", true);

		cy.get<CalendarLegend>("#calendarLegend")
			.shadow()
			.find(".ui5-calendar-legend-root")
			.find("[ui5-calendar-legend-item]")
			.should("have.length", 3);

		cy.get<CalendarLegend>("#calendarLegend").invoke("prop", "hideSelectedDay", true);

		cy.get<CalendarLegend>("#calendarLegend")
			.shadow()
			.find(".ui5-calendar-legend-root")
			.find("[ui5-calendar-legend-item]")
			.should("have.length", 2);
	});

	it("Focusing item in the legend and then focus out, reset filtered days", () => {
		cy.mount(getCalendarWithLegend());

		cy.get<CalendarLegend>("#calendarLegend")
			.find("ui5-calendar-legend-item[type='Type01']")
			.realClick();

		cy.get("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find("[data-ui5-special-day]")
			.should("have.length", 1);

		cy.get<CalendarLegend>("#calendarLegend")
			.find("ui5-calendar-legend-item[type='Type01']")
			.realClick()
			.realClick()
			.realPress("ArrowUp")
			.realPress("ArrowUp");

		cy.get("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find("[data-ui5-special-day]")
			.should("have.length", 2);
	});
});

describe("Calendar Legend - getFocusDomRef", () => {
	it("should return undefined when the CalendarLegend is empty", () => {
		cy.mount(
			<Calendar id="calendar1">
				<CalendarDate value="Mar 31, 2024"></CalendarDate>
				<SpecialCalendarDate slot="specialDates" value="Mar 30, 2024" type="Type01"></SpecialCalendarDate>
				<SpecialCalendarDate slot="specialDates" value="Mar 29, 2024" type="Type02"></SpecialCalendarDate>

				<CalendarLegend slot="calendarLegend" id="calendarLegend" hideToday hideSelectedDay hideWorkingDay hideNonWorkingDay></CalendarLegend>
			</Calendar>
		);

		cy.get<CalendarLegend>("#calendarLegend")
			.then(($el) => {
				expect($el[0].getFocusDomRef()).to.be.undefined;
			});
	});

	it("should return first item if no item was focused before", () => {
		cy.mount(
			<Calendar id="calendar1">
				<CalendarDate value="Mar 31, 2024"></CalendarDate>
				<SpecialCalendarDate slot="specialDates" value="Mar 30, 2024" type="Type01"></SpecialCalendarDate>
				<SpecialCalendarDate slot="specialDates" value="Mar 29, 2024" type="Type02"></SpecialCalendarDate>

				<CalendarLegend hideToday hideSelectedDay hideWorkingDay hideNonWorkingDay slot="calendarLegend" id="calendarLegend">
					<CalendarLegendItem type="Type01" text="Placeholder 01"></CalendarLegendItem>
					<CalendarLegendItem type="Type02" text="Placeholder 02"></CalendarLegendItem>
				</CalendarLegend>
			</Calendar>
		);

		cy.get<CalendarLegend>("#calendarLegend")
			.then(($el) => {
				const legend = $el[0];
				cy.get<UI5Element>('ui5-calendar-legend-item[type="Type01"]').then(($item) => {
    				const firstItem = $item[0];
    				expect(legend.getFocusDomRef()).to.equal(firstItem.getFocusDomRef());
			});
		});
	});

	it("should return last focused item in the Calendar Legend", () => {
		cy.mount(
			<Calendar id="calendar1">
				<CalendarDate value="Mar 31, 2024"></CalendarDate>
				<SpecialCalendarDate slot="specialDates" value="Mar 30, 2024" type="Type01"></SpecialCalendarDate>
				<SpecialCalendarDate slot="specialDates" value="Mar 29, 2024" type="Type02"></SpecialCalendarDate>

				<CalendarLegend hideToday hideSelectedDay hideWorkingDay hideNonWorkingDay slot="calendarLegend" id="calendarLegend">
					<CalendarLegendItem type="Type01" text="Placeholder 01"></CalendarLegendItem>
					<CalendarLegendItem type="Type02" text="Placeholder 02"></CalendarLegendItem>
				</CalendarLegend>
			</Calendar>
		);

		cy.get('ui5-calendar-legend-item[type="Type02"]').realClick();
		cy.get('ui5-calendar-legend-item[type="Type02"]').should("be.focused");

		cy.get<CalendarLegend>("#calendarLegend")
			.then(($el) => {
				const legend = $el[0];
				cy.get<UI5Element>('ui5-calendar-legend-item[type="Type02"]').then(($item) => {
    				const lastFocusesItem = $item[0];
    				expect(legend.getFocusDomRef()).to.equal(lastFocusesItem.getFocusDomRef());
			});
		});
	});
});


