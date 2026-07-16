import Calendar from "../../../src/Calendar.js";
import CalendarDate from "../../../src/CalendarDate.js";
import CalendarDateRange from "../../../src/CalendarDateRange.js";
import CalendarLegend from "../../../src/CalendarLegend.js";
import CalendarLegendItem from "../../../src/CalendarLegendItem.js";

describe("Calendar visual", () => {
	it("basic state — no selection", () => {
		cy.mount(
			<Calendar timestamp={1705276800} />
		);
		cy.screenshot();
	});

	it("selection mode — Single with selected date", () => {
		cy.mount(
			<Calendar timestamp={1705276800}>
				<CalendarDate value="Jan 15, 2024" />
			</Calendar>
		);
		cy.screenshot();
	});

	it("selection mode — Multiple with selected dates", () => {
		cy.mount(
			<Calendar selectionMode="Multiple" timestamp={1705276800}>
				<CalendarDate value="Jan 10, 2024" />
				<CalendarDate value="Jan 15, 2024" />
				<CalendarDate value="Jan 20, 2024" />
			</Calendar>
		);
		cy.screenshot();
	});

	it("selection mode — Range with selected range", () => {
		cy.mount(
			<Calendar selectionMode="Range" timestamp={1705276800}>
				<CalendarDateRange startValue="Jan 10, 2024" endValue="Jan 20, 2024" />
			</Calendar>
		);
		cy.screenshot();
	});

	it("hide week numbers", () => {
		cy.mount(
			<Calendar hideWeekNumbers timestamp={1705276800} />
		);
		cy.screenshot();
	});

	it("with min and max date", () => {
		cy.mount(
			<Calendar
				minDate="Jan 5, 2024"
				maxDate="Jan 25, 2024"
				timestamp={1705276800}
			/>
		);
		cy.screenshot();
	});

	it("with disabled date range", () => {
		cy.mount(
			<Calendar timestamp={1705276800}>
				<CalendarDateRange slot="disabledDates" startValue="Jan 13, 2024" endValue="Jan 17, 2024" />
			</Calendar>
		);
		cy.screenshot();
	});

	it("with calendar legend", () => {
		cy.mount(
			<Calendar timestamp={1705276800}>
				<CalendarLegend slot="calendarLegend">
					<CalendarLegendItem type="Working" text="Working" />
					<CalendarLegendItem type="NonWorking" text="Non-Working" />
				</CalendarLegend>
			</Calendar>
		);
		cy.screenshot();
	});

	it("month picker — opened", () => {
		cy.mount(
			<Calendar timestamp={1705276800} />
		);
		cy.get("[ui5-calendar]").shadow().find("[data-ui5-cal-header-btn-month]").realClick();
		cy.screenshot();
	});

	it("year picker — opened", () => {
		cy.mount(
			<Calendar timestamp={1705276800} />
		);
		cy.get("[ui5-calendar]").shadow().find("[data-ui5-cal-header-btn-year]").realClick();
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Calendar timestamp={1705276800}>
					<CalendarDate value="Jan 15, 2024" />
				</Calendar>
			</div>
		);
		cy.screenshot();
	});
});
