import Calendar from "../../../src/Calendar.js";
import SpecialCalendarDate from "../../../src/SpecialCalendarDate.js";

describe("SpecialCalendarDate visual", () => {
	it("Working type", () => {
		cy.mount(
			<Calendar formatPattern="MMddyyyy" timestamp={1704067200}>
				<SpecialCalendarDate slot="specialDates" value="01012024" type="Working" />
				<SpecialCalendarDate slot="specialDates" value="01032024" type="Working" />
			</Calendar>
		);
		cy.screenshot();
	});

	it("NonWorking type", () => {
		cy.mount(
			<Calendar formatPattern="MMddyyyy" timestamp={1704067200}>
				<SpecialCalendarDate slot="specialDates" value="01012024" type="NonWorking" />
				<SpecialCalendarDate slot="specialDates" value="01072024" type="NonWorking" />
			</Calendar>
		);
		cy.screenshot();
	});

	it("multiple types together", () => {
		cy.mount(
			<Calendar formatPattern="MMddyyyy" timestamp={1704067200}>
				<SpecialCalendarDate slot="specialDates" value="01012024" type="Type01" />
				<SpecialCalendarDate slot="specialDates" value="01082024" type="Type02" />
				<SpecialCalendarDate slot="specialDates" value="01152024" type="Working" />
				<SpecialCalendarDate slot="specialDates" value="01202024" type="NonWorking" />
			</Calendar>
		);
		cy.screenshot();
	});
});
