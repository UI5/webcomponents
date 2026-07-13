import CalendarLegend from "../../../src/CalendarLegend.js";
import CalendarLegendItem from "../../../src/CalendarLegendItem.js";

describe("CalendarLegend visual", () => {
	it("basic state — all built-in types", () => {
		cy.mount(
			<CalendarLegend>
				<CalendarLegendItem type="Today" text="Today" />
				<CalendarLegendItem type="Selected" text="Selected" />
				<CalendarLegendItem type="Working" text="Working" />
				<CalendarLegendItem type="NonWorking" text="Non-Working" />
			</CalendarLegend>
		);
		cy.screenshot();
	});

	it("with custom types", () => {
		cy.mount(
			<CalendarLegend>
				<CalendarLegendItem type="Type01" text="Holiday" />
				<CalendarLegendItem type="Type02" text="Birthday" />
				<CalendarLegendItem type="Type03" text="Deadline" />
				<CalendarLegendItem type="Type04" text="Meeting" />
			</CalendarLegend>
		);
		cy.screenshot();
	});

	it("hide today", () => {
		cy.mount(
			<CalendarLegend hideToday>
				<CalendarLegendItem type="Selected" text="Selected" />
				<CalendarLegendItem type="Working" text="Working" />
				<CalendarLegendItem type="NonWorking" text="Non-Working" />
			</CalendarLegend>
		);
		cy.screenshot();
	});

	it("hide selected day", () => {
		cy.mount(
			<CalendarLegend hideSelectedDay>
				<CalendarLegendItem type="Today" text="Today" />
				<CalendarLegendItem type="Working" text="Working" />
				<CalendarLegendItem type="NonWorking" text="Non-Working" />
			</CalendarLegend>
		);
		cy.screenshot();
	});

	it("hide working and non-working day", () => {
		cy.mount(
			<CalendarLegend hideWorkingDay hideNonWorkingDay>
				<CalendarLegendItem type="Today" text="Today" />
				<CalendarLegendItem type="Selected" text="Selected" />
				<CalendarLegendItem type="Type01" text="Custom" />
			</CalendarLegend>
		);
		cy.screenshot();
	});

	it("mixed built-in and custom types", () => {
		cy.mount(
			<CalendarLegend>
				<CalendarLegendItem type="Today" text="Today" />
				<CalendarLegendItem type="Selected" text="Selected" />
				<CalendarLegendItem type="Working" text="Working" />
				<CalendarLegendItem type="NonWorking" text="Non-Working" />
				<CalendarLegendItem type="Type01" text="Holiday" />
				<CalendarLegendItem type="Type02" text="Birthday" />
				<CalendarLegendItem type="Type03" text="Deadline" />
			</CalendarLegend>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<CalendarLegend>
					<CalendarLegendItem type="Today" text="Today" />
					<CalendarLegendItem type="Selected" text="Selected" />
					<CalendarLegendItem type="Working" text="Working" />
					<CalendarLegendItem type="NonWorking" text="Non-Working" />
				</CalendarLegend>
			</div>
		);
		cy.screenshot();
	});
});
